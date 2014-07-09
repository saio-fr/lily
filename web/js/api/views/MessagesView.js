//var lily = lily || {};

// 
// --------------


lily.Views.MessagesView = Backbone.View.extend({
	
	addItem: function( messageModel, messageType) {
		
		// remove waiting message if exists.
		
		// create an instance of the sub-view to render the single message item.
		switch ( messageType ) {
			case 'user-simple':
				var message = new lily.Views.MessageUserSimple({
					model: messageModel
				}).render();
				break;
			case 'lily-simple':	
				var message = new lily.Views.MessageLilySimple({
					model: messageModel
				}).render();
				break;
			case 'lily-redirection':
				var message = new lily.Views.MessageLilyRedirection({
					model: messageModel
				}).render();
				break;
			case 'lily-precision':	
				var message = new lily.Views.MessageLilyPrecision({
					model: messageModel
				}).render();
				break;
			case 'lily-notation':
				var message = new lily.Views.MessageLilyNotation({
					model: messageModel
				}).render();
				break;
			case 'lily-completion':	
				var message = new lily.Views.MessageUserCompletion({
					model: messageModel
				}).render();
				break;
		}
	}
});