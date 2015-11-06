/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _               = require('underscore'),
      Models          = require('front/data/models'),
      MessageChatView = require('front/views/messageChat'),
      // Object wrapper returned as a module
      MessageChatVisitor;

  MessageChatVisitor = MessageChatView.extend({

    className: 'msg msg-chat-visitor cst-msg-chat-visitor',
    model: Models.ChatMessage,
    template: _.template($('#chat-message-visitor').html())
  });

  return MessageChatVisitor;
});
