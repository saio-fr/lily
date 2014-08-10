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
    	
    	this.views = {};
    	this.counter = {};
    	
    	this.listenTo(this.collection, 'change', this.change); 
    	
    	this.change();
    	this.load();
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    change: function () {      		

		if (typeof(this.views.connected) !== 'undefined') this.views.connected.remove();
    	this.views.connected = new chat.DashboardConnectedView(this.collection);
    	
    },
    
    load: function () {
	    
	    // Show a graph representing the load of the chat, depending on numbers of visitors & operators
	    	    
		// easypie
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
	    
    }
    
});