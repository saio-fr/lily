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
    	this.listenTo(this.collection, 'add', this.change);
    	this.listenTo(this.collection, 'change:operator', this.change); 
    	this.listenTo(this.collection, 'change:closed', this.change); 
    	
    	this.load();
    	this.sparkline(false);
    	
    	this.counter = {};
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    },
    
    change: function () {      		
		
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
	    
    },
    
    sparkline: function ($re) {
	    
		// chart js
		$(".sparkline").each(function(){
			var $data = $(this).data();
			if($re && !$data.resize) return;
			if($data.type == 'bar'){
				!$data.barColor && ($data.barColor = "#3fcf7f");
				!$data.barSpacing && ($data.barSpacing = 2);
				$(this).next('.axis').find('li').css('width',$data.barWidth+'px').css('margin-right',$data.barSpacing+'px');
			};
			
			($data.type == 'pie') && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
			($data.type == 'bar') && $data.stackedBarColor && ($data.stackedBarColor = eval($data.stackedBarColor));
			
			$data.fillColor && ($data.fillColor.indexOf("#") !== -1) && isRgbaSupport() && ($data.fillColor = toRgba($data.fillColor, 0.5));

			$data.valueSpots = {'0:': $data.spotColor};
			$data.minSpotColor = false;
			$(this).sparkline( $data.data || "html", $data);

			if($(this).data("compositeData")){
				var $cdata = {};
				$cdata = $(this).data("compositeConfig");
				$cdata.composite = true;
				$cdata.valueSpots = {'0:': $cdata.spotColor};
				$cdata.fillColor && ($cdata.fillColor.indexOf("#") !== -1) && isRgbaSupport() && ($cdata.fillColor = toRgba($cdata.fillColor, 0.5));
				$(this).sparkline($(this).data("compositeData"), $cdata);
			};
			if($data.type == 'line'){
				$(this).next('.axis').addClass('axis-full');
			};
		});
	
		var sparkResize;
		var that = this;
		$(window).resize(function(e) {
			clearTimeout(sparkResize);
			sparkResize = setTimeout(function(){that.sparkline(true)}, 500);
		});
	    
    }
    
});