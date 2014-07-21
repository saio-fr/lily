/*========================================
Records list
=========================================*/
	
chat.LiveView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'live',
	className: 'hbox stretch hide',
			
    initialize: function (records) {
    	
    	this.render(); 
    	
    	this.collection = records;
    	this.listenTo(this.collection, 'add', this.add);
    	this.listenTo(this.collection, 'change:operator', this.add); 
    	this.listenTo(this.collection, 'change:closed', this.add); 
    	
    	var informations = new chat.Views.Informations();
    	
    	this.counter = {};
		this.counter.current = 0;
		this.counter.waiting = 0;
		this.counter.pendingAnswer = 0;
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#live').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    add: function (record) {      

		if (record.get('type') == 'operator' || record.get('banned') == true || record.get('closed') == true) return;
		if (record.get('operator') == user.id) { 
			this.recordView = new chat.Views.RecordCurrent({model: record}); 
			this.recordView.render();
			chat.app.live.counter.current +=1;
			this.$el.find('.header-current span').html(chat.app.live.counter.current);
		
		}
		
		if (record.get('operator') == null) {
		console.log('2');
     		this.recordView = new chat.Views.RecordWaiting({model: record});	   	
	 		this.recordView.render();
	 		chat.app.live.counter.waiting +=1;
	 		this.$el.find('.header-waiting span').html(chat.app.live.counter.waiting);
		
		}
		
    },
    
    remove: function () {
    	
		this.$el.empty();
		this.stopListening();
		return this;
			   		
    },
});