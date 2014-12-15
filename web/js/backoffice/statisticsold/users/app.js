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