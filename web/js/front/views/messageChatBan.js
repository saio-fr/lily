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

    className: 'msg-server cst-msg-server msg-ban',
    model: Models.ServerMessages,
    template: _.template($('#chat-message-ban').html()),

  });

  return MessageChatServer;
});
