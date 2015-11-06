/* ===========================
       Chat Server View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _               = require('underscore'),
      Models          = require('front/data/models'),
      MessageChatView = require('front/views/messageChat'),
      // Object wrapper returned as a module
      MessageChatServer;

  MessageChatServer = MessageChatView.extend({

    className: 'msg msg-server cst-msg-server msg-transfer',
    model: Models.ServerMessages,
    template: _.template($('#chat-message-transfer').html()),

  });

  return MessageChatServer;
});
