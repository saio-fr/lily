/*========================================
      Shortcut Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),

      // Object wrapper returned as a module
      EditView;

  EditView = Backbone.View.extend({

    tagName: 'aside',
    className: 'js-redirection-edit aside-redirection bg-light lter hide',

    template: _.template($('#shortcutsEditTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
      'keypress' : 'updateOnEnter'
    },

    initialize: function () {

      this.$el.removeClass('hide');
      this.listenTo(this.model, 'destroy', this.close);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function () {

      var title = this.$('input[name="title"]').val();
      var description = this.$('input[name="description"]').val();
      var message = this.$('input[name="message"]').val();
      
      this.model.set({
        'title': title,
        'description': description,
        'message': message
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
      $('js-shortcuts-list .active').removeClass('active');
    },

    cancel: function () {

      this.model.cancel();
      this.hide();
      this.remove();
    },

  });

  return EditView;
});

