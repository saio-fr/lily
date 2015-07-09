/* ===========================
            API
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var $      = require('jquery'),
      _      = require('underscore'),
      app    = require('front/app'),
      when   = require('when'),
      Models = require('front/data/models'),
      config = require('front/globals'),

    // Object wrapper returned as a module
    api = {};

  api.send = function(method, url, data) {
    var deferred = when.defer();

    if (method && url) {
      $.ajax({
        type: method,
        url: config.root + url,
        data: data,

        success: function(data) {
          deferred.resolve(data);
          console.log(data);
        },

        error: function(err) {
          deferred.reject(err);
        }
      });
    }

    return deferred.promise;
  };

  api.sendSynapse = function(method, url, data) {
    var deferred = when.defer();

    var credentialsJson = {
      'password': config.synapse.password,
      'user': config.synapse.user
    },
    input = _.extend(data, { credentials: credentialsJson });

    if (method && url) {
      $.ajax({
        type: method,
        url: config.synapse.restRoot + url,
        data: JSON.stringify(input),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',

        success: function(data) {
          deferred.resolve(data);
          console.log(data);
        },

        error: function(err) {
          deferred.reject(err);
          console.error(err);
        }
      });
    }

    return deferred.promise;
  };

  /**
   * Gets the answer to a question in the KB by its Id
   * @param  int answerId
   * @return {} answer:
   *
   *  id int
   *  children []
   *  title string
   *  answer string
   *  questionType string (question, action)
   *  answerType string (answer, precision)
   */
  api.getAnswerFromId = function(id) {
    return this.send('GET', '/api/' + config.licence + '/question/' + id);
  };

  /**
   * Log any question asked via the automatic chat that we didn't find an answer for
   * @param  string question
   * @return boolean success
   */
  api.logUnanswered = function(question) {
    var data = JSON.stringify({
      query: question
    });
    return this.send('POST', '/api/' + config.licence + '/log/unanswered', data);
  };

  /**
   * Log any question asked via the automatic chat
   * @param  string question
   * @return boolean success
   */
  api.logRequest = function(question, id) {
    var data = JSON.stringify({
      query: question
    });
    return this.send('POST', '/api/' + config.licence + '/log/request/' + id, data);
  };

  /**
   * Logs a satisfaction vote on a given answer
   * @param  int id
   * @param  boolean satisfied
   * @param  string reason
   * @return boolean success
   */
  api.logSatisfaction = function(id, satisfied, reason) {
    var data = JSON.stringify({
      satisfied: satisfied,
      reason: reason || null
    });
    return this.send('POST', '/api/' + config.licence + '/log/satisfaction/question/' + id, data);
  };

  /**
   * Log a redirection to another communication channel
   * @param  string canal (chat, mail, phone)
   * @return boolean success
   */
  api.logRedirection = function(canal) {
    var data = JSON.stringify({
      'canal': canal
    });
    return this.send('POST', '/api/' + config.licence + '/log/redirection', data);
  };

  api.sendMail = function(data) {
    app.track.submit('Successfuly sent a redirection Email');
    return this.send('POST', '/api/' + config.licence + '/mail', data);
  };

  api.redirectionMail = function(data, id) {
    return this.send('POST', '/api/' + config.licence + '/avi/redirection/' +
      id + '/mail', data);
  };

  api.getTopQuestions = function(id) {
    return this.send('GET', '/api/' + config.licence + '/top-questions/' + id);
  };

  api.getFaq = function(parent) {
    return this.send('GET', '/api/' + config.licence + '/faq/' + parent);
  };

  api.getFaqModel = function(id) {
    var deferred = when.defer(),
      faq;

    if (app.faqCollection) {
      faq = app.faqCollection.findWhere({
        id: id
      }) || null;
    }

    if (faq) {
      deferred.resolve(faq);
    } else {
      api.getFaq(id).then(function(data) {
        var sortedData, model;

        sortedData = _.indexBy(data.faqs, 'position');

        model = new Models.Faq({
          id: data.id,
          parent: data.parent,
          title: data.title,
          faqs: sortedData
        });

        deferred.resolve(model);
      },

      function(err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  };

  return api;
});
