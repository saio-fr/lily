(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'typeahead', 'underscore'], function($, typeahead, _) {
      return (root.synapse = factory(root, $, typeahead, _));
    });
  } else if (typeof exports !== 'undefined') {
    var $ = require('jquery');
    window.jQuery = $;
    var typeahead = require('typeahead');
    var _ = require('underscore');
    module.exports = factory(root, $, typeahead, _);
  } else {
    root.synapse = factory(root, root.$, root.typeahead, root._);
  }

}(this, function(root, $, typeahead, _) {
  'use strict';

  return function synapseSuggest(credentials, options) {

    if (!credentials) {
      console.error('No credentials set for synapse');
      return;
    }
    this.credentials = credentials;
    this.strategy = 'words';

    var that = this;

    // PRIVATE
    var restRoot = 'http://search.saio.fr/api/saio/smartfaq/SmartFAQWCF.svc/rest/';

    var frMap = {
      'a': /[àáâ]/gi,
      'c': /[ç]/gi,
      'e': /[èéêë]/gi,
      'i': /[ï]/gi,
      'o': /[ô]/gi,
      'oe': /[œ]/gi,
      'u': /[ü]/gi
    };

    var normalize = function(str) {
      $.each(frMap, function(normalized, regex) {
        str = str.replace(regex, normalized);
      });

      return str;
    };

    var queryTokenizer = function(query) {
      var normalized = normalize(query);
      return Bloodhound.tokenizers.whitespace(normalized);
    };

    var dupDetector = function(remoteMatch, localMatch) {
      if (remoteMatch.answerId && localMatch.answerId) {
        return remoteMatch.answerId == localMatch.answerId;
      }

      return false;
    };

    var filterPrefetch = function(response) {
      var result = $.map(response.questions, function(question) {
        return {
          normalizedText: normalize(question.text),
          text: question.text,
          answerId: question.answerId,
          source: 'prefetch'
        };
      });

      return result;
    };

    var filterRemote = function(response) {

      var rawResults = response.searchResults.searchResults !== '' ?
        response.searchResults.searchResults : '{}';

      var resultsJson = JSON.parse(rawResults);
      var results = [];
      var textResults = [];

      console.log(resultsJson);

      // A table containing only the text of the matched question
      // to efficiently test duplicates in following loops
      if (resultsJson.QA && resultsJson.QA.results.suggestions) {

        // when there are seva=eral suggestions, .NET serializes
        // resultsJson.QA.results.suggestions.suggestion as a table
        // otherwise, it is just a javascript object
        // this ugly if is here to fix this
        var suggestions = resultsJson.QA.results.suggestions.suggestion;

        if (_.isArray(suggestions)) {
          $.each(suggestions, function(index, sugestion) {
            // suggestion is not in text result table
            if (_.indexOf(textResults, suggestions.sentence) === -1) {
              results.push({
                text: sugestion.sentence,
                answerId: (sugestion['@bIsQuestion'] === 'true' ?
                  sugestion['@answerId'] : sugestion['@id']),
                source: 'remote'
              });

              textResults.push(sugestion.sentence);
            }
          });
        } else {
          results.push({
            text: suggestions.sentence,
            answerId: (suggestions['@bIsQuestion'] === 'true' ?
              suggestions['@answerId'] : suggestions['@id']),
            source: 'remote'
          });
        }
      }

      return results;
    };

    // Bloodhound params
    var settings = {
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('normalizedText'),
      queryTokenizer: queryTokenizer,
      dupDetector: dupDetector,

      prefetch: {
        url: restRoot + 'GetListQuestions',

        // Unique cacheKey for each KB
        cacheKey: that.credentials.user,

        // time (in milliseconds) the prefetched data should be cached
        // in local storage; default is one day
        ttl: 86400000, // (One day)

        filter: filterPrefetch,

        ajax: {
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(this.credentials),
          crossDomain: true
        }
      },

      remote: {
        // we need to put the query in the url because typehead.js
        // uses the url as a cache key (https://github.com/twitter/typeahead.js/issues/894#issuecomment-48852916)
        // url: restRoot + 'DoSmartSearch',
        url: restRoot + 'DoSmartSearch?query=%QUERY',

        filter: filterRemote,

        // The time interval in milliseconds that will be used by rateLimitBy. 
        // Defaults to 300
        rateLimitWait: 400,

        ajax: {
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          dataWithWildcard: JSON.stringify({
            credentials: this.credentials,
            searchRequest: {
              index: 'Saio',
              lang: 'fr',
              request: '%QUERY'
            }
          })
        }
      }
    };

    // PUBLIC:
    this.setUpBloodhound = function() {

      var params = _.extend(settings, options);

      // if strategy is set to words, then switching to semantic search
      // (remote for Bloodhound) is handled manually
      // so we had a remote source only if strategy is set to suggestions
      if (this.strategy === 'suggestions') {
        params.limit = this.semanticOffset;
      }

      this.bloodhound = new Bloodhound(params);
      this.bloodhound.initialize();
    };

    this.useSemanticMatching = function(query) {
      var nbSpaces = (query.match(/\S+/g) || []).length;
      return nbSpaces >= this.semanticOffset;
    };

    this.clearPrefetchCache = function() {
      console.log('clear prefetching cache');
      this.bloodhound.clearPrefetchCache();
    };

    this.destroy = function() {
      $(this.selector).typeahead('destroy');
    };

    this.addSuggestionsToInput = function(selector, strategy, semanticOffset) {

      console.log('init synapse suggest input with selector= ' + selector);

      this.strategy = strategy;
      this.semanticOffset = semanticOffset;
      this.selector = selector;

      this.setUpBloodhound();

      // Typeahead Params:
      var params = {
        name: 'questions',
        displayKey: 'text',
        // custom tpls:
        templates: {
          suggestion: function(suggestion) {
            return '<span class="' + suggestion.source + '"">' + suggestion.text + '</span>';
          }
        }
      };

      if (this.strategy === 'suggestions') {
        params.source = this.bloodhound.ttAdapter();
      } else {
        // See synapse ugly solution
      }

      $(selector).typeahead({
        autoselect: options.autoselect || false,
        hint: options.hint || false,
        highlight: options.highlight || false,
        minLength: options.minLenght || 2,
      }, params);
    };

    this.setUpBloodhound();
  };

}));
