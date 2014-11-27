chat.Views.MessageServer = chat.Views.Message.extend({
	
	tagName: 'p',
	className: 'msg-server',
	template: _.template( $('#message-server').html() ),

});

