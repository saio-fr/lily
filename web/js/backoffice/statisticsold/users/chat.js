
    /*=========================================
                    Data model
    =========================================*/

    lily.Data = Backbone.Model.extend();

    /*=========================================
                    Stats Graph
    =========================================*/

    lily.UserStatsGraphView = Backbone.View.extend({
    
        el: '#graph-chat',
        template: _.template($('#user-activity-chat-graph').html()),
        templateFooter: _.template($('#user-activity-chat-graph-footer').html()),

        events: {
            'click .numberOfConversation': 'numberOfConversation',
            'click .conversationTime': 'conversationTime',
            'click .waited': 'waited',
            'click .satisfaction': 'satisfaction',
            'hide.daterangepicker' : 'range',
        },

        initialize: function() {
        
            if (typeof this.start == 'undefined') {
                this.start = moment().subtract('days', 6);
                this.end = moment().endOf('day');
            }
            
            this.render();
            
        },

        render: function () {
        
            if($(document).find(this.$el).length == 0) {
                // parent view has been rebuild, we have to update our $el
                this.$el = $(this.__proto__.el);
                this.delegateEvents();
            }
            this.footer = new lily.Data();
            this.footer.url = '/user/'+ this.model.get('id')+'/graph/footer/'+ this.start+'/'+this.end;
            that = this;
            this.footer.fetch({
                success: function() {
                    that.$el.html(that.template());
                    that.$el.append(that.templateFooter(that.footer.toJSON()));

                    $(that.$el).find('footer').css({opacity:0});

                    $('#reportrange').daterangepicker({
                        ranges: {
                             'Cette semaine': [moment().subtract('days', 6), moment()],
                             'Ce mois': [moment().subtract('days', 30), moment()],
                             'Ce semestre': [moment().subtract('month', 4).startOf('month'), moment()],
                             'Cette année': [moment().subtract('month', 12), moment()]
                          },
                          startDate: moment().subtract('days', 6),
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

                    that.numberOfConversation();
                }
            });
            return this;
        },

        statsFooter: function(type) {
            that = this;
            this.footer.url = '/user/'+this.model.get('id')+'/graph/footer/'+this.start+'/'+this.end;
            this.footer.fetch({
                success: function(data) {
                    that.$el.find('footer').remove();
                    that.$el.append(that.templateFooter(that.footer.toJSON()));
                    that.$el.find('footer .' + type).addClass('active');
                }
            });
            return this;
        },

        numberOfConversation: function () {

            // show the loader
            $('.loader').removeClass('hide');

            data = new lily.Data();
            data.url = '/user/'+this.model.get('id')+'/graph/conversations/'+this.start+'/'+this.end;
            $(this.$el).find('#graph').animate({opacity:0});
            $('.loader').fadeIn();
            var that = this;
            data.fetch({
                success: function (data) {
                    $('#graph-chat .active').removeClass('active');
                    $('.numberOfConversation').addClass('active');

                    that.graph(data);
                    console.log(data);

                    $(that.$el).find('#graph').animate({opacity:1});
                    $(that.$el).find('footer').animate({opacity:1});
                    $('.loader').fadeOut();
                }
            });
            return this;
        },

        conversationTime: function () {

            data = new lily.Data();
            data.url = '/user/'+this.model.get('id')+'/graph/conversationsTime/'+this.start+'/'+this.end;
            $(this.$el).find('#graph').animate({opacity:0});
            $('.loader').fadeIn();
            var that = this;
            data.fetch({
                success: function (data) {
                    $('#graph-chat .active').removeClass('active');
                    $('.conversationTime').addClass('active');
                    $(that.$el).find('#graph').animate({opacity:0});

                    that.graph(data);

                    $(that.$el).find('#graph').animate({opacity:1});
                    $(that.$el).find('footer').animate({opacity:1});
                    $('.loader').fadeOut();
                }
            });
            return this;
        },

        waited: function () {

            data = new lily.Data();
            data.url = '/user/'+this.model.get('id')+'/graph/waited/'+this.start+'/'+this.end;
            $(this.$el).find('#graph').animate({opacity:0});
            $('.loader').fadeIn();
            var that = this;
            data.fetch({
                success: function (data) {
                    $('#graph-chat .active').removeClass('active');
                    $('.waited').addClass('active');
                    $(that.$el).find('#graph').animate({opacity:0});

                    that.graph(data);

                    $(that.$el).find('#graph').animate({opacity:1});
                    $(that.$el).find('footer').animate({opacity:1});
                    $('.loader').fadeOut();
                }
            });
            return this;
        },

        satisfaction: function () {

            data = new lily.Data();
            data.url = '/user/'+this.model.get('id')+'/graph/satisfaction/'+this.start+'/'+this.end;
            $(this.$el).find('#graph').animate({opacity:0});
            $('.loader').fadeIn();
            var that = this;
            data.fetch({
                success: function (data) {
                    $('#graph-chat .active').removeClass('active');
                    $('.satisfaction').addClass('active');
                    $(that.$el).find('#graph').animate({opacity:0});

                    that.graph(data);

                    $(that.$el).find('#graph').animate({opacity:1});
                    $(that.$el).find('footer').animate({opacity:1});
                    $('.loader').fadeOut();
                }
            });
            
            return this;
        },

        range: function () {
        
            if (this.$el.find('.active').hasClass('numberOfConversation')) {
                this.numberOfConversation();
                this.statsFooter('numberOfConversation');
            }
            if (this.$el.find('.active').hasClass('conversationTime')) {
                this.conversationTime();
                this.statsFooter('conversationTime');
            }
            if (this.$el.find('.active').hasClass('waited')) {
                this.waited();
                this.statsFooter('waited');
            }
            if (this.$el.find('.active').hasClass('satisfaction')) {
                this.satisfaction();
                this.statsFooter('satisfaction');
            }
            return this;
            
        },

        graph: function(data) {
            d1 = [];
            var i = 0;
            while (typeof data.attributes.values[i] != 'undefined') {
                d1.push([data.attributes.values[i][0], data.attributes.values[i][1]]);
                i++;
            }

            function getTooltip(label, x, y) {
                var value;
                switch(data.attributes.type) {
                    case "conversations":
                        value=parseFloat(y).toFixed(2)
                    break;
                    case "conversationsTime":
                        value=parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
                    break;
                    case "waited":
                        value=parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
                    break;
                    case "satisfaction":
                        value=parseInt(y*100) +"%";
                    break;
                    default:
                        console.warn('Data type not recognized in getTooltip : ' + type);
                    break;
                }

                if (data.attributes.period == 'hour') {
                    var date = moment(x/1000, 'X').format('HH');
                    return value + " à " + date + " heures";
                }
                if (data.attributes.period == 'day') {
                    var date = moment(x/1000, 'X').format('DD/MM/YYYY');
                    return value + " le " + date;
                }
                if (data.attributes.period == 'month') {
                    var date = moment(x/1000, 'X').format('MMMM');
                    return value + " en " + date;
                }
            }
            function yAxisTickFormatter(y, axis) {
                var value;
                switch(data.attributes.type) {
                    case "conversations":
                        value=parseFloat(y)
                    break;
                    case "conversationsTime":
                        value=parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
                    break;
                    case "waited":
                        value=parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
                    break;
                    case "satisfaction":
                        value=parseInt(y*100) +"%";
                    break;
                    default:
                        console.warn('Data type not recognized in yAxisTickFormatter : ' + type);
                }
                return value;
            }
            var plotOptions={
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
                    tickColor: "#fafafa",
                    borderWidth: 0
                },
                colors: ["#6eaee8"],
                xaxis: {
                    min: d1[d1.length - 1][0],
                    max: d1[0][0],
                    mode: "time",
                    tickSize: [data.attributes.step, data.attributes.period],
                    tickLength: 0,
                    monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
                    dayNames: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
                },
                yaxis: {
                    min: 0,
                    ticks: 2,
                    tickDecimals: 0,
                    tickFormatter:yAxisTickFormatter,
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
            };

            if(data.attributes.type=="satisfaction") {
                plotOptions.yaxis.max=1;
                plotOptions.yaxis.tickSize=0.5;
            }


            if(data.attributes.type=="hourly") {
                plotOptions.xaxis.timeformat="%H:%M";
            }
            else {
                plotOptions.xaxis.timeformat="%d %b";
            }

            var plot = $.plot(
                $("#graph"),
                [{ data: d1 }],
                plotOptions
            );
            return this;
        }

    });
