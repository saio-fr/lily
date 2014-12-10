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
    className: 'aside-redirection bg-light lter b-l hide',
    id: 'redirection-edit',

    template: _.template($('#editTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
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

      var title = $(this.el).find('#title').val();
      var object = $(this.el).find('#object').val();
      var phone = $(this.el).find('#phone').val();
      var mail = $(this.el).find('#mail').val();

      this.model.set({
        'title': title,
        'object': object,
        'phone': phone,
        'mail': mail
      });

      this.model.save();

      this.$el.addClass('hide');
      this.remove();
    },

    cancel: function () {

      this.model.cancel();
      this.$el.addClass('hide');
      this.remove();
      $('#list-redirections .active').removeClass('active');
    },

  });

  return EditView;
});

