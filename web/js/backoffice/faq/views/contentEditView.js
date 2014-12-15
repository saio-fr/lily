
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

    id: '#faq-detail',
    tagName: "aside",
    className: "aside-faq bg-light lter b-l hide",

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

      $(".main-container").append(this.$el);

      $('#faq-editor').wysihtml5(globals.faqWysiConfig);

      return this;
    },

    update: function () {

      var content = $(this.$el).find('#faq-editor').val();

      this.model.set({
        'content': content,
      });

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
      this.remove();
    }
  });

  return ContentEditView;
});