
define(['underscore', 'jquery', 'bloodhound', 'typeahead'], function(_, $, Bloodhound) {

  'use strict';

  return function synapseSuggest(credentials, restRoot, options) {

    var that = this;

    if (!credentials || _.isEmpty(credentials)) {
      console.error('No credentials set for synapse');
      return;
    }
    that.credentials = credentials;

    // PRIVATE
    var wildcard = '%QUERY';

    /**
     * Transform an id with synpase's syntax (w/ prefix "r_")
     * into a regular id
     *
     * @param  {String} id
     * @return {String}
     */
    var getBareAnswerId = function(id) {
      var prefix = /^r_/;
      return id.toString().replace(prefix, '');
    };

    var getBareQuestionId = function(id) {
      var suffix = id.toString().match(/_(\d*)+$/);
      return suffix ? suffix[0].replace(/^_/, '') : null;
    };

    var isParentQuestion = function(id) {
      return _.isArray(id.match(/(_0)+$/));
    };

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
      _.each(frMap, function(regex, normalized) {
        str = str.replace(regex, normalized);
      });

      return str;
    };

    var queryTokenizer = function(query) {
      var normalized = normalize(query);
      return Bloodhound.tokenizers.whitespace(normalized);
    };

    var preparePrefetch = function() {
      return {
          url: restRoot + 'GetListQuestions',
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify(that.credentials),
        };
    };

    var prepareRemote = function(query) {
      return {
          url: restRoot + 'DoSmartSearch?query=%QUERY'.replace(wildcard, query),
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            credentials: that.credentials,
            searchRequest: {
              index: 'Saio',
              lang: 'fr',
              request: '%QUERY'
            }
          }).replace(wildcard, query)
        };
    };

    var transformPrefetch = function(response) {
      var result = _.map(response.questions, function(question) {
        return {
          normalizedText: normalize(question.text),
          text: question.text,
          answerId: parseInt(getBareAnswerId(question.answerId), 10),
          id: parseInt(getBareQuestionId(question.id), 10),
          isParent: isParentQuestion(question.id),
          source: 'prefetch'
        };
      });

      return result;
    };

    var identify = function(obj) {
      return obj.answerId + '_' + obj.id;
    };

    var dupDetector = function(remoteMatch, localMatch) {
     return remoteMatch.answerId === localMatch.answerId;
    };

    var sortSuggestionsByScore = function(a, b) {
      var scoreA = a.score || 0;
      var scoreB = b.score || 0;
      return scoreA > scoreB;
    };

    // A function that allows you to transform the remote response
    // before the Bloodhound instance operates on it.
    var transformRemote = function(response) {

      var rawResults = response.searchResults.searchResults !== '' ?
        response.searchResults.searchResults : '{}';

      var resultsJson = JSON.parse(rawResults);
      var results = [];
      var textResults = [];

      console.log(resultsJson);

      // A table containing only the text of the matched question
      // to efficiently test duplicates in following loops
      if (!resultsJson.QA || !resultsJson.QA.results.suggestions) {
        return [];
      }

      // when there are seva=eral suggestions, .NET serializes
      // resultsJson.QA.results.suggestions.suggestion as a table
      // otherwise, it is just a javascript object
      // this ugly if is here to fix this
      var suggestions = resultsJson.QA.results.suggestions.suggestion;

      if (_.isArray(suggestions)) {
        _.each(suggestions, function(suggestion) {
          // suggestion is not in text result table
          if (_.indexOf(textResults, suggestions.sentence) === -1) {
            var answerId = (suggestion['@bIsQuestion'] === 'true' ?
                suggestion['@answerId'] : suggestion['@id']);

            results.push({
              text: suggestion.sentence,
              normalizedText: normalize(suggestion.sentence),
              answerId: parseInt(getBareAnswerId(answerId), 10),
              id: parseInt(getBareQuestionId(suggestion['@questionId']), 10),
              score: suggestion['@score'] ? parseFloat(suggestion['@score'], 10) : 0,
              isParent: isParentQuestion(suggestion['@questionId']),
              source: 'remote'
            });

            textResults.push(suggestion.sentence);
          }
        });
      } else {
        var answerId = (suggestions['@bIsQuestion'] === 'true' ?
            suggestions['@answerId'] : suggestions['@id']);

        results.push({
          text: suggestions.sentence,
          normalizedText: normalize(suggestions.sentence),
          answerId: parseInt(getBareAnswerId(answerId), 10),
          id: parseInt(getBareQuestionId(suggestions['@questionId']), 10),
          score: suggestions['@score'] ? parseFloat(suggestions['@score'], 10) : 0,
          isParent: isParentQuestion(suggestions['@questionId']),
          source: 'remote'
        });
      }

      // console.log(results);
      return results;
    };

    var parentSuggestion = function(suggestion) {
      var parentId, parentQuestion, similarQuestions;

      parentId = suggestion.answerId + '_' + 0;

      similarQuestions = this.bloodhound.get(parentId);
      parentQuestion = _.find(similarQuestions, function(question) {
        return question.isParent === true;
      });

      return parentQuestion ? parentQuestion.text : suggestion.text;
    };

    // Bloodhound params
    var settings = {
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('normalizedText'),
      queryTokenizer: queryTokenizer,
      identify: identify,
      dupDetector: dupDetector,

      // If the number of datums provided from the internal search index
      // is less than sufficient, remote will be used to backfill search requests
      // triggered by calling #search. Defaults to 5.
      sufficient: 3,
      sorter: sortSuggestionsByScore,

      prefetch: {
        url: restRoot + 'GetListQuestions',

        // Unique cacheKey for each KB
        cacheKey: that.credentials.user,

        // time (in milliseconds) the prefetched data should be cached
        // in local storage; default is one day
        ttl: 86400000, // (One day)

        prepare: preparePrefetch,

        transform: transformPrefetch
      },

      remote: {
        url: restRoot + 'DoSmartSearch?query=%QUERY',

        prepare: prepareRemote,

        rateLimitBy: 'debounce',

        // The time interval in milliseconds that will be used by rateLimitBy.
        // Defaults to 300
        rateLimitWait: 300,

        transform: transformRemote
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
        display: parentSuggestion.bind(this),
        limit: 3,
      };

      if (this.strategy === 'suggestions') {
        params.source = this.bloodhound.ttAdapter();
      } else {
        // See synapse ugly solution
      }

      $(selector).typeahead({
        hint: options.hint || false,
        highlight: options.highlight || false,
        minLength: options.minLenght || 2,
      }, params);
    };
  };

});
