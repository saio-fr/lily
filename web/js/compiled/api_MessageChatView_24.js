//var lily = lily || {};

// Todo Item View
// --------------

// The DOM element for a todo item...
lily.Views.MessageChatView = Backbone.View.extend({
	
	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#chat-box-messages' );
		$( '#chat-box-messages:last-child' ).scrollTop(10000);
		this.trigger('render');
		return this;
	},
	
});