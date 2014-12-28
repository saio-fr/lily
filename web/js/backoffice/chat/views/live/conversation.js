/*========================================
      LIVE CONVERSATION VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),
      g = require('globals'),
      Collections = require('backoffice/chat/data/collections'),
      InformationsView = require('backoffice/chat/views/live/informations'),
      MessagesView = require('backoffice/chat/views/live/messages'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      ModalView = require('components/modals/confirmView'),
      ModalModel = require('components/modals/model'),
      ModalTransferView = require('backoffice/chat/views/live/transfer/modal'),

      // Object wrapper returned as a module
      ConversationView;

  ConversationView = Backbone.View.extend({

	  tagName: 'section',
    className: 'vbox animated fadeInRight',
  	template: _.template($('#liveConversationTpl').html()),

  	events: {
  		'click' : 'selected',
  		'click .conversation-close': 'close',
  		'click .conversation-minus': 'minus',
  		'click .ban' : 'ban',
  		'click .transfer' : 'transfer',
  		'click .conversation-form button.send' : 'send',
  		'click .conversation-form .icon-trash' : 'clearInput',
  		'focusout input[name=name]': 'changeName',
  		'keypress input[name=name]': 'changeNameOnEnter'
  	},	

    initialize: function () {
		
  		var that = this;
	
  		// Render the view	
  		$(this.render().el).prependTo('.conversations');
  		  		
  		// Create a collection of this view messages
      this.messages = new Collections.Messages();
  		
  		// Listen to new messages					
  		this.listenTo(this.model, 'change:messages', this.getMessages);
  		this.listenTo(this.messages, 'add', this.addMsg);
  		this.listenTo(this.messages, 'add', this.status);
  		this.listenTo(this.model, 'urgent', this.urgent);
  		this.listenTo(this.model, 'render', this.active);
  		this.listenTo(this.model, 'minus', this.minus);
  		this.listenTo(this.model, 'change:writing', this.writing);

  		// If the visitor is writing, show it
      this.$writing = this.$el.find('.alert-writing');	  		
  		this.$input = this.$el.find('textarea');

  		// Create a child view container
      this.childViews = new Backbone.ChildViewContainer();
  		// Create the informations view and select the window
  		this.selected();
  		// Add Active class to record view
  		this.active();
  		// Get the messages
  		this.getMessages();
  		// Is the user writting?
  		this.writing();

  		this.editor = new wysihtml5.Editor(that.$el.find('textarea').get(0), {
  		  toolbar: that.$el.find('.toolbar').get(0),
        parserRules:    wysihtml5ParserRules,
        useLineBreaks:  true
  		});
  		
  		this.$editor = this.$el.find('.wysihtml5-sandbox').contents().find('body');
  		
  		this.$editor.on('click',function() {
        that.selected();
  		});
  		
  		// If the operator type enter, send the message
  		this.$editor.on('keydown',function(e) {
  			that.sendOnEnter(e);
  		});
    },
    
  	render: function () {
    	
      this.$el.html(this.template(this.model.toJSON()));
      $('input, textarea').placeholder();
		
      return this;
  	},
  	
  	selected: function (e) {
  	
  		$('.conversations').removeClass('selected');
  		this.$el.addClass('selected');
  		
  		var live = app.skeleton.live;

  		if (typeof(live.informations) == 'undefined') {
  			live.informations = new InformationsView({model: this.model});
  			return;
  		}
  		
  		if (live.informations.model.get('id') !== this.model.get('id')) {
  		
  			live.informations.remove(); 
  			live.informations = new InformationsView({model: this.model});
  			app.trigger('change:windows');
  		}
  	},
    	
  	getMessages: function() {
  		this.messages.set(this.model.get('messages'));						
  	},
  	
  	sendOnEnter: function(e) {  		
  		if (e.keyCode == 13 && !e.shiftKey) { 
    		this.send();
      }  		
  	},

  	send: function () {
  
  		this.message = this.editor.getValue(true);
  
  		if ($.trim(this.message).length) {  			
  			app.ws.publish('visitor/' + g.licence + '/' + this.model.id, this.message);
  		}
  		// clear the search field
  		this.clearInput();
  	},
  	
  	addMsg: function(msg) {	
  	
  		// create an instance of the sub-view to render the single message item.
  		switch (msg.get('from')) {
  			case 'operator':
  				var view = new MessagesView.Operator({
  					model: msg
  				}).render( this.$el.find('.conversation-section-list') );
  				this.$el.find('.status').removeClass('text-urgent');				
  				break;
  			case 'visitor':	
  				var view = new MessagesView.Visitor({
  					model: msg
  				}).render( this.$el.find('.conversation-section-list') );
  				break;
  			case 'server':	
  				var view = new MessagesView.Server({
  					model: msg
  				}).render( this.$el.find('.conversation-section-list') );
  				break;
  		}
  		
  		this.childViews.add(view);
  		
  		// Scroll to bottom of chat
  		this.$el.find('.conversation-section').scrollTop(10000);
  	},

    clearInput: function(e) {
		  this.editor.clear();
	  },
	  
    minus: function(e) {
  
  		if (typeof(e) !== 'undefined') { 
    		e.stopPropagation();
      }
  		
  		if ($(window).width() < 768) { 
    		$('.aside-chat-left').css({display: 'block'});
      } else {
        $('.aside-chat-left').css({display: 'table-cell'});
      }
  		
      var that = this;
      var live = app.skeleton.live;
  		
  		this.model.trigger('unactive');
  		
  		live.windows.splice($.inArray(that, live.windows), 1);
  	 
	  	if (live.informations.model.get('id') == this.model.get('id')) {

	  		live.informations.remove();
	  		live.informations = undefined;

	  		if (live.windows.length == 1) {

	  			live.informations = new Informations({
  	  			model: live.windows[live.windows.length-1].model
  	  	  }); 
	  		}
	  	}
	  	app.trigger('change:windows');
  		this.remove();
    },
    
  	close: function() {
  		
  		var that = this;
  		
  		var modalModel = new ModalModel();
  		modalModel.set(g.modalConfirm.chatClose);
      var modalView = new ModalView({
        model: modalModel,
        appendEl: ".js-live-container"
      });
  		
  		$('.modal-close .js-modal-action').click(function() {
  			app.ws.call('chat/close', { sid: that.model.get('id') } );			
  			that.minus();
  		});
  	},
  	
  	ban: function() {

  		var that = this;
  		
  		var modalModel = new ModalModel();
  		modalModel.set(g.modalConfirm.chatBan);
      var modalView = new ModalView({
        model: modalModel,
        appendEl: ".js-live-container"
      });
  		
  		$('.modal-ban .js-modal-action').click(function() {
  			app.ws.call('chat/ban', { sid: that.model.get('id') } );
  			that.minus();
  		});
  	},
  	
  	transfer: function() {
  		var operators = app.users.filter(function (model) {
  			return model.get('type') == 'operator' && 
  			  model.get('available') && 
  			  model.get('id') != g.userId;
  		});		

  		var modalModel = new ModalModel();
  		modalModel.set(g.modalApp.chatTransfer);
  		
  		var modalTransfer = new ModalTransferView({
    		model: modalModel,
    		appendEl: ".js-live-container",
    		collection: operators, 
    		visitor: this.model
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
  		if (this.messages.at(this.messages.length-1).get('from') == 'visitor') {
  			this.$el.find('.status').removeClass('text-answered').addClass('text-unanswered');			
  		} else {
  			this.$el.find('.status').removeClass('text-unanswered').addClass('text-answered');
  		}
  	    
    },
      
    writing: function () { 

      if (this.model.get('writing')) { 
        this.$writing.removeClass('fadeOut').addClass('fadeIn');
        this.$writing.show(); 
      } 
      else { 
        this.$writing.removeClass('fadeIn').addClass('fadeOut'); 
  	  }  
    },
    
  	changeNameOnEnter: function(e) {  		
  		if (e.keyCode == 13 && !e.shiftKey) {
    		this.$el.find('input[name=name]').blur();
    		this.$el.find('input[name=name]').focusout();
      }  		
  	},
      
    changeName: function(e) {
  		var name = this.$el.find('input[name="name"]').val();
  		app.ws.call('chat/changeName', {sid: this.model.get('id'), name: name});
  	},
  	
  	remove: function () {
    	
    	this.$editor.unbind('click');
    	this.$editor.unbind('keydown');
    	
      var self = this;
      this.childViews.forEach(function (view){
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
      
    	this.$el.remove();
      this.stopListening();
  	}

  });

  return ConversationView;
});
