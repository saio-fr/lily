/*======================================
              Question View
  =========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

    // Object wrapper returned as a module
    QuestionView;

  QuestionView = Backbone.View.extend({

    tagName: "li",
    className: "list-group-item clear hover",

    template: _.template($('#questionsQuestionTpl').html()),

    initialize: function () {
      this.listenTo(app, 'questions:trash', this.trash);
    },

    events: {
      'click .checkbox' : 'select'
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    select: function(e) {
      app.trigger('questions:select');
    },

    edit: function(e) {
    },
    
    trash: function () {
      if (this.$el.find('.checkbox input').is(':checked')) {
        app.counters.questions -= 1;
        app.changeCounters();
        this.model.destroy();
        this.remove();
      }
    }
    
  });

  return QuestionView;
});
