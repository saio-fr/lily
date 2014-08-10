//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageUserSimple = lily.Views.MessageView.extend({
	
	className: 'lily-msg-user lily-cst-msg-user',
	
	model: lily.Models.MessageUser,
	
	template: _.template( $('#lily-message-user').html() )
});

