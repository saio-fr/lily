//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageView = Backbone.View.extend({
	
	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#lily-box-messages' );
		this.transitionInMessage();
		this.trigger('render');
		return this;
	},
	
	transitionInMessage: function (callback) {
		
		var $message = this.$el;
		var inClass = 'lily-message-show';
		
		$message.addClass( inClass ).on( animEndEventName, function() {

			$message.off( animEndEventName );
			
			$('#lily-box-messages').animate({
				scrollTop: $('#lily-box-messages').get(0).scrollHeight
			}, 500);
			
		} );
		
	}
	
});