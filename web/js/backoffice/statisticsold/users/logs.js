    /*======================================
      Model Log
    =======================================*/

    lily.Log = Backbone.Model.extend({
    
	   getType: function() {
            switch (this.get('action')) {
	            case 'create':
	            	this.ts_action = 'Création';
	            	break;
				case 'update':
					this.ts_action = 'Modification';
					break;
				case 'remove':
					this.ts_action = 'Suppression';
					break;
            }
            return this.ts_action;
        },
        
        toJSONWithComputedValues: function() {
            this.data = this.toJSON();
            this.data.action = this.getType();

            return this.data;
        }
        
    });
    
    /*======================================
      Collection Logs List
    =======================================*/

    lily.LogsList = Backbone.Collection.extend({
    
        model : lily.Log,

    });
    
    /*======================================
      Log View
    =======================================*/

    lily.LogView = Backbone.View.extend({
    
        tagName:  "li",
        className: "list-group-item hover",
        template: _.template($('#user-activity-log').html()),

		initialize: function () {
			this.render();
		},

        render: function () {
            this.$el.html(this.template(this.model.toJSONWithComputedValues()));
            return this;
        }
    });

    
    /*=========================================
      Logs View
    =========================================*/
    lily.LogsView = Backbone.View.extend({
    
        el: '#logs',
        template: _.template($('#user-activity-logs-app').html()),

        events: {
            'click .sort-menu ul li': 'select',
            'hide.daterangepicker' : 'load'
        },

        initialize: function() {
        
        	if (typeof(this.start) == 'undefined') {
	        	this.start = moment().subtract('days', 6);
				this.end = moment();
			}
			
            this.criteria = 'all';
            this.selected = new lily.LogsList();
            
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
			this.$el.find('#logs-list').empty();
			if (this.selected.length == 0) {
			    this.$el.find('#logs-list').html('<li class="list-group-item"><h6>Aucune Activité.</h6></li>');
			    return this;
		    }
		    this.selected.each(this.add, this);
        },

        add: function (log) {
            this.view = new lily.LogView({model: log});
            this.$el.find('ul#logs-list').append(this.view.render().el);
            return this;
        },
        
        load: function() {
        	$('.loader').fadeIn();
        	this.collection = new lily.LogsList();
        	this.collection.url="/user/"+this.id+"/logs/"+this.start+"/"+this.end;        
            this.collection.fetch({          
                success: function() {
		            that.select();
		            $('.loader').fadeOut();
	            }          
			}); 	        
		}, 
		
		select: function(e) {
			if (e !== undefined) {
				$(e.target).parent().find('.active').removeClass('active');
				$(e.target).addClass('active');
				this.criteria = $(e.target).data('criteria');
			}
			
			switch (this.criteria) {
				case 'all':
					this.selected.reset(this.collection.toJSON());
					break;
				case 'faq':
					this.selected.reset(this.collection.where({type: 'faq'}));
					break;
				case 'question':
					this.selected.reset(this.collection.where({type: 'question'}));
					break;
				case 'redirection':
					this.selected.reset(this.collection.where({type: 'redirection'}));
					break;
				case 'chat':
					this.selected.reset(this.collection.where({type: 'chat'}));
					break;
			}
            this.render();
		}       
    });