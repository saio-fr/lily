/*========================================
      Shortcut Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      validation = require('utils/backbone-validation-backoffice'),

      // Object wrapper returned as a module
      EditView;

  EditView = Backbone.View.extend({

    tagName: 'aside',
    className: 'js-shortcuts-edit aside-shortcuts bg-light lter',

    template: _.template($('#shortcutsEditTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'remove',
      'keypress' : 'updateOnEnter'
    },

    initialize: function () {
      Backbone.Validation.bind(this);
      this.listenTo(this.model, 'destroy', this.close);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function () {

      var title = this.$('input[name="title"]')
        .val()
        .toLowerCase();
      var description = this.$('textarea[name="description"]').val();
      var message = this.$('textarea[name="message"]').val();

      this.model.set({
        'title': title,
        'description': description,
        'message': message
      }, {
        silent:true
      });

      if (this.model.isValid(true)) {

        this.model.trigger('renderView');
        this.model.save();
        this.remove();
      }
    },

    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.update();
      }
    },

    remove: function () {

      $('.js-shortcuts-list')
        .find('.active')
        .removeClass('active');

      Backbone.Validation.unbind(this);
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return EditView;
});

