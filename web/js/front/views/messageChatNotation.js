/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _               = require('underscore'),
      config          = require('front/config'),
      app             = require('front/app'),
      Models          = require('front/data/models'),
      MessageChatView = require('front/views/messageChat'),
      // Object wrapper returned as a module
      MessageChatOperator;

  MessageChatOperator = Backbone.View.extend({

    className: 'msg msg-chat-notation msg-server',
    model: Models.ChatMessage,
    template: _.template($('#chat-message-notation').html()),

    events: {
      'click .icon-thumb-up': 'satisfaction',
      'click .icon-thumb-down': 'satisfaction'
    },

    initialize: function() {
      this.render();
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.box-messages');
      this.trigger('render');
      return this;
    },

    satisfaction: function(ev) {

      var target = $(ev.target),
        satisfaction;

      $('.msg-chat-notation i').removeClass('active');

      if (target.hasClass('icon-thumb-up')) {
        this.$el.find('.icon-thumb-up').addClass('active');
        satisfaction = true;
      } else {
        this.$el.find('.icon-thumb-down').addClass('active');
        satisfaction = false;
      }

      app.trigger('chat:satisfaction', satisfaction);
    }

  });

  return MessageChatOperator;
});
