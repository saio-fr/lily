/*========================================
    ACTIVITIES/STATISTICS/GRAPH VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      QuestionsView;

  QuestionsView = Backbone.View.extend({

    el: '.avi-wrapper .top-questions-wrapper',
    template: _.template($('#aviTopQuestionsTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template({
        questions: this.collection.toJSON()
      }));
      return this;
    }

  });

  return QuestionsView;
});
