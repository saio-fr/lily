/*======================================
        CONVERSATION COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      QuestionCollection;

  QuestionCollection = Backbone.Collection.extend({

    url: function () {
      return '/avi/topquestions';
    },
    
    initialize: function () {
    }
    
  });

  return QuestionCollection;
});
