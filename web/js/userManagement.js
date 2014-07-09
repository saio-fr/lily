var lily;

$(function(){

	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});
	lily = lily || {};
		
	/*================================
	  Model Utilisateur
	====================================*/
	
	lily.User = Backbone.Model.extend({
	
	    initialize: function () {	    	
	    },
		
	});
	
	/*======================================
	  Collection Utilisateur
	=======================================*/
	
	lily.ListUser = Backbone.Collection.extend({
		
	    initialize: function () {

	    },
	    comparator: function(model) {
        	return model.get('id');
		},

	});
	
	/*======================================
	  Vue Utilisateurs
	=========================================*/
	
	lily.UserView = Backbone.View.extend({
	    tagName:  "li",
	    className: "list-group-item hover",
	    template: _.template($('#user').html()),
	    initialize: function() {
	    	this.listenTo(this.model, 'select', this.select);
			this.listenTo(this.model, 'change', this.render);
	    },
	    render: function () {
	    
	        this.$el.html(this.template(this.model.toJSON()));
	        this.input = this.$('.edit');
	        return this;
	        
	    },
	    events: {
	    
	        'click .destroy': 'destroy',
	        'click .icon-reorder' : 'navigate',
	        'dblclick' : 'navigate',	
	        'click .view'     : 'edit',
	        'blur .edit'      : 'close',
	        'keypress .edit'  : 'updateOnEnter',
	        'dropped' : 'dropped',
	        
	    },
		destroy: function () {
		
			this.model.url = "/rest/" + this.model.id;
			listUser.remove(this.model); 
			this.model.destroy();
			this.remove();
			
	    },
	    navigate: function(){

        	app.navigate("user/"+this.model.get('id'), {trigger: true});

		},
		edit: function(e) {
			
			if (typeof(contentEditView) !== 'undefined') { contentEditView.remove(); }
		
			this.$el.addClass("editing");
			this.input.focus();
			
			this.$el.parent().find('.active').removeClass('active');
			this.$el.addClass('active');
			
		},
		close: function() {
		
			var value = this.input.val();
			this.model.url = "/rest/"+this.model.id+"/position/"+this.model.get('position');
			this.model.set({title: value});
			this.model.save();
			this.$el.removeClass("editing");
			
		},
		updateOnEnter: function(e) {
		
			if (e.keyCode == 13) this.close();
			
		},
		dropped: function(event, index) {
		
			this.model.url = "/rest/"+this.model.id+"/position/"+index;
			this.model.save();
			
		}, 
		
	});
	
	/*========================================
	  Liste Utilisateurs
	=========================================*/
	
	lily.ListUserView = Backbone.View.extend({
	    el: '#user-list',
	    initialize: function (listUser) {
	    	
	    	this.collection = listUser;
	    	this.listenTo(listUser, 'add', this.add);
			this.render();
			
			$('#user-list').sortable().bind('sortupdate', function(e, ui) {
				ui.item.trigger('dropped', ui.item.index());
			});
	    	
	    },
	    render: function () {
	    
	       this.collection.each(this.add, this);
	       
	    },
	    
	    add: function (user) {      

	     	var view = new lily.UserView({model: user});
			this.$el.append(view.render().el);
			
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.stopListening();
			return this;
				   		
	    },
	});
	
	
	/*========================================
	  APP VIEW
	=========================================*/
	
	lily.UserManagementAppView = Backbone.View.extend({ 
	   
		el: $('#userManagement'),

		events: {
		  "click .new-user"   : "createUser"
		},
		
		initialize: function() {
		},
		
		createUser: function() {
		
		  user = listUser.create({"username":"Nouvel Utilisateur"},{wait:true});	
		  user.trigger('edit');

		},
	
	});

	/*========================================
	  Router
	=========================================*/
	
	var AppRouter = Backbone.Router.extend({
	
		routes: {
		  "" : "home",
		  "user/:id" : "user",
		},
		
		initialize: function () {
		  new lily.UserManagementAppView;      
		},
		
		home: function() {
		  if (typeof(listUserView) !== 'undefined') { listUserView.remove(); }
		  listUser = new lily.ListUser();
		  listUser.url = "/rest/";
		  listUser.fetch({
			  success: function() {
			  listUserView = new lily.ListUserView(listUser);		  
		  })
	    }, 
	    user: function(id, transition, reverse) {
		  this.id = id;
		  if (typeof(listUserView) !== 'undefined') { listUserView.remove(); } 
		  listUser = new lily.listUser();
		  listUser.url = "/rest/" + this.id;
	    },   		
	});
	
	// Let's rock
	var app = new AppRouter();
	Backbone.history.start();

});