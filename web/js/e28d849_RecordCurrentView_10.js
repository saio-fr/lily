chat.Views.RecordCurrent = Backbone.View.extend({
	
	tagName: 'li',
	className: 'list-record-item animated fadeInUp',
	template: _.template( $('#record').html()),
	
	events: {
		'click' : 'doChat'
	},
	
	initialize: function() {
		
		// Get the messages list
		this.listenTo(this.model, 'change:messages', this.status);
		this.listenTo(this.model, 'change:operator', this.close);
		this.listenTo(this.model, 'change:closed', this.remove);
		this.listenTo(this.model, 'change:banned', this.remove);
		this.listenTo(this.model, 'minus', this.minus);
		this.listenTo(this.model, 'urgent', this.urgent);
		this.listenTo(this.model, 'active', this.active);
		this.render();
		
	},
	
	render: function() {

		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '.list-current' );
		
		this.timers();
		this.status();

		this.model.trigger('render');

		return this;
	},
	
	status: function() {

		if (this.model.get('messages').length <= 0) return;

		// If the last message come from a visitor, set unanswered status
		if ( this.model.get('messages')[this.model.get('messages').length-1].from == 'visitor' ) {
			this.$el.find('.status').removeClass('answered').addClass('unanswered');			
		} else {
			this.$el.find('.status').removeClass('unanswered urgent').addClass('answered');
		}
		
	},
	
	timers: function() {
		
		chat.app.interval( this, 'chat' );
		chat.app.interval( this, 'lastMsg' );				
		
	},
	
	active: function() {		
		this.$el.addClass('active');		
	},
	
	minus: function() {
		this.$el.removeClass('active');			
	},
    
    urgent: function () {	  
		this.$el.find('.status').addClass('urgent');	    
    },
    
    close: function() {
		this.remove();
		chat.app.live.counter.current -=1;
		$('.header-current span').html(chat.app.live.counter.current);  
    },
	
	doChat: function() {
	
		var that = this;
		
		// If the view already exists and only a view is show, do nothing
		if ( this.$el.hasClass('active') && chat.app.windows.length <= 1 ) { return; }
		
		// If the view already exists, show it first in the view list
		if ( this.$el.hasClass('active') ) {
			$.each( chat.app.windows , function (index, value) {

				if ( value.model.id == that.model.get('id') ) {
				
					value.remove();
					chat.app.windows.splice(index,1);
					chat.app.windows.unshift( new chat.Views.Conversation({ model: that.model }) );
					chat.app.trigger('change:windows');
					return;
					
				}
			});
			return;
		}
		
		if (chat.app.windows.length < chat.app.maxWindows) {

			// Create a new conversation view
			chat.app.windows.unshift( new chat.Views.Conversation({ model: this.model }) );
			
			chat.app.trigger('change:windows');
		
		} else {
	
			// Delete the last conversation view
			chat.app.windows[chat.app.windows.length-1].model.trigger('minus');
			chat.app.windows[chat.app.windows.length-1].remove();
			chat.app.windows.pop();
			
			// Create a new conversation view 
			chat.app.windows.unshift( new chat.Views.Conversation({ model: this.model }) );
			chat.app.trigger('change:windows');
			
		}
	}
	
});