/*========================================
      Question Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),

      // Object wrapper returned as a module
      QuestionEditView;

  QuestionEditView = Backbone.View.extend({

    className: 'vbox bg-light lter',
    template: _.template($('#questionsEditTpl').html()),

    events: {
      'submit': 'noSubmit',
      'click .button-update': 'update',
      'click .button-cancel': 'close',
      'keypress' : 'updateOnEnter',
    },

    initialize: function () {
      app.on('closeEditView', _.bind(this.close, this));
      this.listenTo(this.model, 'destroy', this.close);

      this.render();
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.js-questions-edit');
      $('.js-questions-edit').removeClass('hide');

      return this;
    },

    update: function () {

    },
    
    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.update();
      }
    },

    noSubmit: function (e) {
      e.preventDefault();
    },

    close: function () {
      $('.js-questions-list .active').removeClass('active');
      $('.js-questions-edit').addClass('hide');
      this.remove();
    }

  });

  return QuestionEditView;
});

