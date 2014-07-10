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
	        'click .view'     : 'edit',
	        
	    },
		destroy: function () {
		
			this.model.url = "/rest/" + this.model.id;
			listUser.remove(this.model); 
			this.model.destroy();
			this.remove();
			
	    },
		edit: function(e) {
	    
	   	    e.preventDefault();
	   		var id = $(e.currentTarget).data("id");	  		
	   		
		   	if (typeof(userEditView) !== 'undefined') {	
		   		if (userEditView.model.get('id') !== id) { 
		   		
		   			userEditView.remove(); 
		   			userEditView = new lily.UserEditView({model: this.model});
			   		
		   		} else {
			   		userEditView.show();
		   		}
		   		
		   	} else {
			   	userEditView = new lily.UserEditView({model: this.model});
		   	}
		   		
	   		
	        
	        this.$el.addClass('editing');
	        this.input.focus();
			
			this.$el.parent().find('.active').removeClass('active');
			this.$el.addClass('active');
	        			
		},
	});
	
	/*========================================
	  Vue EDITION UTILISATEUR
	=========================================*/
	
	lily.UserEditView = Backbone.View.extend({

		el: '#user-detail',
	    template: _.template($('#userEdit').html()),
	    initialize: function () {
	    
	        this.listenTo(this.model, 'destroy', this.remove);
	        this.render();
	               
	    },
	    events: {
	    
	        'click .button-update': 'update',
	        'click .button-cancel': 'cancel',
		
		},
		update: function () {

	        var username = $(this.$el).find('#user-editor').val();
	        
	        this.model.set({'username': username});     	           
	        this.model.save();
	        
	        this.remove();
	        $('#user-list .active').removeClass('active');

		},
		cancel: function () {

	        this.remove();
	        $('#user-list .active').removeClass('active');
     		
		},
	    render: function () {
	    	
	    	this.$el.removeClass('hide');
	        this.$el.html(this.template(this.model.toJSON()));
	        
	        return this;
	        
	    },
	    
	    show: function () {
	    	
	    	this.$el.removeClass('hide');
	    },
	    
	    remove: function () {
	    	
	    	this.$el.addClass('hide');
			this.$el.unbind();
			return this;
	   		
	    }
	
	});
	
	/*========================================
	  Liste Utilisateurs
	=========================================*/
	
	lily.ListUserView = Backbone.View.extend({
	    el: '#user-list',
	    initialize: function (listUser) {
	    	
	    	this.collection = listUser;
	    	//this.listenTo(listUser, 'add', this.add);
			this.render();
	    	
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
		   	if (typeof(userEditView) !== 'undefined')
	   			userEditView.remove();

			user = listUser.create({"lastname":"Nouvel Utilisateur"},{wait:true});	
		   	userEditView = new lily.UserEditView({model: user});

			$('#user-list .active').removeClass('active');
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
		  }})
	    }, 
	    user: function(id, transition, reverse) {
		  this.id = id;
		  if (typeof(listUserView) !== 'undefined') { listUserView.remove(); } 
		  listUser = new lily.ListUser();
		  listUser.url = "/rest/a/" + this.id;
	    },
	});
	
	// Let's rock
	var app = new AppRouter();
	Backbone.history.start();
});