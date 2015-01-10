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
		
  		// Get the messages list
  		this.listenTo(this.model, 'change:messages', this.status);
  		this.listenTo(this.model, 'change:operator', this.close);
  		this.listenTo(this.model, 'change:closed', this.remove);
  		this.listenTo(this.model, 'change:banned', this.remove);
  		this.listenTo(this.model, 'change:name', this.render);
  		this.listenTo(this.model, 'unactive', this.unactive);
  		this.listenTo(this.model, 'active', this.active);
  		this.listenTo(this.model, 'urgent', this.urgent);
  		
      // After an half hour of inactivity, the model is removed on the server
      this.listenTo(this.model, 'remove', this.close);
    },
    
  	render: function () {
  
  		this.$el.html(this.template(this.model.toJSON()));
  		this.$el.appendTo('.list-current');
  		
  		this.timers();
  		this.status();
  
  		this.model.trigger('render');
  
  		return this;
  	},
	   
  	status: function () {
  
  		if (!this.model.get('messages').length) {
    		return;
      }
  
  		// If the last message come from a visitor, set unanswered status
  		var from = this.model.get('messages')[this.model.get('messages').length-1].from;
  		
  		if (from == 'visitor') {
  			this.$el.find('.status').removeClass('answered').addClass('unanswered');
  		} else {
  			this.$el.find('.status').removeClass('unanswered urgent').addClass('answered');
  		}
  	},

  	timers: function() {
  		utils.interval(this, 'chat');
  		utils.interval(this, 'lastMsg');
  	},
  	
  	active: function() {		
  		this.$el.addClass('active');		
  	},
  	
  	unactive: function() {
  		this.$el.removeClass('active');			
  	},
      
    urgent: function () {  
  		this.$el.find('.status').addClass('urgent');	    
    },
      
    close: function() {
  		this.model.trigger('minus');
  		this.remove();
    },
  	
  	doChat: function() {
  	
  		var that = this;
  		var live = app.skeleton.live;

  		if ($(window).width() < 768) { 
    		$('.aside-chat-left').css({display: 'none'}); 
      }
  		
  		// If the view already exists and only a view is show, do nothing
  		if (this.$el.hasClass('active') && live.windows.length <= 1) { 
    		return; 
      }

  		// If the view already exists, show it first in the view list
  		if (this.$el.hasClass('active')) {
  			$.each(live.windows, function (index, item) {
  
  				if (item.model.id === that.model.get('id')) {
  				
  					item.remove();
  					live.windows.splice(index, 1);
  					live.windows.unshift( 
  					  new ConversationView({ model: that.model }) 
            );

  					app.trigger('change:windows');
  					return;
  				}
  				
  			});
  			return;
  		}
  		
  		if (live.windows.length < live.maxWindows) {
  
  			// Create a new conversation view
  			live.windows.unshift(
          new ConversationView({ model: this.model })
        );
  		
  		} else {
  	
  			// Delete the last conversation view
  			live.windows[live.windows.length-1].model.trigger('minus');
  			
  			// Create a new conversation view 
        live.windows.unshift( new ConversationView({ model: this.model }) );
  			
  		}
  		app.trigger('change:windows');
  	}

  });

  return RecordView;
});
