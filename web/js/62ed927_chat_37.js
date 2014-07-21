/***********************
PAGE CHAT VIEW
***********************/

lily.Views.Chat = lily.Extensions.View.extend({
	
	
	events: {
		'submit #lily-search-form': 'doChat',
		'click #lily-go': 'doChat'
	},	
	
	initialize: function() {
		chat = this;

		this.messages = new lily.Messages();
		this.listenTo(this.messages, 'add', this.addItem);
		
		sess = new ab.connect(
		
			'ws://dev2.saio.fr:8080/chat/'+licence // The host 
					    
		    , function(session) {  // Once the connection has been established
		    	
				// Get the session id
				var sid = document.cookie.match('PHPSESSID=([^;]*)')[1];

				sess = session;
				sess.subscribe('visitor/'+sid, function (topic, payload) {

					chat.messages.set(payload);
					
				});
			
			}

		    , function(code, reason, detail) { // When the connection is closed
		    	console.warn('WebSocket connection closed');
		    }
		    , { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
				'skipSubprotocolCheck': true,
				'maxRetries': 60,
				'retryDelay': 2000
		      }
		);
		
		$(this.render().el).appendTo('#lily-wrapper-page');
		
	},
	
	render: function () {
		
		var template= _.template( $('#lily-page-chat-template').html());
		this.$el.html(template());
		this.trigger('render');
		$('input, textarea').placeholder();
		
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	doChat: function (e) {

		e.preventDefault();
		
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');
		var message = this.$input.val();
		
		if ( $.trim(message).length > 0 ){/*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			this.send( message );
			
		}
		// clear the search field
		this.clearInput();
	},
	
	send: function ( m ) {		

		sess.publish('operator', m);
		
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
	
    avatar: function() {
    	
    	// On charge l'avatar de l'opérateur
		/*
    	home = this;
		$.getScript( root+licence+'/avatar', function( data ) {});
		*/
		
		return this;
		
    }
	
});