//var lily = lily || {};

// View
// --------------

lily.Views.MessageLilySimple = lily.Views.MessageView.extend({
	
	className: 'lily-msg-avatar lily-cst-msg-avatar',
	
	model: lily.Models.MessageLilySimple,
	
	template: _.template( $('#lily-message-simple').html() )
	
});

