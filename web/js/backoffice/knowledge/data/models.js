/* ===========================
          Models
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    NestedModel = require('backbone-nested'),
    g = require('config'),
    // Object wrapper returned as a module
    Models = {};

  Models.Question = Backbone.NestedModel.extend({

    defaults: {
      title: 'Nouvelle question',
      questionType: '',
      answer: '',
      answerType: '',
      children: [],
      alternatives: []
    },

    initialize: function () {
      this.urlRoot = "/questions";
    },

  });

  Models.AlternativeQuestion = Backbone.NestedModel.extend({

    defaults: {
      title: 'Nouvelle question alternative',
    }
  });

  Models.QuestionTree = Models.Question.extend({

    defaults: {
      title: '',
      questionType: '',
      answer: '',
      answerType: '',
    },

    initialize: function () {
      this.listenTo(this, 'change:answerType', this.translateAnswerType);
    },

    setQuestionType: function (type) {
      this.set({questionType: type});
    },

    setAnswerType: function (type) {
      this.set({answerType: type});
    },

    translateAnswerType: function () {

      switch (this.get('answerType')) {
        case 'answer':
          this.set({'translated.answerType': 'réponse'});
          break;

        case 'precision':
          this.set({'translated.answerType': 'précision'});
          break;

        default:
          this.set({'translated.answerType': ''});
      }
    }

  });
  Models.Category = Backbone.NestedModel.extend({

    defaults: {
      title: '',
      children: null
    },

    initialize: function () {
      this.urlRoot = "/questions/categories";
    },
  });
  Models.CategoryNull = Backbone.Model.extend({

    defaults: {
      id: 0,
      title: 'Sans catégorie',
      children: null
    },

    initialize: function () {
      this.urlRoot = "/questions/categories";
    },

  });

  return Models;
});
