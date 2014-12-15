/*========================================
	  Utilisation Vue
	=========================================*/
	lily.UsageView = Backbone.View.extend({
		el: '#statistics-row',
		template: _.template($('#usage').html()),
		initialize: function() {
			this.render();
			this.graph = new lily.UsageGraphView();
			this.media = new lily.UsageMediaView();
		},
		render: function() {
			this.$el.html(this.template());
			return this;
		},
		remove: function() {
			this.$el.empty();
			this.$el.unbind();
			return this;
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
				this.start = moment().subtract('days', 6);
				this.end = moment();
			}
			this.render();
		},
		render: function() {
			this.footer = new lily.Data();
			this.footer.url = '/usage/footer/' + this.start + '/' + this.end;
			$(this.$el).find('.loader').fadeIn();
			var that = this;
			this.footer.fetch({
				success: function() {
					that.$el.html(that.template());
					that.$el.append(that.templateFooter(that.footer.toJSON()));
					// On affiche le loader
					$(that.$el).find('footer').css({
						'opacity': 0
					});
					$('#reportrange').daterangepicker({
						ranges: {
							'Cette semaine': [moment().subtract('days', 6), moment()],
							'Ce mois': [moment().subtract('days', 30), moment()],
							'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
							'Cette année': [moment().subtract('month', 12), moment()]
						},
						startDate: moment().subtract('days', 6),
						endDate: moment(),
						dateLimit: {
							months: 12
						}
					}, function(start, end) {
						$('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));
						that.start = start;
						that.end = end;
					});
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
			'hide.daterangepicker': 'range',
		},
		loadings: function() {
			// On affiche le loader
			$(this.$el).find('.loader').removeClass('hide');
			data = new lily.Data();
			data.url = '/usage/graph/loadings/' + this.start + '/' + this.end;
			$(this.$el).find('#graph-usage').css({
				'opacity': 0
			});
			$(this.$el).find('.loader').css({
				'opacity': 1
			});
			var that = this;
			data.fetch({
				success: function(data) {
					$('#graph .active').removeClass('active');
					$('.loadings').addClass('active');
					that.graph(data);
					$(that.$el).find('#graph-usage').animate({
						'opacity': 1
					});
					$(that.$el).find('footer').animate({
						'opacity': 1
					});
					$(that.$el).find('.loader').fadeOut();
				}
			});
		},
		usage: function() {
			data = new lily.Data();
			data.url = '/usage/graph/usage/' + this.start + '/' + this.end;
			$(this.$el).find('#graph-usage').css({
				'opacity': 0
			});
			$(this.$el).find('.loader').css({
				'opacity': 1
			});
			var that = this;
			data.fetch({
				success: function(data) {
					$('#graph .active').removeClass('active');
					$('.usage').addClass('active');
					$(that.$el).find('#graph-usage').css({
						'opacity': 0
					});
					that.graph(data);
					$(that.$el).find('#graph-usage').animate({
						'opacity': 1
					});
					$(that.$el).find('footer').animate({
						'opacity': 1
					});
					$(that.$el).find('.loader').fadeOut();
				}
			});
		},
		usageFooter: function(type) {
			that = this;
			this.footer.url = '/usage/footer/' + this.start + '/' + this.end;
			this.footer.fetch({
				success: function(data) {
					that.$el.find('footer').remove();
					that.$el.append(that.templateFooter(that.footer.toJSON()));
					that.$el.find('footer .' + type).addClass('active');
				}
			});
		},
		satisfaction: function() {
			data = new lily.Data();
			data.url = '/usage/graph/satisfaction/' + this.start + '/' + this.end;
			$(this.$el).find('#graph-usage').css({
				'opacity': 0
			});
			$(this.$el).find('.loader').css({
				'opacity': 1
			});
			var that = this;
			data.fetch({
				success: function(data) {
					$('#graph .active').removeClass('active');
					$('.satisfaction').addClass('active');
					$(that.$el).find('#graph-usage').css({
						'opacity': 0
					});
					that.graph(data);
					$(that.$el).find('#graph-usage').animate({
						'opacity': 1
					});
					$(that.$el).find('footer').animate({
						'opacity': 1
					});
					$(that.$el).find('.loader').fadeOut();
				}
			});
		},
		range: function() {
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
				switch (data.attributes.type) {
					case "satisfaction":
						y = parseInt(y) + "%";
						break;
					case "usage":
						y = parseInt(y) + "%";
						break;
				}
				if (data.attributes.period == 'hour') {
					var date = moment(x / 1000, 'X').format('HH');
					return y + " à " + date + " heures";
				} 
				if (data.attributes.period == 'day') {
					var date = moment(x / 1000, 'X').format('DD/MM/YYYY');
					return y + " le " + date;
				} 
				if (data.attributes.period == 'month') {
					var date = moment(x / 1000, 'X').format('MMMM');
					return y + " en " + date;
				}
			}
			
			var plotOptions = {
			
				series: {
					lines: {
						show: true,
						lineWidth: 2,
						fill: true,
						fillColor: {
							colors: [{ opacity: 0.0 }, { opacity: 0.2 }]
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
					tickColor: "#f5f5f5",
					borderWidth: 0
				},
				colors: ["#6eaee8"],
				xaxis: {
					min: d1[0][0],
					max: d1[d1.length - 1][0],
					mode: "time",
					tickSize: [data.attributes.step, data.attributes.period],
					tickLength: 0
				},
				yaxis: {
					ticks: 2,
					tickDecimals: 0,
					min: 0
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
			
			if(data.attributes.type=="usage" || data.attributes.type=="satisfaction") {
                plotOptions.yaxis.max=100;
            }

			var plot = $.plot($("#graph-usage"), [{ data: d1 }], plotOptions);		
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
		render: function() {
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
								barColors: ['#aeb6cb'],
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