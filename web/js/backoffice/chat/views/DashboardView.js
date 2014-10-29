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

		this.visitors = this.collection.where({ type: 'visitor', closed: false, banned: false });
		this.visitors.chatting = this.visitors.filter(function(model) {
			var v = model.get('operator');
			return ((typeof(v)!=='undefined') && (v!==null));
		});		
		
		this.operators = this.collection.where({ type: 'operator' });
		this.available = this.collection.where({ type: 'operator', available: true });	
			
		this.stats.duration = 0;
		this.stats.messages = 0;
		this.stats.chats = 0;
		this.stats.waiting = 0;
		this.stats.pages = 0;
		this.stats.satisfaction = 100;
		this.stats.satisfactions = 0;
		this.stats.satisfied = 0;
		this.stats.now = moment();
		
		// Calculs
		if (this.available.length > 0 && this.visitors.length > 0) {
			
			$.each(this.visitors, function(key, visitor) {
				
				v = visitor.get('operator');
				if (typeof(v) !== 'undefined' && v!==null) {
													
					that.stats.messages += visitor.get('messages').length;
					that.stats.waiting += visitor.get('startChatTime') - visitor.get('startTime');
					that.stats.duration += that.stats.now.diff(moment(visitor.get('startChatTime')*1000));
					if (visitor.get('satisfaction') !== null) that.stats.satisfactions += 1;
					if (visitor.get('satisfaction')) that.stats.satisfied += 1;
					
				}
				
				$.each(visitor.get('pages'), function(key, page) {
					that.stats.pages += 1;
				});
				
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
			this.stats.chats = Math.round( this.visitors.chatting.length / this.available.length *10 ) / 10;
			
			// Pages seen by visitors
			this.stats.pages = Math.round( this.stats.pages / this.visitors.length );
			
			// Visitors' satisfaction
			if (this.stats.satisfactions !== 0) this.stats.satisfaction = Math.round( 100 * (this.stats.satisfied / this.stats.satisfactions) );
			else this.stats.satisfaction = 100;
							
		} 
		
		// Operators
		$('.operators .connected span').text( this.available.length );
		$('.operators .icon-male').text( this.stats.chats );
		$('.operators .icon-time').text( this.stats.duration );
		$('.operators .icon-comments').text( this.stats.messages );
		
		// Visitors
		$('.visitors .connected span').text( this.visitors.length );
		$('.visitors .icon-time').text( this.stats.waiting );
		$('.visitors .icon-eye-open').text( this.stats.pages );
		$('.visitors .icon-thumbs-up').text( this.stats.satisfaction + '%' );

		// List of connected operators
		if (typeof(this.connected) !== 'undefined') this.connected.remove();
		this.connected = new chat.DashboardListConnectedView({collection: this.operators});
		
		// Pie Chart
		this.updatePieChart();
    	
    },
    
    updatePieChart: function () {

	    this.stats.load = ( this.visitors.length / this.available.length ) * 5;
	    
	    if (this.stats.load > 100) this.stats.load = 100;
	    if (this.operators.length == 0) this.stats.load = 0;

	    $('.easypiechart').data('easyPieChart').update( this.stats.load );
	    
    }
    
});