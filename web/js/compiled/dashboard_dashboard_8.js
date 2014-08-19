///*Script main pour la page redirections*/
$.ajaxPrefilter(function (options) {
    options.url = root + options.url;
});
var lily = lily || {};

/*================================
Création du model Data
====================================*/

lily.Data = Backbone.Model.extend({

    initialize: function () {
        this.url = "/data";
    },	
});

/*======================================
Graph
=========================================*/

lily.UsageVue = Backbone.View.extend({
    model: lily.Data,
    el: '#graph',
    template: _.template($('#usage').html()),
    initialize: function() {
	    if (typeof this.start == 'undefined') {
        	this.start = moment().subtract('days', 30);
			this.end = moment();
		}
    	this.render();
		this.loadings();  
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    },
    events: {
        'click .loadings': 'loadings',
        'click .usage': 'usage',
        'click .redirection': 'redirection',
        'click .satisfaction': 'satisfaction',
    },
    loadings: function () {
    
    	data = new lily.Data();
	    data.url = '/usage/graph/loadings/'+this.start+'/'+this.end;
	    $(this.$el).find('#usage-graph').css({'opacity':0});
	    $(this.$el).find('.loader').animate({'opacity':1});
	    var that = this;
    	data.fetch({
	    	success: function (data) {
	    		$('#graph .active').removeClass('active');
	    		$('.loadings').addClass('active');
	    		$(that.$el).find('#usage-graph').css({'opacity':0});
	    		
				that.graph(data);
				
	    		$(that.$el).find('#usage-graph').animate({'opacity':1});
		    	$(that.$el).find('.loader').animate({'opacity':0});
	    	}
    	});	
    },
    usage: function () {
    
    	data = new lily.Data();
	    data.url = '/usage/graph/usage/'+this.start+'/'+this.end;
	    $(this.$el).find('#usage-graph').css({'opacity':0});
	    $(this.$el).find('.loader').animate({'opacity':1});
	    var that = this;
    	data.fetch({
	    	success: function (data) {
	    		$('#graph .active').removeClass('active');
	    		$('.usage').addClass('active');
	    		$(that.$el).find('#usage-graph').css({'opacity':0});
	    		
				that.graph(data);
				
	    		$(that.$el).find('#usage-graph').animate({'opacity':1});
		    	$(that.$el).find('.loader').animate({'opacity':0});
	    	}
    	});	
    },
    redirection: function () {
    
    	data = new lily.Data();
	    data.url = '/usage/graph/redirection/'+this.start+'/'+this.end;
	    $(this.$el).find('#usage-graph').css({'opacity':0});
	    $(this.$el).find('.loader').animate({'opacity':1});
	    var that = this;
    	data.fetch({
	    	success: function (data) {
	    		$('#graph .active').removeClass('active');
	    		$('.redirection').addClass('active');
	    		$(that.$el).find('#usage-graph').css({'opacity':0});
	    		
				that.graph(data);
				
	    		$(that.$el).find('#usage-graph').animate({'opacity':1});
		    	$(that.$el).find('.loader').animate({'opacity':0});
	    	}
    	});	
    },
    satisfaction: function () {
    
    	data = new lily.Data();
	    data.url = '/usage/graph/satisfaction/'+this.start+'/'+this.end;
	    $(this.$el).find('#usage-graph').css({'opacity':0});
	    $(this.$el).find('.loader').animate({'opacity':1});
	    var that = this;
    	data.fetch({
	    	success: function (data) {
	    		$('#graph .active').removeClass('active');
	    		$('.satisfaction').addClass('active');
	    		$(that.$el).find('#usage-graph').css({'opacity':0});
	    		
				that.graph(data);
				
	    		$(that.$el).find('#usage-graph').animate({'opacity':1});
		    	$(that.$el).find('.loader').animate({'opacity':0});
	    	}
    	});	
    },
    graph: function(data) {
    	
    	d1 = [];
    	var i = 0;
		while (typeof data.attributes.values[i] != 'undefined') {
			d1.push([data.attributes.values[i][0], data.attributes.values[i][1]]);
			i++;
		}
    	
		var plot = $.plot($("#usage-graph"), [{
          data: d1
		}], 
        {
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.0
                    }, {
                        opacity: 0.2
                    }]
                }
            },
            points: {
                radius: 5,
                show: true
            },
            shadowSize: 2
        },
        grid: {
            color: "#fff",
            hoverable: true,
            clickable: true,
            tickColor: "#f0f0f0",
            borderWidth: 0
        },
        colors: ["#6eaee8"],
        xaxis: {
			min: d1[d1.length - 1][0],
            max: d1[0][0],
            mode: "time",
			tickSize: [5, data.attributes.period], 
            monthNames: ["Jan", "Fe ", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"], 
            tickLength: 0      
        },
        yaxis: {
            ticks: 1,
            tickDecimals: 0,            
        },
        tooltip: true,
        tooltipOpts: {
          content: "%y.4",
          defaultTheme: false,
          shifts: {
            x: 0,
            y: 20
          }
        }
        }
        );
    
    },
});

var usage = new lily.UsageVue();	