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
	

		url : "/rest/",

	    initialize: function () {  	
	    	console.log('initialize', this)
	    },	

	});
	
	/*======================================
	  Collection Utilisateur
	=======================================*/
	
	lily.ListUser = Backbone.Collection.extend({
		sortCriteria : "lastname",
	    initialize: function () {

	    },
	    comparator: function(item) {
	    	if(this.sortCriteria==="lastname") {
		  		return item.get('lastname');
	    	} else if(this.sortCriteria==="roles") {
	    		// Convertit les permissions en un entier
	    		// ROLE_ADMIN : += 4
	    		// ROLE_KNOWLEDGE_OPERATOR : += 2
	    		// ROLE_CHAT_OPERATOR : += 1

		  		var roles=item.get('roles');
		  		var rolesInt=0;

		  		if(roles.indexOf('ROLE_ADMIN')!==-1)
		  			rolesInt+=4;
		  		if(roles.indexOf('ROLE_KNOWLEDGE_OPERATOR')!==-1)
		  			rolesInt+=2;
		  		if(roles.indexOf('ROLE_CHAT_OPERATOR')!==-1)
		  			rolesInt+=1;
		  		
		  		return -rolesInt; //Par défaut, ROLE_ADMIN en premier
	    	} else if(this.sortCriteria==="services") {
	    		//Tri par ordre alphabétique sur les premiers éléments, puis second, etc)
		  		return item.get('services').join('/');
	    	} else if(this.sortCriteria==="last_login") {
		  		return item.get('last_login') || "0";
	    	} else {
	    		if(this.sortCriteria!=="id")
	    			console.warn("Critère de tri non reconnu");
		  		return item.get('id') || "0";
		  	}

        	return a;
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
	        return this;
	        
	    },
	    events: {
	    
	        'click .destroy': 'destroy',
	        'click .edit'   : 'edit',
	        'click .view'	: 'view'
	        
	    },
		destroy: function (e) {
	   	    e.stopPropagation();
			bootbox.setDefaults({locale:"fr"});

			(function(userView) {
				bootbox.dialog({
                    title: "Attention !",
					message: "Vous allez supprimer un utilisateur, cette action est irréversible.<br /><br />Souhaitez vous continuer ?",
					buttons: {
						confirm: {
							label:"Supprimer l'utilisateur",
							className:"btn-delete",
							callback : function() {
								/*
								userView.model.url = "/rest/" + userView.model.id;
								listUser.remove(userView.model); 
								userView.model.destroy();
								userView.remove();*/
							}
						},
						cancel: {
							label:"Annuler",
							className:"btn-cancel"
						}
					}

				});
			}) (this);
	    },
		edit: function(e) {
	    
	   	    e.preventDefault();
	   	    e.stopPropagation();
	   		var id = $(e.currentTarget).parent().data("id");	  		
	   		
	   		
		   	if (typeof(userEditView) !== 'undefined') {	
		   		if (userManagementAppView.editedUserId !== id) {
		   		
		   			userEditView.remove();
		   			userEditView = new lily.UserEditView({model: this.model});
			   		
		   		} else {
		   			userEditView.show();
		   		}
		   		
		   	} else {
			   	userEditView = new lily.UserEditView({model: this.model});
		   	}

			this.$el.parent().find('.active').removeClass('active');
			this.$el.addClass('active');
	        			
		},
		view: function(e) {
			e.preventDefault();
			var userViewId = $(e.currentTarget).data("id");
        	app.navigate("stats/"+userViewId, {trigger: true});
//	    #stats/10
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
			this.listenTo(listUser, "sort", this.updateView);
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
	    updateView: function() {
			this.$el.empty();
			this.render();
			return this;
	    },
	});

/* ============================================================================================
	                             Partie gestion des utilisateurs
   ========================================================================================== */
	
	/*========================================
	  Vue EDITION UTILISATEUR
	=========================================*/
	
	lily.UserEditView = Backbone.View.extend({

		el: '#user-detail',
	    template: _.template($('#userEdit').html().replace(/<\\\/script/g, '</script')),
	    initialize: function () {

	        this.listenTo(this.model, 'destroy', this.remove);
	        this.render();

	    },
	    events: {

	        'click .button-update': 'update',
	        'click .button-cancel': 'cancel',
	    	'change input': 'checkIfValid',
	        'submit #user-editor': 'noSubmit',
		
		},
		update: function () {
			$('form#user-editor').jsFormValidator('validate', {recursive:true});
			if($('form#user-editor')[0].jsFormValidator.isValid()) {
				var classicInputs=$('form#user-editor input:not([type="checkbox"]):not([type="password"]):not([name="avatar"]');
				var l = classicInputs.length;
				for(var i=0; i<l; i++) {
			       	this.model.set(classicInputs.eq(i).attr('name'), classicInputs.eq(i).val());   
				}

				var multipleChoicesInputs=$('form#user-editor .dropdownSelect');
				var l1 = multipleChoicesInputs.length;
				for(var i=0; i<l1; i++) {
					var multipleValues=[];
					var multipleChoices=multipleChoicesInputs.eq(i).find(':checked');
					var l2=multipleChoices.length;
					for(var j=0; j<l2; j++) {
						multipleValues.push(multipleChoices.eq(j).attr('name'));
					}
					this.model.set(multipleChoicesInputs.eq(i).data('name'), multipleValues);
				}

				var avatarUrl=$('iframe#avatarWidget').contents().find('input#lily_userbundle_user_avatar').val(); // au format url("url") ou url("data:@@;")
				this.model.set('avatar', avatarUrl);

				var passwordInputFirst=$('#lily_userbundle_user_plainPassword_first');
				var passwordInputSecond=$('#lily_userbundle_user_plainPassword_second');
				this.model.set('plainPassword', {'first' : passwordInputFirst.val(), 'second' : passwordInputSecond.val()});

		        this.model.save();

				listUser.add(this.model);
		        this.remove();
		        $('#user-list .active').removeClass('active');
		    }

		},
		cancel: function () {

	        this.remove();
	        $('#user-list .active').removeClass('active');
     		
		},
	    render: function () {
	    	
	    	userManagementAppView.editedUserId = this.model.id;

	    	this.$el.removeClass('hide');
	        this.$el.html(this.template(this.model.toJSON()));

	        //Gestion du widget de prévisualisation d'avatar
		    $("#changeAvatarInput").change(function(){
		        if (this.files && this.files[0]) {
		            var reader = new FileReader();
		            
		            reader.onload = function (e) {
		                $('#avatarContainer').css('background-image', "url('" + e.target.result + "')");
		            }
		            
		            reader.readAsDataURL(this.files[0]);
		        }
		    });

	        return this;

	    },
	    
	    show: function () {
	    	
	    	this.$el.removeClass('hide');
	    },
	    
	    remove: function () {

	    	this.$el.addClass('hide');
			this.$el.unbind();
			userManagementAppView.editedUserId=null;
			return this;
	   		
	    },

	    noSubmit: function(e) {
	    	e.preventDefault();
	    },

	    checkIfValid: function(e) {
	    	e.target.jsFormValidator.validate();
	    }
	});
	
	
	/*========================================
	  APP
	=========================================*/
	
	lily.UserManagementApp = Backbone.Model.extend({ 
	   
		url : "/rest/",	  

		initialize: function() {
		},
	});


	/*========================================
	  APP VIEW
	=========================================*/
	
	lily.UserManagementAppView = Backbone.View.extend({ 
	   
		el: $('#users'),
	    template: _.template($('#userManagementAppViewTpl').html()),
		editedUserId : null,

		events: {
			"click .new-user"   : "createUser",
			'click #sortMenu li': 'changeSortCriteria',
		},
		
		initialize: function(userManagementApp) {
	    	this.model=userManagementApp;
	    	this.listenTo(listUser, 'add', this.updateNumberOfUser);
	    	this.listenTo(listUser, 'remove', this.updateNumberOfUser);
		},
		
	    render: function () {

	    	this.$el.removeClass('hide');
	        this.$el.html(this.template(this.model.toJSON()));

	        return this;

	    },
		createUser: function(e) {
			e.preventDefault();
		   	if (typeof(userEditView) !== 'undefined')
	   			userEditView.remove();

			user = new lily.User({avatar:"http://erwan.saio.fr/images/avatar-utilisateur.png"});
		   	userEditView = new lily.UserEditView({model: user});

			$('#user-list .active').removeClass('active');
		},
	    changeSortCriteria: function(e) {
	    	var target=$(e.target);
	    	if(target.data('criteria')!==undefined) {
	    		listUser.sortCriteria=target.data('criteria');
	    		target.parent().find('.active').removeClass('active');
	    		target.addClass('active');
	    		listUser.sort()
	    		listUserView.updateView();
	    	}
	    },
	    updateNumberOfUser: function() {
	    	var maxUsers=this.model.get('maxusers');

			if(listUser.length>=maxUsers) {
				$('#userListCounter').addClass('limitReached');
				$('#userMaxReachedAlert').show();
				$('#addUserButton').hide();
			} else {
				$('#userListCounter').removeClass('limitReached');
				$('#userMaxReachedAlert').hide();
				$('#addUserButton').show();
			}

			$('#userListCounter').text(listUser.length
										+ ((listUser.length<=1) ? " compte" : " comptes")
										+ " sur "
										+ maxUsers
										+ ((maxUsers<=1) ? " disponible" : " disponibles"));
		}
	});

/* ============================================================================================
	            Partie visualisation des statistiques utilisateurs
   ========================================================================================== */

/*========================================
	  APP
	=========================================*/
	
	lily.UserStatsApp = Backbone.Model.extend({ 
	   
		url : "/rest/stats/",	  

		initialize: function() {
		},
	});


	/*========================================
	  APP VIEW
	=========================================*/
	
	lily.UserStatsAppView = Backbone.View.extend({ 
	   
		el: $('#users'),
	    template: _.template($('#userStatsAppViewTpl').html()),
		userViewId : null,

		events: {
		},
		
		initialize: function(userStatsApp) {
	    	this.model=userStatsApp;
		},
		
	    render: function () {

	    	this.$el.removeClass('hide');
	        this.$el.html(this.template(this.model.toJSON()));
			initChart(this.model.toJSON().graphData);
	        return this;
	    },
	});

/* ============================================================================================
	                                        Router
   ========================================================================================== */
	
	var AppRouter = Backbone.Router.extend({
	
		routes: {
		  "" : "home",
		  "stats/:id" : "viewUserStats",
		  ".*" : "home"
		},
		
		initialize: function () {
			listUser = new lily.ListUser();
			listUser.url = "/rest/";
			listUserLoader = listUser.fetch();
		},
		
		home: function() {
			listUserLoader.success(function() {
				listUserView = new lily.ListUserView(listUser);
			});
			userManagementApp = new lily.UserManagementApp();
			userManagementApp.url = "/rest/maxusers";

			userManagementApp.fetch({
				success: function() {
					userManagementAppView = new lily.UserManagementAppView(userManagementApp);
					userManagementAppView.render();
				}
			})

			if (typeof(listUserView) !== 'undefined') { listUserView.remove(); }
	    },

	    viewUserStats: function(id, transition, reverse) {
			this.id = id;

			userStatsApp = new lily.UserStatsApp(id);
			userStatsApp.url = "/rest/stats/" + this.id;
			userStatsApp.fetch({
				success: function() {
					listUserLoader.success(function() {
						console.log(listUser);
						userStatsAppView = new lily.UserStatsAppView(userStatsApp);
						userStatsAppView.render();
					})
				}
			})
	    },
	});
	
	// Let's rock
	var app = new AppRouter();
	Backbone.history.start();
});