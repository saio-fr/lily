//var lily = lily || {};

// View
// --------------

lily.Views.MessageChatOperator = lily.Views.MessageChatView.extend({
	
	className: 'lily-msg-chat-operator lily-cst-msg-chat-operator',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#chat-message-operator').html() )
	
});

