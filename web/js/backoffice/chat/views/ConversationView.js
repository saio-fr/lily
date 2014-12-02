/***********************
CONVERSATION VIEW
***********************/
chat.Views.Conversation = Backbone.View.extend({
	
	tagName: 'section',
	className: 'vbox animated fadeInRight',
	
	events: {
		'click' : 'selected',
		'click .conversation-close': 'close',
		'click .conversation-minus': 'minus',
		'click .ban' : 'ban',
		'click .transfer' : 'transfer',
		'click .conversation-form button.send' : 'send',
		'click .conversation-form .icon-trash' : 'clearInput',
		'focusout input[name=name]': 'changeName'
	},	
	
	initialize: function() {
		
		var that = this;
		
		// Create a collection of this view messages
		this.messages = new chat.Messages();
		
		// Create the informations view and select the window
		this.selected();
		
		// Listen to new messages					
		this.listenTo(this.model, 'change:messages', this.getMessages);
		this.listenTo(this.messages, 'add', this.addItem);
		this.listenTo(this.messages, 'add', this.status);
		this.listenTo(this.model, 'urgent', this.urgent);
		this.listenTo(this.model, 'render', this.active);
		this.listenTo(this.model, 'minus', this.minus);
		this.listenTo(this.model, 'change:writing', this.writing);
		
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
		
		this.$el.find('.wysihtml5-sandbox').contents().find('body').on('click',function() {
        	that.selected();
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
	
	selected: function (e) {
	
		$('.conversations .selected').removeClass('selected');
		this.$el.addClass('selected');

		if (typeof(chat.app.live.informations) == 'undefined') {
			chat.app.live.informations = new chat.Views.Informations({model: this.model});
			return;
		}
		
		if (chat.app.live.informations.model.get('id') !== this.model.get('id')) {
		
			chat.app.live.informations.remove(); 
			chat.app.live.informations = new chat.Views.Informations({model: this.model});
			chat.app.setInformationsWidth();
			
		}
		
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
			
			sess.publish('visitor/'+licence+'/'+this.model.id, this.message);
			
		}
		// clear the search field
		this.clearInput();

	},
	
	addItem: function(message) {	
	
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
			case 'server':	
				new chat.Views.MessageServer({
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
		    
    minus: function(e) {

		if (typeof(e) !== 'undefined') e.stopPropagation();
		
		if ($(window).width() < 768) $('.aside-chat-left').css({display: 'block'});
		else $('.aside-chat-left').css({display: 'table-cell'});
		
	  	var that = this;
		
		this.model.trigger('unactive');
		
		chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
	  	chat.app.trigger('change:windows');
	  	
	  	if (chat.app.live.informations.model.get('id') == this.model.get('id')) {
	  		chat.app.live.informations.remove();
	  		if (chat.app.windows.length == 1) {
	  			chat.app.live.informations = new chat.Views.Informations({model: chat.app.windows[chat.app.windows.length-1].model}); 
	  		}
	  	}

		this.remove();
		  
    },
	
	close: function() {
		
		var that = this;
		
		new chat.Views.ModalClose();
		
		$('.modal-close-confirm').click(function() {

			sess.call('chat/close', { sid: that.model.get('id') } );			
			that.minus();
			
		});
		
	},
	
	ban: function() {
	
		var that = this;
		
		new chat.Views.ModalBan();
		
		$('.modal-ban-confirm').click(function() {
	
			chat.app.windows.splice( $.inArray(that, chat.app.windows), 1 );
			chat.app.trigger('change:windows');
			sess.call('chat/ban', { sid: that.model.get('id') } );

			that.minus();
		
		});
			
	},
	
	transfer: function() {

		this.connected = chat.app.records.filter(function(model) {
			return ((model.get('type') == 'operator') && (model.get('available')) && (model.get('id') != user.id));
		});		
		
		if (typeof(chat.app.modalTransfer) !== 'undefined') chat.app.modalTransfer.remove();
		chat.app.modalTransfer = new chat.Views.ModalTransfer({collection: this.connected, visitor: this.model});
		
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
	    
    },
    
    changeName: function(e) {
		
		this.name = this.$el.find('input[name="name"]').val();
		
		sess.call('chat/changeName', {sid: this.model.get('id'), name: this.name});
		
	}
	
});