(function(root, factory) {
  /* istanbul ignore next */
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'typeahead'], function($, typeahead) {
      return (root.synapse = factory(root, $, typeahead));
    });
  } else if (typeof exports !== 'undefined') {
    var $ = require('jquery');
    window.jQuery = $;
    var typeahead = require('typeahead');
    module.exports = factory(root, $, typeahead);
  } else {
    root.synapse = factory(root, root.$, root.typeahead);
  }

}(this, function(root, $, typeahead) {
  'use strict';

  // var restRoot = 'http://syn-web08.synapse-fr.com/api/saio/smartfaq/SmartFAQWCF.svc/rest/';
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

  // Filters out questions that have the same answer Id
  function filterUniqueAnswer(response) {
    var result = [],
        ids = [];

    $.each(response.questions, function(index, question) {
      if (!ids[question.answerId]) {
        ids[question.answerId] = true;

        result.push({
          normalizedText: normalize(question.text),
          text: question.text,
          answerId: question.answerId,
          source: 'prefetch'
        });
      }
    });

    return result;
  }

  var queryTokenizer = function(q) {
    var normalized = normalize(q);
    return Bloodhound.tokenizers.whitespace(normalized);
  };

  var dupDetector = function(remoteMatch, localMatch) {
    if (remoteMatch.answerId && localMatch.answerId) {
      return remoteMatch.answerId == localMatch.answerId;
    }

    return false;
  };

  return function synapse_suggest(user, password) {
    var credentialsInner = '<password>' + password + '<\/password><user>' + user + '<\/user>';
    this.Credentials = '<Credentials>' + credentialsInner + '<\/Credentials>';
    this.credentials = '<credentials>' + credentialsInner + '<\/credentials>';
    this.credentialsJson = { "password": password, "user": user };

    // this.emptyMessage = '<div class="empty-suggestion">Je n\'ai pas trouvé de réponse correspondant à votre question</div>';
    this.emptyMessage = '';

    this.setUpBloodhound = function() {

      var params = {
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('normalizedText'),
        queryTokenizer: queryTokenizer,

        //Bloodhound.tokenizers.whitespace,
        dupDetector: dupDetector,

        prefetch: {
          url: restRoot + 'GetListQuestions',

          // don't store questions in local storage
          // (because several knowledge bases are queried from the same domain)
          // cacheKey: ...
          // TODO: instead of desabling local storage, we could could use a diffrent cacheKey
          // for each  knowledge base
          cache: false,

          ajax: {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(this.credentialsJson),
            crossDomain: true
          },

          ttl: 60000,

          // time (in milliseconds) the prefetched data should be cached
          // in local storage; default is one day

          filter: function(response) {
            var result = $.map(response.questions, function(question) {
              return {
                normalizedText: normalize(question.text),
                text: question.text,
                answerId: question.answerId,
                source: 'prefetch'
              };
            });

            return result;
          }
        }
      };

      // if strategy is set to words, then switching to semantic search
      // (remote for Bloodhound) is handled manually
      // so we had a remote source only if strategy is set to suggestions
      if (this.strategy === 'suggestions') {
        params.limit = this.semanticOffset;

        console.log(JSON.stringify({
          credentials: this.credentialsJson,
          searchRequest: {
            index: 'Saio',
            lang: 'fr',
            request: '%QUERY'
          }
        }));

        params.remote = {
          // we need to put the query in the url because typehead.js
          // uses the url as a cache key (https://github.com/twitter/typeahead.js/issues/894#issuecomment-48852916)
          // url: restRoot + 'DoSmartSearch',
          url: restRoot + 'DoSmartSearch?query=%QUERY',

          ajax: {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            dataWithWildcard: JSON.stringify({
              credentials: this.credentialsJson,
              searchRequest: {
                index: 'Saio',
                lang: 'fr',
                request: '%QUERY'
              }
            })
          },

          filter: function(response) {
            var rawResults = response.searchResults.searchResults !== '' ? response.searchResults.searchResults : '{}';
            var resultsJson = JSON.parse(rawResults);
            console.log(resultsJson);
            var results = [];
            var textResults = [];

            // a table containing only the text of the matched question to efficiently test duplicates in following loops
            if (resultsJson.QA && resultsJson.QA.results.suggestions) {
              // when there are seva=eral suggestions, .NET serializes resultsJson.QA.results.suggestions.suggestion as a table
              // otherwise, it is just a javascript object
              // this ugly if is here to fix this
              var sugg = resultsJson.QA.results.suggestions.suggestion;
              if (sugg.constructor === Array) {
                $.each(resultsJson.QA.results.suggestions.suggestion, function(index, value) {
                if ($.inArray(value.sentence, textResults) == -1) {
                  results.push({text: value.sentence, answerId: (value['@bIsQuestion'] == 'true' ? value['@answerId'] : value['@id']), source: 'remote'});
                  textResults.push(value.sentence);
                }
              });
              } else {
                results.push({text: sugg.sentence, answerId: (sugg['@bIsQuestion'] == 'true' ? sugg['@answerId'] : sugg['@id']), source: 'remote'});
              }
            }

            return results;
          }

          //rateLimitBy: null,
        };
      }

      this.bloodhound = new Bloodhound(params);
      this.bloodhound.initialize();
    };

    this.setUpBloodhound();

    this.useSemanticMatching = function(query) {
      var nbSpaces = (query.match(/ /g) || []).length;
      return nbSpaces >= this.semanticOffset;
    };

    this.suggestionsMatcher = function() {
      var that = this;

      return function findMatches(query, callback) {

        if (that.useSemanticMatching(query)) {

          var smartSearchCallback = function(userQuestion) {

            return function(data, textStatus, jqXHR) {

              if (textStatus === "success") {
                var resultsJson = JSON.parse(data.searchResults.searchResults);
                var results = [];
                var ids = [];
                console.log(JSON.stringify(resultsJson));

                if (resultsJson.QA.results.suggestions) {

                  $.each(resultsJson.QA.results.suggestions, function(index, question) {
                    if (!ids[question['@answerId']]) {
                      ids[question['@answerId']] = true;

                      results.push({
                        normalizedText: normalize(question.text),
                        text: question.sentence,
                        answerId: question['@answerId'],
                        source: 'remote'
                      });
                    }
                  });
                }

                callback(results);
              }
            };
          };

          // doSmartSearchWS(query, smartSearchCallback);
        } else {

          that.bloodhound.get(query, function(suggestions) {
            callback(suggestions);
          });
        }
      };
    };

    this.clearPrefetchCache = function() {
      console.log('clear prefetching cache');
      this.bloodhound.clearPrefetchCache();
    };

    this.destroy = function() {
      $(this.selector).typeahead('destroy');
    };

    this.addSuggestionsToInput = function(selector, strategy, semanticOffset) {

      // TODO: should this function also expect a maxDisplayedSuggestions argument?
      console.log('init synapse suggest input with selector= ' +
        selector + ', strategy= ' + strategy + ', semanticOffset= ' + semanticOffset);

      this.strategy = strategy;
      this.semanticOffset = semanticOffset;
      this.selector = selector;

      this.setUpBloodhound();

      var params = {
        name: 'questions',
        displayKey: 'text',
        templates: {
          empty: this.emptyMessage,
          suggestion: function(suggestion) {
            return '<span class="' + suggestion.source + '"">' + suggestion.text + '</span>';
          }
        }
      };

      if (this.strategy === 'suggestions') {
        params.source = this.bloodhound.ttAdapter();
      } else {
        params.source = this.suggestionsMatcher();
      }

      $(selector).typeahead({
        hint: false,
        highlight: true,
        minLength: 2
      }, params);
    };

    // unified interface

    this.fuzzyMatching = function(userQuery, callback) {
      this.bloodhound.get(userQuery, callback);
    };
  };

}));
