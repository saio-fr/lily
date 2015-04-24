/* ===========================
       Chat Server View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatServer;

  MessageChatServer = MessageChatView.extend({

    className: 'lily-msg lily-msg-server lily-cst-msg-server lily-msg-reconnect animated',
    model: Models.ServerMessages,
    template: _.template($('#chat-message-reconnect').html()),

  });

  return MessageChatServer;
});
