/* ===========================
            API
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/app'),
    when = require('when'),
    Models = require('app/data/models'),
    config = require('app/globals'),
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
          console.log(err);
        }
      });
    }

    return deferred.promise;
  };

  api.sendSynapse = function(method, url, data) {
    var deferred = when.defer();

      var credentialsJson = {
        "user": config.synapse.user,
        "password": config.synapse.password
      },
      input = _.extend(data, { credentials: credentialsJson });

    if (method && url) {
      $.ajax({
        type: method,
        url: config.synapse.restRoot + url,
        data: JSON.stringify(input),
        dataType: 'json',
        contentType: "application/json; charset=utf-8",

        success: function(data) {
          deferred.resolve(data);
          console.log(data);
        },

        error: function(err) {
          deferred.reject(err);
          console.log(err);
        }
      });
    }

    return deferred.promise;
  };

  api.getAnswerFromId = function(answerId, callback) {
    return this.sendSynapse("POST", "getAnswerTextFromId", { id: answerId });
  };

  api.sendMail = function(data) {
    app.track("mail/send_mail");
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

    if (app.skeleton.faqCollection) {
      faq = app.skeleton.faqCollection.findWhere({
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
      }, function(err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  };

  return api;
});
