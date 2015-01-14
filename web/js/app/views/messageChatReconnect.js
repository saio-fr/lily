/* ===========================
       Chat Server View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    config = require('app/globals'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatServer;

  MessageChatServer = MessageChatView.extend({

    className: 'lily-msg-server lily-cst-msg-server lily-msg-reconnect animated',
    model: Models.ServerMessages,
    template: _.template($('#chat-message-reconnect').html()),

    initialize: function() {
      this.listenTo(this.model, "change", this.render);
    }
  });

  return MessageChatServer;
});
