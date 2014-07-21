chat.Views.MessageOperator = chat.Views.Message.extend({
	
	tagName: 'li',
	className: 'conversation-section-item animated',
	template: _.template( $('#message-operator').html() )
	
});

