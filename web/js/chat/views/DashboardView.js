/*========================================
Records list
=========================================*/
	
chat.DashboardView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'dashboard-section',
	className: 'vbox stretch hide',
			
    initialize: function (records) {
    	
    	this.render(); 
    	
    	this.collection = records;
    	this.listenTo(this.collection, 'add', this.change);
    	this.listenTo(this.collection, 'change:operator', this.change); 
    	this.listenTo(this.collection, 'change:closed', this.change); 
    	
    	this.load();
    	
    	this.counter = {};
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    change: function () {      		
		
    },
    
    remove: function () {
    	
		this.$el.empty();
		this.stopListening();
		return this;
			   		
    },
    
    load: function () {
	    
	    // Show a graph representing the load of the chat, depending on numbers of visitors & operators
	    	    
		// easypie
	    $('.easypiechart').each(function(){
	    	var $barColor = $(this).data("barColor") || function($percent) {
	            $percent /= 100;
	            return "rgb(" + Math.round(255 * (1+$percent)) + ", " + Math.round(255 * $percent) + ", 125)";
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

	    
    }
    
});