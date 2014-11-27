/***********************
PAGE CHAT VIEW
***********************/

lily.Views.Chat = lily.Extensions.View.extend({
	
	
	events: {
		'keyup #lily-search-form' : 'writing',
		'submit #lily-search-form' : 'doChat',
		'click #lily-go' : 'doChat',
		'click .lily-icon-thumb-up' : 'satisfaction',
		'click .lily-icon-thumb-down' : 'satisfaction'
	},	
	
	initialize: function() {
		
		chat = this;

		this.messages = new lily.Messages();
		this.listenTo(this.messages, 'add', this.addItem);
		
		lily.ws.subscribe('visitor/'+licence+'/'+sid, function (topic, payload) {
			
			chat.messages.set(payload);
			
		});
		
		lily.ws.call('chat/open');
							
		$(this.render().el).appendTo('#lily-wrapper-page');

		
	},
	
	render: function () {
		
		var template= _.template( $('#lily-page-chat-template').html());
		this.$el.html(template());
		this.trigger('render');
		$('input, textarea').placeholder();
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');
		
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	writing: function (e) {

		if( this.$input.val() ) {lily.ws.call('chat/writing', { sid: sid, writing: true } )}
		else {lily.ws.call('chat/writing', { sid: sid, writing: false } )}
		
	},
	
	doChat: function (e) {

		e.preventDefault();
		
		var message = this.$input.val();
		
		if ( $.trim(message).length > 0 ){/*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			this.send( message );
			
		}
		// clear the search field
		this.clearInput();
	},
	
	send: function ( m ) {		

		lily.ws.publish('operator/'+licence, m);
		
	},
	
	addItem: function( message  ) {

		// create an instance of the sub-view to render the single message item.
		switch ( message.get('from') ) {
			case 'visitor':
				var messageView = new lily.Views.MessageChatVisitor({
					model: message,
				}).render();
				break;
			case 'operator':
				this.$el.find('.lily-msg-chat-wait').hide();	
				var messageView = new lily.Views.MessageChatOperator({
					model: message
				}).render();
				break;
		}
	},
	
	clearInput: function() {
		
		if (isMobile.phone){
			this.$input.val('').blur();
		}
		else {this.$input.val('').focus().select();}
		
	},
	
	satisfaction: function(e) {
		
		target = $(e.target);
		this.$el.find('#lily-chat-notation-wrapper i').removeClass('active');
		
		if (target.hasClass('lily-icon-thumb-up')) {
			s = true;
			this.$el.find('.lily-icon-thumb-up').addClass('active');
		}
		else {
			s = false;
			this.$el.find('.lily-icon-thumb-down').addClass('active');
		}
		
		lily.ws.call('chat/satisfaction', { sid: sid, satisfaction: s } );
		
	}
	
});