/*========================================
Records list
=========================================*/
	
chat.DashboardView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'dashboard-section',
	className: 'vbox stretch',
			
    initialize: function (records) {
    	
    	this.render();
    	
    	this.collection = records;
    	
    	this.visitors = {};
    	this.operators = {};
    	this.stats = {};
    	
    	this.listenTo(this.collection, 'add', this.update);
    	this.listenTo(this.collection, 'change', this.update);
    	
    	// Show a graph representing the load of the chat, depending on numbers of visitors & operators
	    $('.easypiechart').each(function(){
	    	var $barColor = $(this).data("barColor") || function($percent) {
	            $percent /= 100;
	            return "rgb(" + Math.round(255 * $percent) + ", " + Math.round(255 * (1-$percent)) + ", 0)";
	        },
			$trackColor = $(this).data("trackColor") || "#c8d2db",
			$scaleColor = $(this).data("scaleColor"),
			$lineWidth = $(this).data("lineWidth") || 12,
			$size = $(this).data("size") || 130,
			$animate = $(this).data("animate") || 1000;
	
			$(this).easyPieChart({
		        barColor: $barColor,
		        trackColor: $trackColor,
		        scaleColor: $scaleColor,
		        lineCap: 'butt',
		        lineWidth: $lineWidth,
		        size: $size,
		        animate: $animate,
		        onStep: function(value) {
		          this.$el.find('span').text(parseInt(value));
		        }
		    });
		    
		});
		
		this.update();
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    update: function () {  
		
		// Variable initialisation
		that = this;

		this.visitors.all = this.collection.where({ type: 'visitor', closed: false, banned: false });
		this.visitors.chatting = this.visitors.all.filter(function(model) {
			var v = model.get('operator');
			return ((typeof(v)!=='undefined') && (v!==null));
		});		
		this.operators.available = this.collection.where({ type: 'operator', available: true });	
			
		this.stats.duration = 0;
		this.stats.messages = 0;
		this.stats.chats = 0;
		this.stats.waiting = 0;
		this.stats.now = moment();
		
		// Calculs
		if (this.operators.available.length > 0 && this.visitors.chatting.length > 0) {
			
			$.each(this.visitors.chatting, function(key, visitor) {
				that.stats.messages += visitor.get('messages').length;
				that.stats.waiting += visitor.get('startChatTime') - visitor.get('startTime');
				that.stats.duration += that.stats.now.diff( moment(visitor.get('startChatTime')*1000) );			
			});
			
			// Messages per chat
			this.stats.messages = Math.round( this.stats.messages / this.visitors.chatting.length );
			
			// Waiting time for visitor before chat
			this.stats.waiting = Math.round( this.stats.waiting / this.visitors.chatting.length * 1000 );
			this.stats.waiting = moment( this.stats.waiting ).format('mm:ss');
			
			// Time spent by operators per chat
			this.stats.duration = Math.round( this.stats.duration / this.visitors.chatting.length );
			this.stats.duration = moment( this.stats.duration ).format('mm:ss');
			
			// Simultaneous chats per operator
			this.stats.chats = Math.round( this.visitors.chatting.length / this.operators.available.length *10 ) / 10;
							
		} 
		
		// Operators
		$('.operators .connected span').text( this.operators.available.length );
		$('.operators .icon-male').text( this.stats.chats );
		$('.operators .icon-time').text( this.stats.duration );
		$('.operators .icon-comments').text( this.stats.messages );
		
		// Visitors
		$('.visitors .connected span').text( this.visitors.all.length );
		$('.visitors .icon-time').text( this.stats.waiting );
		
		// Pie Chart
		this.updatePieChart();
    	
    },
    
    updatePieChart: function () {

	    this.stats.load = ( this.visitors.all.length / this.operators.available.length ) * 10;
	    
	    if (this.stats.load > 100) this.stats.load = 100;
	    if (this.operators.length == 0) this.stats.load = 0;

	    $('.easypiechart').data('easyPieChart').update( this.stats.load );
	    
    }
    
});