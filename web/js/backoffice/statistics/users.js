
    /*================================
      Model User
    ====================================*/

    lily.User = Backbone.Model.extend({
        getRolesHuman: function(roles) {
            var roles=this.get('roles');
            if(typeof(roles)==="undefined")
                return "";
            var role_human="";
            if (roles.indexOf('ROLE_ADMIN')!==-1)
                role_human="Administrateur";
            else {
                if(roles.indexOf('ROLE_CHAT_OPERATOR')!==-1) {
                    role_human+="Opérateur Live chat";
                }
                if(roles.indexOf('ROLE_KNOWLEDGE_OPERATOR')!==-1) {
                    role_human+=(role_human==="") ? "Opérateur " : " et ";
                    role_human+="Base de connaissance";
                }
            }
            return role_human;
        },

        getLastLoginHuman: function() {
            var last_login=this.get('last_login');
            if(typeof(last_login)!=="undefined" && last_login!=null && last_login.toUpperCase()!='NULL') {
                var d=new Date(last_login);
                return "Dernière connexion le " + (d.getDate()<10 ? '0' : '') + d.getDate() + "/" + (d.getMonth()<9 ? '0' : '') + (d.getMonth()+1) +"/" + (d.getYear()-100);
            } else {
                return "Jamais connecté";
            }
        },

        toJSONWithComputedValues: function() {
            var data = this.toJSON();

            data.last_login_human=this.getLastLoginHuman();
            data.roles_human=this.getRolesHuman();

            return data;
        },
    });

    /*======================================
      Collection User
    =======================================*/

    lily.ListUser = Backbone.Collection.extend({
        model : lily.User,
        sortCriteria : "lastname",

        comparator: function(item) {
            return item.get('lastname');
        },
    });

    /*======================================
      UserView
    =========================================*/

    lily.UserView = Backbone.View.extend({
        tagName:  "li",
        className: "list-group-item hover",
        template: _.template($('#user').html()),

        initialize: function (options) {

        	this.listenTo(this.model, 'select', this.select);
            this.listenTo(this.model, 'render', this.render);
            this.clickable = options.clickable;
            this.render();

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSONWithComputedValues()));
            return this;
        },

        events: {
            'click .view' : 'select'
        },

        select: function(e) {
            e.preventDefault();
			
			if (this.clickable) app.navigate("activity/"+this.model.get('id')+"/chat", {trigger: true});
            return this;          
        }
        
    });

    /*========================================
      User List View
    =========================================*/

    lily.ListUserView = Backbone.View.extend({
    	el: '#statistics-row',

        initialize: function () {
            this.listenTo(this.collection, 'add', this.add);
            this.render();
        },

        render: function () {
            if($(document).find(this.$el).length == 0) {
                // parent view has been rebuild, we have to update our $el
                this.$el = $(this.__proto__.el);
                this.delegateEvents();
            }
            this.$el.empty();
            this.$el.append('<ul id="users-list" class="list-group"></ul>')
            this.collection.each(this.add, this);
            return this;
        },

        add: function (user) {
            this.view = new lily.UserView({model: user, clickable: true});
            $('#users-list').append(this.view.render().el);
            return this;
        },

        updateView: function() {
            this.$el.empty();
            this.render();
            return this;
        }
    });
    
    /* ============================================================================================
                User statistics
   ========================================================================================== */

    /*========================================
      APP VIEW
    =========================================*/

    lily.UserStatsAppView = Backbone.View.extend({

        template: _.template($('#user-activity-app').html()),

        events: {
            'click .nav.nav-tabs li' : 'activity',
            'click icon' : 'back'
        },
        
        initialize: function() {
        	
        	$('#statistics-row').html(this.render().el);
	    	
        },

        render: function () {
            this.$el.html(this.template());
            this.user = new lily.UserView({model: this.model, clickable: false});
            this.$el.find('#user-overview').html(this.user.$el);
            this.$el.find('#user-overview .view').append('<icon class="return icon-angle-left"></icon>');
            return this;
        },

        activity: function(e) {
            if($(e.currentTarget).find('a')) {
                this.tab = $(e.currentTarget).find('a').attr('href').substr(5);
                app.navigate("activity/"+this.model.get('id')+"/"+this.tab, {trigger: true});
                $('#statistics-row .nav-tabs a[href="#tab-'+this.tab+'"]').tab('show');
            }
            return this;
        },
        
        back: function () {
	        app.navigate("users", {trigger: true});
        }
        
    });


    /*=========================================
                    Data model
    =========================================*/

    lily.Data = Backbone.Model.extend();

    /*=========================================
                    Stats Graph
    =========================================*/

    lily.UserStatsGraphView = Backbone.View.extend({
    
        el: '#graph-chat',
        template: _.template($('#user-activity-graph').html()),
        templateFooter: _.template($('#user-activity-graph-footer').html()),

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
            this.footer.url = '/../users/rest/stats/footer/'+ this.model.get('id')+'/'+ this.start+'/'+this.end;
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
            this.footer.url = '/../users/rest/stats/footer/'+this.model.get('id')+'/'+this.start+'/'+this.end;
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
            data.url = '/../users/rest/stats/'+this.model.get('id')+'/graph/conversations/'+this.start+'/'+this.end;
            $(this.$el).find('#graph').animate({opacity:0});
            $('.loader').fadeIn();
            var that = this;
            data.fetch({
                success: function (data) {
                    $('#graph-chat .active').removeClass('active');
                    $('.numberOfConversation').addClass('active');

                    that.graph(data);

                    $(that.$el).find('#graph').animate({opacity:1});
                    $(that.$el).find('footer').animate({opacity:1});
                    $('.loader').fadeOut();
                }
            });
            return this;
        },

        conversationTime: function () {

            data = new lily.Data();
            data.url = '/../users/rest/stats/'+this.model.get('id')+'/graph/conversationsTime/'+this.start+'/'+this.end;
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
            data.url = '/../users/rest/stats/'+this.model.get('id')+'/graph/waited/'+this.start+'/'+this.end;
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
            data.url = '/../users/rest/stats/'+this.model.get('id')+'/graph/satisfaction/'+this.start+'/'+this.end;
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


    /*======================================
      Model Conversation
    =======================================*/

    lily.Conversation = Backbone.Model.extend({});

    /*======================================
      Conversation View
    =======================================*/

    lily.ConversationView = Backbone.View.extend({
    
        tagName:  "li",
        className: "list-group-item hover",
        template: _.template($('#user-activity-conversation').html()),

        events: {
            'click .view' : 'view'
        },

		initialize: function () {
			this.render();
		},

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        view: function(e) {
        
            e.preventDefault();
			
			if (typeof(view.activity.detailsView) !== "undefined") view.activity.detailsView.remove();
            view.activity.detailsView = new lily.ConversationDetailsView({model: this.model});

            this.$el.parent().find('li.active').removeClass('active');
            this.$el.addClass('active');
            $('#conversation-details').show();
            return this;
            
        }
    });

    /*======================================
      Collection Conversation List
    =======================================*/

    lily.ConversationsList = Backbone.Collection.extend({
    
        model : lily.Conversation,
        sortCriteria : "start",

        comparator: function(item) {
			if (this.sortCriteria=="start") return -moment(item.get('start')).unix();
            if(this.sortCriteria=="duration") return moment(item.get('start')).unix()-moment(item.get('end')).unix();
            else return item.get(this.sortCriteria);
        }

    });


    /*======================================
    Conversation Details Model
    ========================================*/

    lily.ConversationDetails=Backbone.Model.extend({});

    /*========================================
      Conversation Details View
    =========================================*/

    lily.ConversationDetailsView = Backbone.View.extend({
		className: 'vbox',
        template: _.template($('#user-activity-conversation-details').html().replace(/<\\\/script/g, '</script')),	
        
        initialize: function () {
            $(this.render().el).appendTo('#conversation-details');
        },

        render: function () {
            $('#conversation-details').removeClass('hide');
            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
        
    });

    /*=========================================
                Conversation History View
    =========================================*/
    lily.ConversationsView = Backbone.View.extend({
    
        el: '#conversations',
        template: _.template($('#user-activity-conversation-app').html()),

        events: {
            'click .sort-menu ul li': 'changeSortCriteria',
            'hide.daterangepicker' : 'load'
        },

        initialize: function() {
        
        	if (typeof(this.start) == 'undefined') {
	        	this.start = moment().subtract('days', 6);
				this.end = moment();
			}
            
			that = this;
			this.$el.html(this.template());
			
            $('#reportrange').daterangepicker({
                 ranges: {
                     "Aujourd'hui": [moment().startOf('day'), moment()],
                     "Cette semaine": [moment().subtract('days', 6), moment()],
                     "Ce mois": [moment().subtract('days', 30), moment()]
                  },
                  startDate: moment().subtract('days', 6),
                  endDate: moment(),
                  dateLimit: { months: 36 }
                },
                function(start, end) {

                    $('#reportrange span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));

                    that.start = start;
                    that.end = end;
            }); 
            
            $('#reportrange span').html(this.start.format('D MMMM YYYY') + ' - ' + this.end.format('D MMMM YYYY'));
			this.load();			 			
			    
        },

        render: function () {
			this.$el.find('#conversations-list').empty();
		    this.collection.each(this.add, this);
		    if (this.collection.length == 0) {
			    this.$el.find('#conversations-list').html('<li class="list-group-item"><h6>Aucune conversations.</h6></li>');
		    }
            return this;
        },

        add: function (conversation) {
            this.view = new lily.ConversationView({model: conversation});
            this.$el.find('ul#conversations-list').append(this.view.render().el);
            return this;
        },

        changeSortCriteria: function(e) {
            var target=$(e.target);
            if(target.data('criteria')!==undefined) {
                this.collection.sortCriteria=target.data('criteria');
                target.parent().find('.active').removeClass('active');
                target.addClass('active');
                this.collection.sort();
                this.render();
            }
            return this;
        },
        
        load: function() {
        	this.$el.find('#conversation-details').hide();
        	$('.loader').fadeIn();
        	this.collection = new lily.ConversationsList();
        	this.collection.url="/../users/rest/conversations/operator/"+this.id+"/"+this.start+"/"+this.end;        
            this.collection.fetch({          
                success: function() {
		            that.render();
		            $('.loader').fadeOut();
	            }          
			}); 	        
		}        
    });


    /*========================================
      USER MANAGEMENT APP VIEW
    =========================================*/

    lily.UsersView = Backbone.View.extend({
        
        initialize: function () {
	        this.users = new lily.ListUser();
	        this.users.url = "/../users/rest/";
	        that = this;
		    this.users.fetch({
			    success: function() {
				    that.usersView = new lily.ListUserView({collection: that.users});
					that.render();
			    }
		    }); 
        },
        
        remove: function() {
        
        	this.$el.empty();
			this.$el.unbind();
			return this;
			
		}
		
    });
