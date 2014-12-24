/* ===========================
      Operator Simple View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Models = require('app/data/models'),
    MessageView = require('app/views/message'),
    // Object wrapper returned as a module
    MessageLilySimpleView;


MessageLilySimpleView = MessageView.extend({

	className: 'lily-msg-avatar lily-cst-msg-avatar',
	model: Models.MessageLilySimple,
	template: _.template( $('#lily-message-simple').html() )
});

return MessageLilySimpleView;
});

