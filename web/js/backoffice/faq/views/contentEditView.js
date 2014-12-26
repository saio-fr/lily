
/*========================================
  Vue CONTENT EDIT
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      globals = require('backoffice/globals'),

      // Object wrapper returned as a module
      ContentEditView;

  ContentEditView = Backbone.View.extend({

    tagName: "aside",
    className: "aside-faq bg-light lter b-l hide",

    template: _.template($('#editTpl').html()),

    events: {

      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
    },

    initialize: function () {

      this.listenTo(this.model, 'destroy', this.cancel);
      this.render();
    },

    render: function () {

      this.$el
        .removeClass('hide')
        .html(this.template(this.model.toJSON()));

      $('.js-main-container').append(this.$el);
      // init wysiwig on content editor using wysihtml5 lib.
      $('.js-editor-input').wysihtml5(globals.faqWysiConfig);

      return this;
    },

    update: function () {

      var content = $(this.$el).find('.js-editor-input').val();
      this.model.set({ 'content': content });
      this.hide();
      app.skeleton.closeEditView();

      // blur active item.
      app.skeleton.unsetActive();
    },

    cancel: function () {

      app.skeleton.unsetActive();
      this.hide();
      app.skeleton.closeEditView();
    },

    show: function () {

      this.$el.removeClass('hide');
    },

    hide: function () {

      this.$el.addClass('hide');
    }
  });

  return ContentEditView;
});
