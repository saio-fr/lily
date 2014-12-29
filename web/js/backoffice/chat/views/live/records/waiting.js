/*========================================
      RECORD CURRENT VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      g = require('globals'),
      utils = require('backoffice/chat/utils/timers'),
      ConversationView = require('backoffice/chat/views/live/conversation'),

      // Object wrapper returned as a module
      RecordView;

  RecordView = Backbone.View.extend({

  	tagName: 'li',
  	className: 'list-record-item animated fadeInUp',
  	template: _.template($('#liveRecordTpl').html()),

  	events: {
  		'click' : 'doChat'
  	},

    initialize: function () {
  
      this.render();
      
		  this.listenTo(this.model, 'change:operator', this.update); 
    	this.listenTo(this.model, 'change:closed', this.update);
      this.listenTo(this.model, 'change:messages', this.status);
      this.listenTo(this.model, 'change:name', this.render);
      // The visitor has been waiting over 2 minutes without reply
      this.listenTo(this.model, 'urgent', this.urgent);
      // After an half hour of inactivity, the model is removed on the server
      this.listenTo(this.model, 'remove', this.remove);
    },
    
  	render: function () {
  
  		this.$el.html(this.template(this.model.toJSON()));
  		this.$el.appendTo('.list-waiting');
  		
  		this.timers();
  		this.status();
  
  		this.model.trigger('render');
  
  		return this;
  	},
	   
  	status: function () {
  				
  		if (!this.model.get('messages').length) { 
    		return;
      }
      
      var from = this.model.get('messages')[this.model.get('messages').length-1].from;
  		// If the last message come from a visitor, set unanswered status
  		if (from == 'visitor') {
  			this.$el.find('.status').removeClass('answered').addClass('unanswered');			
  		} else {
  			this.$el.find('.status').removeClass('unanswered').addClass('answered');
  		}
  	},

  	timers: function() {
  		utils.interval(this, 'chat');
  		utils.interval(this, 'lastMsg');
  	},
    
    urgent: function () {
		  this.$el.find('.status').addClass('urgent');   
    },
	
  	doChat: function() {
  		
  		var that = this;
  		var live = app.skeleton.live;
  		
  		if ($(window).width() < 768) { 
    		$('.aside-chat-left').css({display: 'none'});
      }
  		
  		app.ws.call('operator/set_operator', { sid: this.model.get('id') } ).then(function (result) {
     
  		   if (live.windows.length < live.maxWindows) {
  		   
  				// Create a new conversation view
  				live.windows.unshift( new ConversationView({ model: that.model }) );				
  				app.trigger('change:windows');
  			} else {
  		
  				// Delete the last conversation view
  				live.windows[live.windows.length-1].model.trigger('minus');
  				
  				// Create a new conversation view 
  				live.windows.unshift( ConversationView({ model: that.model }) );
  				app.trigger('change:windows');
  			}
  			
  		   // Delete this view
  		   that.remove();
  		   		   
  		}, function(error) {
  		   
  		});		
  	},
  	
  	update: function() {
  		if (this.model.get('operator')) {
    		this.remove();
      }
  		if (this.model.get('closed')) {
    		this.remove();
      }
  	}
  	
  });

  return RecordView;
});
