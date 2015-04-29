/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    config = require('app/globals'),
    app = require('app/app'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatOperator;

  MessageChatOperator = MessageChatView.extend({

    className: 'lily-msg lily-msg-chat-operator lily-cst-msg-chat-operator',
    model: Models.ChatMessage,
    template: _.template($('#chat-message-notation').html()),

    events: {
      'click  .lily-icon-thumb-up': 'satisfaction',
      'click  .lily-icon-thumb-down': 'satisfaction',
    },

    initialize: function() {

    },

    satisfaction: function(e) {

      var target = $(e.target),
        satisfaction;

      this.$el.find('#lily-chat-notation-wrapper i').removeClass('active');

      if (target.hasClass('lily-icon-thumb-up')) {
        this.$el.find('.lily-icon-thumb-up').addClass('active');
        satisfaction = true;
      } else {
        this.$el.find('.lily-icon-thumb-down').addClass('active');
        satisfaction = false;
      }

      app.trigger('chat:satisfaction', satisfaction);
    },

  });

  return MessageChatOperator;
});
