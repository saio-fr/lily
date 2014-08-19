$(function(){

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
	
	/*========================================
	  Utilisation Vue
	=========================================*/
	
	lily.UsageView = Backbone.View.extend({
	
		el: '#statistics-row',
	    template: _.template($('#usage').html()),
	    initialize: function () {
	    
	        this.render();
	               
	    },
	    render: function () {
	    	
	        this.$el.html(this.template());
	        return this;
	        
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.$el.unbind();
			return this;
	   		
	    },
	
	});
	
	/*========================================
	  Dialogue Vue
	=========================================*/
	
	lily.DialogueView = Backbone.View.extend({
	
		el: '#statistics-row',
	    template: _.template($('#dialogue').html()),
	    initialize: function () {
	    
	        this.render();
	               
	    },
	    render: function () {
	    	
	        this.$el.html(this.template());
	        return this;
	        
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.$el.unbind();
			return this;
	   		
	    },
	
	});
	
	/*======================================
	Graph Dialogue
	=========================================*/
	
	lily.DialogueGraphView = Backbone.View.extend({
	    model: lily.Data,
	    el: '#graph',
	    template: _.template($('#graph-dialogue').html()),
	    templateFooter: _.template($('#graph-dialogue-footer').html()),
	    initialize: function() {
	    	this.data = new lily.Data();
	    	this.footer = new lily.Data();
	    	if (typeof this.start == 'undefined') {
	        	this.start = moment().subtract('days', 30);
				this.end = moment();
			}
	    	this.render(); 
	    },
	    render: function () {
	        this.footer = new lily.Data();
	    	this.footer.url = '/dialogue/footer/'+this.start+'/'+this.end;
	    	$(this.$el).find('.loader').css({'opacity':'1'});
	    	var that = this;
	    	this.footer.fetch({
		    	success: function() {
		    		that.$el.html(that.template());
			    	
			    	// On affiche le loader
					$(that.$el).find('footer').css({'opacity':0});
			    	
			    	$('#reportrange').daterangepicker({
						ranges: {
					         'Cette semaine': [moment().subtract('days', 6), moment()],
					         'Ce mois': [moment().subtract('days', 30), moment()],
					         'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
					         'Cette année': [moment().subtract('month', 12), moment()]
					      },
					      startDate: moment().subtract('days', 29),
					      endDate: moment(),
					      dateLimit: { months: 36 }
					    },
					    function(start, end) {
					    
					        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
					        
					        that.start = start;
							that.end = end;
							
					    }
					);
					
					$('#reportrange span').html(that.start.format('D MMMM YYYY') + ' - ' + that.end.format('D MMMM YYYY'));
					
					that.range();
					
		    	}
	    	});
	    },
	    events: {
	        'hide #reportrange' : 'range',
	    },
	    dialogueFooter: function() {
	    	var that = this;
		    this.footer.url = '/dialogue/footer/'+this.start+'/'+this.end;
		    this.footer.fetch({
			    success: function() {
			    	that.$el.find('footer').remove();
					that.$el.append(that.templateFooter(that.footer.toJSON()));
			    }
		    });
	    },
	    range: function () {
		    // On affiche le loader
	    	$(this.$el).find('.loader').removeClass('hide');
			    		    	
	    	this.data.url = '/dialogue/graph/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-dialogue').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	
	    	this.data.fetch({
		    	success: function (data) {
		    		
					that.graph(data);
					that.dialogueFooter();
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
			    	
				}
	    	});	
	    },
	    graph: function(data) {
	    	
	    	d1 = [];
	    	var i = 0;
			while (typeof data.attributes.values.questions[i] != 'undefined') {
				d1.push([data.attributes.values.questions[i][0], data.attributes.values.questions[i][1]]);
				i++;
			}
			
			d2 = [];
	    	var i = 0;
			while (typeof data.attributes.values.answered[i] != 'undefined') {
				d2.push([data.attributes.values.answered[i][0], data.attributes.values.answered[i][1]]);
				i++;
			}
	    	
	    	function getTooltip(label, x, y) {
	    		if (data.attributes.period == 'hour') {
		    		var date = moment(x/1000, 'X').format('HH');
					return y + " à " + date + " heures"; 
	    		}
	    		if (data.attributes.period == 'day') {
		    		var date = moment(x/1000, 'X').format('DD/MM/YYYY');
					return y + " le " + date; 
				}
				if (data.attributes.period == 'month') {
					var date = moment(x/1000, 'X').format('MMMM');
					return y + " en " + date; 
				}
			}
	    	
			var plot = $.plot($("#graph-usage"), [{
	            data: d1,
	        }, {
	            data: d2,
	        }], 
	        {
	        series: {
	            lines: {
	                show: true,
	                lineWidth: 2,
	                fill: true,
	                fillColor: {
	                    colors: [{
	                        opacity: 0.1
	                    }, {
	                        opacity: 0.1
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
	        colors: ["#6eaee8", "#92d050"],
	        xaxis: {
				min: d1[d1.length - 1][0],
	            max: d1[0][0],
	            mode: "time",
				tickSize: [data.attributes.step, data.attributes.period], 
	            tickLength: 0      
	        },
	        yaxis: {
	            ticks: 2,
	            tickDecimals: 0,            
	        },
	        tooltip: true,
	        tooltipOpts: {
	          content: getTooltip,
	          defaultTheme: false,
	          shifts: {
	            x: 0,
	            y: 20
	          },
	        }
	        }
	        );
	    
	    },
	});


/*======================================
	Dialogue -> Redirection
	=========================================*/
	
	lily.RedirectionsMediaView = Backbone.View.extend({
		model: lily.Data,
	    initialize: function() {
	    	this.render(); 
	    },
	    render: function () {
	        this.redirections = new lily.Data();
	    	this.redirections.url = '/usage/redirections';
	    	var that = this;
	    	this.redirections.fetch({
		    	success: function(data) {
		    	
		    	da = [];
		    	
		    	for (var i = 0; i < 2; i++) {
			      da[i] = {
			      label: data.attributes[i].label,
			      data: data.attributes[i].data
			    }
			  }
			  
					$.plot($("#redirections"), da, {
					    series: {
					      pie: {
					        combine: {
					              color: "#999",
					              threshold: 0.05
					            },
					        show: true,
					        label: {
								show: true,
								formatter: function(label, series){
									return '<div style="font-size:8pt;text-align:center;padding:2px;color:#4c5567;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
								},    
							},
					      }
					    },    
					    colors: ["#aeb6cb", "#f3f5f9"],
					    legend: {
					      show: false
					    },
					    grid: {
					        hoverable: false,
					        clickable: false
					    },
					    tooltip: true,
					    tooltipOpts: {
					      content: "%s: %p.0%"
					    }
					 });
				 
		    	}
	    	});
	    },
	});

	
	/*======================================
	Graph Utilisation
	=========================================*/
	
	lily.UsageGraphView = Backbone.View.extend({
	    model: lily.Data,
	    el: '#graph',
	    template: _.template($('#graph-usage').html()),
	    templateFooter: _.template($('#graph-usage-footer').html()),
	    initialize: function() {
	    	if (typeof this.start == 'undefined') {
	        	this.start = moment().subtract('days', 30);
				this.end = moment();
			}
	    	this.render(); 
	    },
	    render: function () {
	        this.footer = new lily.Data();
	    	this.footer.url = '/usage/footer/'+this.start+'/'+this.end;
	    	$(this.$el).find('.loader').css({'opacity':'1'});
	    	var that = this;
	    	this.footer.fetch({
		    	success: function() {
			    	that.$el.html(that.template());
			    	that.$el.append(that.templateFooter(that.footer.toJSON()));
			    	
			    	// On affiche le loader
					$(that.$el).find('footer').css({'opacity':0});
			    	
			    	$('#reportrange').daterangepicker({
						ranges: {
					         'Cette semaine': [moment().subtract('days', 6), moment()],
					         'Ce mois': [moment().subtract('days', 30), moment()],
					         'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
					         'Cette année': [moment().subtract('month', 12), moment()]
					      },
					      startDate: moment().subtract('days', 29),
					      endDate: moment(),
					      dateLimit: { months: 36 }
					    },
					    function(start, end) {
					    
					        $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
					        
					        that.start = start;
							that.end = end;
							
					    }
					);
					
					$('#reportrange span').html(that.start.format('D MMMM YYYY') + ' - ' + that.end.format('D MMMM YYYY'));
					
			    	that.loadings();
					return this;
		    	}
	    	});
	    },
	    events: {
	        'click .loadings': 'loadings',
	        'click .usage': 'usage',
	        'click .redirection': 'redirection',
	        'click .satisfaction': 'satisfaction',
	        'hide #reportrange' : 'range',
	    },
	    loadings: function () {
	    	
			// On affiche le loader
	    	$(this.$el).find('.loader').removeClass('hide');
			    	
	    	
	    	data = new lily.Data();
	    	data.url = '/usage/graph/loadings/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.loadings').addClass('active');
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    usage: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/usage/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.usage').addClass('active');
					$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    usageFooter: function(type) {
	    	that = this;
		    this.footer.url = '/usage/footer/'+this.start+'/'+this.end;
		    this.footer.fetch({
			    success: function(data) {
			    	that.$el.find('footer').remove();
				    that.$el.append(that.templateFooter(that.footer.toJSON()));
				    that.$el.find('footer .' + type).addClass('active');
			    }
		    });
	    },
	    redirection: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/redirection/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.redirection').addClass('active');
		    		$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    satisfaction: function () {
	    
	    	data = new lily.Data();
	    	data.url = '/usage/graph/satisfaction/'+this.start+'/'+this.end;
	    	$(this.$el).find('#graph-usage').css({'opacity':0});
	    	$(this.$el).find('.loader').css({'opacity':1});
	    	var that = this;
	    	data.fetch({
		    	success: function (data) {
		    		$('#graph .active').removeClass('active');
		    		$('.satisfaction').addClass('active');
		    		$(that.$el).find('#graph-usage').css({'opacity':0});
		    		
					that.graph(data);
					
		    		$(that.$el).find('#graph-usage').animate({'opacity':1});
		    		$(that.$el).find('footer').animate({'opacity':1});
			    	$(that.$el).find('.loader').animate({'opacity':0});
		    	}
	    	});	
	    },
	    range: function () {
		    if (this.$el.find('.active').hasClass('loadings')) {
		    	this.loadings(); 
		    	this.usageFooter('loadings');
		    }
		    if (this.$el.find('.active').hasClass('redirection')) {
		    	this.redirection();
		    	this.usageFooter('redirections');
		    }
		    if (this.$el.find('.active').hasClass('usage')) {
		    	this.usage();
		    	this.usageFooter('usage');
		    }
		    if (this.$el.find('.active').hasClass('satisfaction')) {
		    	this.satisfaction();
		    	this.usageFooter('satisfaction');
		    }
	    },
	    graph: function(data) {
	    	
	    	d1 = [];
	    	var i = 0;
			while (typeof data.attributes.values[i] != 'undefined') {
				d1.push([data.attributes.values[i][0], data.attributes.values[i][1]]);
				i++;
			}
	    	
	    	function getTooltip(label, x, y) {
	    		if (data.attributes.period == 'hour') {
		    		var date = moment(x/1000, 'X').format('HH');
					return y + " à " + date + " heures"; 
	    		}
	    		if (data.attributes.period == 'day') {
		    		var date = moment(x/1000, 'X').format('DD/MM/YYYY');
					return y + " le " + date; 
				}
				if (data.attributes.period == 'month') {
					var date = moment(x/1000, 'X').format('MMMM');
					return y + " en " + date; 
				}
			}
	    	
			var plot = $.plot($("#graph-usage"), [{
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
				tickSize: [data.attributes.step, data.attributes.period], 
	            tickLength: 0      
	        },
	        yaxis: {
	            ticks: 2,
	            tickDecimals: 0,            
	        },
	        tooltip: true,
	        tooltipOpts: {
	          content: getTooltip,
	          defaultTheme: false,
	          shifts: {
	            x: 0,
	            y: 20
	          },
	        }
	        }
	        );
	    
	    },
	});
	
	/*======================================
	Utilisation -> Supports
	=========================================*/
	
	lily.UsageMediaView = Backbone.View.extend({
		model: lily.Data,
	    initialize: function() {
	    	this.render(); 
	    },
	    render: function () {
	        this.media = new lily.Data();
	    	this.media.url = '/usage/media';
	    	var that = this;
	    	this.media.fetch({
		    	success: function(data) {
		    		    		
		    		d2 = [];
			    	var i = 0;
					while (typeof data.attributes[i] != 'undefined') {
						d2.push([data.attributes[i]['x'], data.attributes[i]['y']]);
						i++;
					}
					
				    var graph = function() {
				    
					    Morris.Bar({
							  element: 'media',
							  data: d2,
							  xkey: 0,
							  ykeys: [1],
							  labels: [''],
							  barRatio: 0.4,
							  hideHover: 'auto',
							  barColors:['#aeb6cb'],
						});
					}
					graph();
					$(window).on('resize', function() { 
						$('#media').empty();
						graph();
					});
		    	}
	    	});
	    },
	});
	
	/*========================================
		  Router
		=========================================*/
		
	var AppRouter = Backbone.Router.extend({
	
		routes: {
		  "" : "usage",
		  "usage" : "usage",
		  "dialogue" : "dialogue",
		},
		
		initialize: function () {
		},
		
		usage: function() {
			
		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .usage-nav').addClass('active');
		  
		  var usage = new lily.UsageView();
		  var usage_graph = new lily.UsageGraphView();	
		  var usage_media = new lily.UsageMediaView();
		  var usage_redirections = new lily.RedirectionsMediaView();
	 
	    }, 
	    dialogue: function() {
	    
 		  $('#statistics-nav .active').removeClass('active');
		  $('#statistics-nav .dialogue-nav').addClass('active');
		  
		  var dialogue = new lily.DialogueView();
		  var dialogue_graph = new lily.DialogueGraphView();
		  
	    },   		
	});
	
	// Let's rock
	var app = new AppRouter();	
	Backbone.history.start();
	

});