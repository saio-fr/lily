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

    el: '#redirection-edit',

    template: _.template($('#editTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
    },

    initialize: function (redirection) {

      this.$el.removeClass('hide');
        this.model = redirection;
        this.render();
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

        this.close();
    },

    cancel: function () {

        this.model.cancel();
        this.close();
        $(this.el).addClass('hide');
        $('#list-redirections .active').removeClass('active');
    },

    close: function () {
      this.$el.unbind();
      this.$el.empty();
      this.$el.addClass('hide');
    }

  });

  return EditView;
});

