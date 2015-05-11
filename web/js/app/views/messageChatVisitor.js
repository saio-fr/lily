/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatVisitor;

  MessageChatVisitor = MessageChatView.extend({

    className: 'lily-msg lily-msg-chat-visitor lily-cst-msg-chat-visitor',
    model: Models.ChatMessage,
    template: _.template($('#chat-message-visitor').html())
  });

  return MessageChatVisitor;
});
