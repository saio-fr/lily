/* ===========================
      Operator Simple View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _           = require('underscore'),
    Models      = require('front/data/models'),
    MessageView = require('front/views/message'),
    // Object wrapper returned as a module
    MessageLilySimpleView;


MessageLilySimpleView = MessageView.extend({

	className: 'msg msg-avatar cst-msg-avatar',
	model: Models.MessageLilySimple,
	template: _.template( $('#message-simple').html() )
});

return MessageLilySimpleView;
});

