/* ===========================
          Models
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    NestedModel = require('backbone-nested'),
    g = require('globals'),
    // Object wrapper returned as a module
    Models = {};

  Models.Question = Backbone.NestedModel.extend({
    
    defaults: {
      title: '',
      questionType: '',
      answer: '',
      answerType: '',
    },
    
    initialize: function () {
      this.urlRoot = "/questions";
    },
    
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
      
      switch (type) {
        case 'action':
          this.set({title: 'Action'});
          break;
      }
    },

    setAnswerType: function (type) {
      
      this.set({answerType: type});
      
      switch (type) {
        case 'answer':
          this.set({answer: 'Réponse'});
          break;
        case 'precision':
          this.set({answer: 'Demande de précision'});
          break;
      }
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
  Models.QuestionsCategory = Backbone.NestedModel.extend({});
  Models.QuestionsCategoryNull = Backbone.Model.extend({
    
    defaults: {
      id: null,
      color: '555c6a',
      title: 'Sans catégorie',
      children: null
    },
    
  });
  
  return Models;
});
