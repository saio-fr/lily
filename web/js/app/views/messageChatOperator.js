/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    config = require('app/globals'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatOperator;

  MessageChatOperator = MessageChatView.extend({

    className: 'lily-msg-chat-operator lily-cst-msg-chat-operator',
    model: Models.LilySimple,
    template: _.template($('#chat-message-operator').html()),

    initialize: function() {
      // set the avatar img src to existing src or default config one.
      if (this.model && this.model.get('operator')) {
        var operator = _.clone(this.model.get('operator'));
        if (operator.avatar) {
          operator.avatar = config.baseAvatarUrl + operator.avatar;
        } else {
          operator.avatar = config.unknownAvatarUrl || '';
        }
        this.model.set('operator', operator);
      }
    }
  });

  return MessageChatOperator;
});
