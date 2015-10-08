
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _        = require('underscore'),
      app      = require('front/app'),

      // Object wrapper returned as a module
      AviEmptyView;

  AviEmptyView = Backbone.View.extend({

    className: 'lily-empty-wrapper lily-avi-empty-wrapper',
    template: _.template($('#avi-empty').html()),

    events: {
      'click .lily-top-question-link': 'onTopQuestionClick'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.lily-box-messages');
      return this;
    },

    onTopQuestionClick: function(ev) {
      var id = $(ev.currentTarget).data('questionId');
      var question = id ? _.filter(this.model.get('questions'), function(question) {
        return question.id === id;
      })[0] : null;

      app.trigger('avi:askFromTopQuestion', question);
    },
  });

  return AviEmptyView;
});
