//var lily = lily || {};

// View
// --------------

lily.Views.MessageChatVisitor = lily.Views.MessageChatView.extend({
	
	className: 'lily-msg-chat-visitor lily-cst-msg-chat-visitor',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#chat-message-visitor').html() )
	
});

