
/*========================================
  Vue CONTENT EDIT
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      globals = require('backoffice/globals'),

      // Object wrapper returned as a module
      ContentEditView;

  ContentEditView = Backbone.View.extend({

    el: '#faq-detail',

    template: _.template($('#contentEdit').html()),

    events: {

      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
    },

    initialize: function () {

      this.listenTo(this.model, 'destroy', this.remove);
      this.render();
    },

    render: function () {

      this.$el
        .removeClass('hide')
        .html(this.template(this.model.toJSON()));

      $('#faq-editor').wysihtml5(globals.faqWysiConfig);

      return this;
    },

    update: function () {

      var content = $(this.$el).find('#faq-editor').val();

      this.model.set({
        'content': content,
      });

      this.model.saveFaq();

      this.remove();
      $('#faq-list .active').removeClass('active');
    },

    cancel: function () {

      this.remove();
      $('#faq-list .active').removeClass('active');
    },

    show: function () {

      this.$el.removeClass('hide');
    },

    close: function () {

      this.$el.addClass('hide');
      this.$el.unbind();
    }
  });

  return ContentEditView;
});