/* ===========================
      User Simple View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _           = require('underscore'),
    Models      = require('front/data/models'),
    MessageView = require('front/views/message'),
    // Object wrapper returned as a module
    MessageUserSimple;


MessageUserSimple = MessageView.extend({

	className: 'msg msg-user cst-msg-user',
	model: Models.MessageUser,
	template: _.template( $('#message-user').html() )
});

return MessageUserSimple;
});

