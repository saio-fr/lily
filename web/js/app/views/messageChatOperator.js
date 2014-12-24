/* ===========================
       Chat Operator View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Models = require('app/data/models'),
    MessageChatView = require('app/views/messageChat'),
    // Object wrapper returned as a module
    MessageChatOperator;

MessageChatOperator = MessageChatView.extend({

	className: 'lily-msg-chat-operator lily-cst-msg-chat-operator',
	model: Models.LilySimple,
	template: _.template( $('#chat-message-operator').html() )
});

return MessageChatOperator;
});


