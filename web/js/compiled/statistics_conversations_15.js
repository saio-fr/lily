
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
        	this.collection.url="/user/"+this.id+"/conversations/"+this.start+"/"+this.end;        
            this.collection.fetch({          
                success: function() {
		            that.render();
		            $('.loader').fadeOut();
	            }          
			}); 	        
		}        
    });
    
