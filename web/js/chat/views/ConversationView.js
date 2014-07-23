/***********************
CONVERSATION VIEW
***********************/
chat.Views.Conversation = Backbone.View.extend({
	
	tagName: 'section',
	className: 'vbox animated fadeInRight',
	
	events: {
		'click .conversation-close': 'close',
		'click .conversation-minus': 'minus',
		'click .ban' : 'ban',
		'click .conversation-form button.send' : 'send',
		'click .conversation-form .icon-trash' : 'clearInput'
	},	
	
	initialize: function() {
		
		var that = this;
		
		// Create a collection of this view messages
		this.messages = new chat.Messages();
		
		// Listen to new messages					
		this.listenTo(this.model, 'change:messages', this.getMessages);
		this.listenTo(this.messages, 'add', this.addItem);
		this.listenTo(this.messages, 'add', this.status);
		this.listenTo(this.model, 'urgent', this.urgent);
		this.listenTo(this.model, 'change:banned', this.remove);
		this.listenTo(this.model, 'change:closed', this.remove);
		this.listenTo(this.model, 'change:writing', this.writing);
		this.listenTo(this.model, 'render', this.active);
		
		// Add Active class to record view
		this.active();
		
		// Render the view	
		$(this.render().el).prependTo('.conversations');
		
		this.$input = this.$el.find('textarea');
		
		this.editor = new wysihtml5.Editor( that.$el.find('textarea').get(0) , { // id of textarea element
			toolbar: that.$el.find('.toolbar').get(0) , // id of toolbar element
			parserRules:    wysihtml5ParserRules,
			useLineBreaks:  true
		});
		
		// If the operator type enter, send the message
		this.$el.find('.wysihtml5-sandbox').contents().find('body').on("keydown",function(e) {
			that.sendOnEnter(e);
		});
		
		// Get the messages
		this.getMessages();
		
		// If the visitor is writing, show it
	    this.$writing = this.$el.find('.alert-writing');	
				
	},
	
	render: function () {
		
		var template= _.template( $('#conversation').html());
		this.$el.html(template( this.model.toJSON() ));

		$('input, textarea').placeholder();
		
		return Backbone.View.prototype.render.apply(this, arguments);
	},
	
	getMessages: function() {
	
		this.messages.set(this.model.get('messages'));
								
	},
	
	sendOnEnter: function(e) {
		
		if (e.keyCode == 13 && !e.shiftKey) { this.send(); }
		
	},
	
	send: function () {

		this.message = this.editor.getValue();

		if ( $.trim(this.message).length > 0 ){ /*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			sess.publish('visitor/'+this.model.id, this.message);
			
		}
		// clear the search field
		this.clearInput();

	},
	
	addItem: function( message ) {
	
		// Display date
		var index = this.messages.indexOf(message);
		var messageAbove = this.messages.at(index-1);
		
		var date = new moment(message.date);

		if (index >= 1) {
		
			var dateAbove = new moment(messageAbove.date);

			if (date.month() !== dateAbove.month() || date.day() !== dateAbove.day()) {
			
				$('<p class="conversation-date">Conversation du ' + date.format('DD MMMM YYYY') + '</p>').appendTo( this.$el.find('.conversation-section-list') );
				
			}
			
		} else {
			$('<p class="conversation-date">Conversation du ' + date.format('DD MMMM YYYY') + '</p>').appendTo( this.$el.find('.conversation-section-list') );
		}
		
		// create an instance of the sub-view to render the single message item.
		switch ( message.get('from') ) {
			case 'operator':
				new chat.Views.MessageOperator({
					model: message
				}).render( this.$el.find('.conversation-section-list') );
				this.$el.find('.status').removeClass('text-urgent');				
				break;
			case 'visitor':	
				new chat.Views.MessageVisitor({
					model: message
				}).render( this.$el.find('.conversation-section-list') );
				break;
		}	
		
		// Scroll to bottom of chat
		this.$el.find( '.conversation-section' ).scrollTop(10000);	
		
	},
	
	clearInput: function() {
		
		this.editor.clear();
		
	},
	
	minus: function() {
	
		that = this;

		this.$el.addClass('fadeOutDown');
		
		// Delay remove to show animation
		setTimeout(function() {
			that.remove();
		}, 200)
		
		this.model.trigger('minus');
		
		// search this view in chat.app.windows
		chat.app.windows.splice( $.inArray(this, chat.app.windows), 1 );
		chat.app.trigger('change:windows');
		
	},
	
	close: function() {
	
		new chat.Views.ModalClose();
		that = this;
		
		$('.modal-close-confirm').click(function() {
		
			chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
			chat.app.trigger('change:windows');
			sess.call('chat/close', { sid: that.model.get('id') } );

			// Change counter currents
			chat.app.live.counter.current -=1;
			$('.header-current span').html(chat.app.live.counter.current);
			
		});
		
	},
	
	ban: function() {
	
		new chat.Views.ModalBan();
		that = this;
		
		$('.modal-ban-confirm').click(function() {
	
			chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
			chat.app.trigger('change:windows');
			sess.call('chat/ban', { sid: that.model.get('id') } );
			
			// Change counter currents
			chat.app.live.counter.current -=1;
			$('.header-current span').html(chat.app.live.counter.current);	
		
		});
			
	},
	
	urgent: function () {	  
		this.$el.find('.status').addClass('text-urgent');	    
    },
    
    active: function() {
	    this.model.trigger('active');
    },    
    
    status: function () {
	    
	    // Test if status is unanswered
		if ( this.messages.at(this.messages.length-1).get('from') == 'visitor' ) {
			this.$el.find('.status').removeClass('text-answered').addClass('text-unanswered');			
		} else {
			this.$el.find('.status').removeClass('text-unanswered').addClass('text-answered');
		}
	    
    },
    
    writing: function () { 
	    
	    if ( this.model.get('writing') ) { 
	    	this.$writing.removeClass('fadeOut').addClass('fadeIn');
	    	this.$writing.show(); 
	    } 
	    else { 
	    	this.$writing.removeClass('fadeIn').addClass('fadeOut'); 
	    }
	    
    }
	
});