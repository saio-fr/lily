/*========================================
      Redirection Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      RedirectionModel = require('backoffice/redirection/models/redirectionModel'),

      // Object wrapper returned as a module
      EditView;

  EditView = Backbone.View.extend({

    model: RedirectionModel,

    tagName: 'aside',
    className: 'js-redirection-edit aside-redirection bg-light lter hide',

    template: _.template($('#editTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
      'keypress' : 'updateOnEnter'
    },

    initialize: function () {

      this.$el.removeClass('hide');
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.close);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function () {

      var title = $(this.el).find('#titleForm').val();
      var object = $(this.el).find('#objectForm').val();
      var phone = $(this.el).find('#phoneForm').val();
      var mail = $(this.el).find('#mailForm').val();

      this.model.set({
        'title': title,
        'object': object,
        'phone': phone,
        'mail': mail
      });

      this.hide();
      this.remove();
    },
    
    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.update();
      }
    },

    hide: function () {

      this.$el.addClass('hide');
      $('.js-redirections-list .active').removeClass('active');
    },

    cancel: function () {

      this.model.cancel();
      this.hide();
      this.remove();
    },

  });

  return EditView;
});

