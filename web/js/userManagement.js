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

        	app.navigate("category/"+this.model.get('id'), {trigger: true});

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
	
	/*======================================
	  View CONTENT
	=========================================*/
	/*
	lily.ContentView = Backbone.View.extend({
	
	    tagName:  "li",
	    className: "list-group-item faq-content hover",
	    template: _.template($('#content').html()),
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
	    
	        'click .destroy' : 'destroy',
	        'click .view' : 'select',
	        'blur .edit'      : 'close',
	        'keypress .edit'  : 'updateOnEnter',
	        'dropped' : 'dropped',
	        
	    },
	    select: function(e){
	    
	   	    e.preventDefault();
	   		var id = $(e.currentTarget).data("id");	  		
	   		
		   	if (typeof(contentEditView) !== 'undefined') {	
		   		if (contentEditView.model.get('id') !== id) { 
		   		
		   			contentEditView.remove(); 
		   			contentEditView = new lily.ContentEditView({model: this.model});
			   		
		   		} else {
			   		contentEditView.show();
		   		}
		   		
		   	} else {
			   	contentEditView = new lily.ContentEditView({model: this.model});
		   	}
		   		
	   		
	        
	        this.$el.addClass('editing');
	        this.input.focus();
			
			this.$el.parent().find('.active').removeClass('active');
			this.$el.addClass('active');
	        			
		},
		destroy: function (e) {
		
			this.model.url = "/rest/" + this.model.id;
			listFaq.remove(this.model); 
			this.remove();
			this.model.destroy();
			
	    },
	    close: function() {
	    
			var value = this.input.val();
			this.model.url = "/rest/"+this.model.id+"/position/"+this.model.get('position');
			this.model.save({title: value});
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
	  Vue CONTENT EDIT
	=========================================*/
	/*
	lily.ContentEditView = Backbone.View.extend({

		el: '#faq-detail',
	    template: _.template($('#contentEdit').html()),
	    initialize: function () {
	    
	        this.listenTo(this.model, 'destroy', this.remove);
	        this.render();
	               
	    },
	    events: {
	    
	        'click .button-update': 'update',
	        'click .button-cancel': 'cancel',
		
		},
		update: function () {
        
	        var content = $(this.$el).find('#faq-editor').val();
	        
	        this.model.set({'content': content});     	           
	        this.model.save();
	        
	        this.remove();
	        $('#faq-list .active').removeClass('active');


		},
		cancel: function () {

	        this.remove();
	        $('#faq-list .active').removeClass('active');
     		
		},
	    render: function () {
	    	
	    	this.$el.removeClass('hide');
	        this.$el.html(this.template(this.model.toJSON()));

	        $('#faq-editor').wysihtml5({
				"font-styles": false, 
				"emphasis": true, 
				"lists": false,
				"html": false,
				"link": true, 
				"image": false,
				"color": false 
			});	

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

	     	var view = new lily.CategoryView({model: user});
			this.$el.append(view.render().el);
			
	    },
	    remove: function () {
	    	
			this.$el.empty();
			this.stopListening();
			return this;
				   		
	    },
	});
	
	/*======================================
	  Collection BREADCRUMBs
	=======================================*/
	/*
	lily.Breadcrumbs = Backbone.Collection.extend({
		
	    initialize: function () {

	    },

	});
	
	
	/*======================================
	  Vue BREADCRUMB
	=========================================*/
	/*
	lily.BreadcrumbView = Backbone.View.extend({
	    tagName:  "li",
	    template: _.template($('#breadcrumbView').html()),
	    initialize: function() {
	    	this.render();
	    },
	    render: function () {
	    
	        this.$el.html(this.template(this.model.toJSON()));
	        return this;
	        
	    },
	    events: {
		    'click' : 'navigate',
	    },
	    navigate: function () {	
			app.navigate(this.model.get('link'), {trigger: true});	
	    }
	    
	});
	
	/*========================================
	  Liste BREADCRUMBs
	=========================================*/
	/*
	lily.ListBreadcrumbsView = Backbone.View.extend({
	    el: '.breadcrumb',
	    initialize: function (breadcrumbs) {
	    	
	    	this.collection = breadcrumbs;
			this.render();			
	    	
	    },
	    render: function () {	    
	       this.collection.each(this.add, this);
	       $('.breadcrumb li:last-child').addClass('active');	       
	    },
	    
	    add: function (breadcrumb) {    
	    	var view = new lily.BreadcrumbView({model: breadcrumb});	      	
			this.$el.prepend(view.render().el);			
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
	   
		el: $('#user'),

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
		  "category/:id" : "category",
		},
		
		initialize: function () {
		  new lily.UserManagementAppView;      
		},
		
		home: function() {
		  
		  if (typeof(listUserView) !== 'undefined') { listUserView.remove(); }
		 /* if (typeof(listBreadcrumbsView) !== 'undefined') { listBreadcrumbsView.remove(); }
		  breadcrumbs = new lily.Breadcrumbs();
		  breadcrumbs.url = "/breadcrumbs/null";*/
		  listUser = new lily.ListUser();
		  listUser.url = "/rest/null";
		/*  breadcrumbs.fetch({
			  success: function() {
			  	  listBreadcrumbsView = new lily.ListBreadcrumbsView(breadcrumbs);	
				  listUser.fetch({
					  success: function() {
					  listUserView = new lily.listUserView(listUser);		  
					  }
				  }); 				  
			  }
		  }); 	 */
	    }, 
	    category: function(id, transition, reverse) {
		  this.id = id;
		  if (typeof(listUserView) !== 'undefined') { listUserView.remove(); } 
		//  if (typeof(listBreadcrumbsView) !== 'undefined') { listBreadcrumbsView.remove(); } 
		  listUser = new lily.listUser();
		//  breadcrumbs = new lily.Breadcrumbs();
		  listUser.url = "/rest/" + this.id;
		/*  breadcrumbs.url = "/breadcrumbs/" + this.id;
		  breadcrumbs.fetch({
			  success: function() {
			  	  listBreadcrumbsView = new lily.ListBreadcrumbsView(breadcrumbs);	
				  listUser.fetch({
					  success: function() {
					  listUserView = new lily.listUserView(listUser);		  
					  }
				  }); 				  
			  }
		  }); 	*/	    
	    },   		
	});
	
	// Let's rock
	var app = new AppRouter();
	Backbone.history.start();

});