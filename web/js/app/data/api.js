/* ===========================
            API
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var $ = require('jquery'),
      _ = require('underscore'),
      app = require('app/app'),
      when = require('when'),
      config = require('app/globals'),
      // Object wrapper returned as a module
      api = {};

  api.send = function (method, url, data) {
    var deferred = when.defer();

    if (method && url) {
      $.ajax({
        type: method,
        url: url,
        data: data,

        success: function (data) {
          deferred.resolve(data);
          console.log(data);
        },

        error: function (err) {
          deferred.reject(err);
          console.log(err);
        }
      });
    }

    return deferred.promise;
  };

  api.sendMail = function (data) {
    return this.send('POST', '/api/' + config.licence + '/sendmail', data);
  };

  api.redirectionMail = function (data, id) {
    return this.send('POST', '/api/' + config.licence + '/avi/redirection/' + id + '/mail', data);
  };

  api.getFaq = function (parent) {
    return this.send('GET', '/api/' + config.licence + '/faq/' + parent);
  };

  api.getTopQuestions = function (id) {
    return this.send('GET', '/api/' + config.licence + '/top-questions/' + id);
  };


  // Returns the list of categories and contents for a given parent.
  // Looks for existing list in faqModel or gets from API
  api.getFaqList = function (parent) {
    var deferred = when.defer(),
        faqs;

    if (app.skeleton.faqModel && app.skeleton.faqModel.get('faqs')) {
      faqs = app.skeleton.faqModel.get('faqs');
      deferred.resolve(faqs);
    } else {
      faqs = api.getFaq(parent).then(function (data) {
        deferred.resolve(data.faqs);
      }, function (err) {
        deferred.reject(err);
      });
    }

    return deferred.promise;
  };

  return api;
});

