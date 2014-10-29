var lily;
$(function(){

    function closeModelView() {
        this.model = undefined;
        this.$el.empty();
        this.stopListening();
        return this;
    }

    function closeCollectionView() {
        this.model = undefined;
        this.$el.empty();
        this.stopListening();
        return this;
    }

    $.ajaxPrefilter(function (options) {
        options.url = root + options.url;
    });
    lily = lily || {};

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
            if(this.sortCriteria==="lastname") {
                return item.get('lastname');
            } else if(this.sortCriteria==="roles") {
                // Convert roles into an integer
                // ROLE_ADMIN : += 4
                // ROLE_KNOWLEDGE_OPERATOR : += 2
                // ROLE_CHAT_OPERATOR : += 1

                var roles=item.get('roles');
                var rolesInt=0;

                if (roles.indexOf('ROLE_ADMIN')!==-1)
                    rolesInt+=4;
                if (roles.indexOf('ROLE_KNOWLEDGE_OPERATOR')!==-1)
                    rolesInt+=2;
                if (roles.indexOf('ROLE_CHAT_OPERATOR')!==-1)
                    rolesInt+=1;

                return -rolesInt; //Par défaut, ROLE_ADMIN en premier
            } else if (this.sortCriteria === "services") {
                //Tri par ordre alphabétique sur les premiers éléments, puis second, etc)
                return item.get('services').join('/');
            } else if (this.sortCriteria === "last_login") {
            	if (item.get('last_login') !== null) {
            		last_login = new Date(item.get('last_login'));
            		last_login = -last_login.getTime();
            		return last_login;
                } else return Infinity;
            } else {
                if(this.sortCriteria !== "id")
                    console.warn("Sort criteria not recognized");
                return item.get('id') || "0";
            }

            return a;
        },
    });
    
    
    /*======================================
      Modal Delete
    =========================================*/
    
    lily.ModalDelete = Backbone.View.extend({
	
		id: 'delete',
		className: 'modal fade',
		template: _.template( $('#modal-delete').html()),
		
		initialize: function() {		
			this.render();
		},
		
		render: function() {
			this.$el.html(this.template());
			this.$el.appendTo('#users');
			this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
			this.$el.modal('show');
			return this;
		}
		
	});


    /*======================================
      UserView
    =========================================*/

    lily.UserView = Backbone.View.extend({
        tagName:  "li",
        className: "list-group-item hover",
        template: _.template($('#user').html()),

        setModel:function (model) {
            if(this.model !== model) {
                this.model = model
                this.listenTo(this.model, 'select', this.select);
                this.listenTo(this.model, 'render', this.render);
                this.render();
            }
            return this;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSONWithComputedValues()));
            return this;
        },

        events: {
            'click .destroy': 'destroy',
            'click .view'   : 'edit'
        },
        
        destroy: function (e) {
        
            e.stopPropagation();
			
			new lily.ModalDelete();
			
			var that = this;
			
			$('.modal-close-confirm').click(function() {
	
				that.model.url = "/rest/" + that.model.id;
                that.model.destroy();
                that.remove();
				
			});

        },

        edit: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var id = $(e.currentTarget).parent().data("id");

            if(typeof(userEditView) === "undefined")
                userEditView = new lily.UserEditView();
            userEditView.setModel(this.model)

            this.$el.parent().find('li.active').removeClass('active');
            this.$el.addClass('active');
            return this;
        },

        close: closeModelView,
    });

    /*========================================
      User List View
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
            if($(document).find(this.$el).length == 0) {
                // parent view has been rebuild, we have to update our $el
                this.$el = $(this.__proto__.el);
                this.delegateEvents();
            }
            this.$el.empty()
            this.collection.each(this.add, this);
            return this;
        },

        add: function (user) {
            var view = new lily.UserView();
            view.setModel(user)
            this.$el.append(view.render().el);
            return this;
        },

        updateView: function() {
            this.$el.empty();
            this.render();
            return this;
        },

        close: closeCollectionView
    });

/* ============================================================================================
                                 User Management
   ========================================================================================== */

    /*========================================
      User Edit View
    =========================================*/

    lily.UserEditView = Backbone.View.extend({
        el: '#user-detail',
        template: _.template($('#userEdit').html().replace(/<\\\/script/g, '</script')),

        setModel:function (model) {
            if(this.model !== model) {
                this.model = model;
                this.listenTo(this.model, 'destroy', this.remove);
                this.render();
                this.widget = this.$el.find('#avatarWidget');
                that = this;
                
                this.widget.load(function() { 
                
                	that.widget.contents().find('input').change(function() {
                	
                		that.changeAvatar();
                	 
                	});
                
                });

            }
            return this;
        },

        events: {
            'click .button-update' : 'update',
            'click .button-cancel' : 'cancel',
            'keyup input' : 'checkIfValid',
            'submit #user-editor' : 'noSubmit'         
        },
        
        changeAvatar: function () {
	        this.widget.contents().find('#avatarWidgetForm').submit();
        },
		
        update: function (e) {
        	if (this.model.get('id') === undefined) {
	        	$('form#user-editor').jsFormValidator('validate', {recursive:true});
        	}
        	
            if($('form#user-editor')[0].jsFormValidator.isValid()) {
                var classicInputs=$('form#user-editor input:not([type="checkbox"]):not([type="password"]):not([name="avatar"]');
                for(var i=0; i<classicInputs.length; i++) {
                    this.model.set(classicInputs.eq(i).attr('name'), classicInputs.eq(i).val());
                }

                var multipleChoicesInputs=$('form#user-editor .dropdownSelect');
                for(var i=0; i<multipleChoicesInputs.length; i++) {
                    var multipleValues=[];
                    var multipleChoices=multipleChoicesInputs.eq(i).find(':checked');
                    for(var j=0; j<multipleChoices.length; j++) {
                        multipleValues.push(multipleChoices.eq(j).attr('name'));
                    }
                    this.model.set(multipleChoicesInputs.eq(i).data('name'), multipleValues);
                }

                var avatarUrl = $('iframe#avatarWidget').contents().find('input#lily_userbundle_user_avatar').val(); // au format url("url") ou url("data:@@;")
                this.model.set('avatar', avatarUrl);

                var passwordInputFirst=$('#lily_userbundle_user_plainPassword_first');
                var passwordInputSecond=$('#lily_userbundle_user_plainPassword_second');
                this.model.set('plainPassword', {'first' : passwordInputFirst.val(), 'second' : passwordInputSecond.val()});

				if (this.model.get('id') === undefined) { listUser.create(this.model,{wait:true}); }			
				else { this.model.url = "/rest/"+this.model.get('id'); this.model.save(); }
				
				this.model.trigger('render');
                
                $('#user-list .active').removeClass('active');
                this.remove(); 
               
				
            }
            return this;
        },

        cancel: function () {
            $('#user-list .active').removeClass('active');
            this.remove();
        },

        render: function () {
            if($(document).find(this.$el).length == 0) {
                // parent view has been rebuild, we have to update our $el
                this.$el = $(this.__proto__.el);
                this.delegateEvents();
            }

            userManagementAppView.editedUserId = this.model.id;

            this.$el.removeClass('hide');
            this.$el.html(this.template(this.model.toJSON()));

            $('iframe#avatarWidget').load(function () { $('.loader').hide() })
            return this;
        },

        noSubmit: function(e) {
            e.preventDefault();
            return this;
        },

        checkIfValid: function(e) {
            e.target.jsFormValidator.validate();
            return this;
        },

        remove: function () {
            userManagementAppView.editedUserId=null;
            this.$el.addClass('hide');
            this.close()
        },
        close: closeModelView
    });


    /*========================================
      APP
    =========================================*/

    lily.UserManagementApp = Backbone.Model.extend();


    /*========================================
      USER MANAGEMENT APP VIEW
    =========================================*/

    lily.UserManagementAppView = Backbone.View.extend({
        el: '#users',
        template: _.template($('#app').html()),
        editedUserId : null,

        events: {
            "click .new-user"   : "createUser",
            'click #sortMenu li': 'changeSortCriteria',
        },

        initialize: function() {
            this.listenTo(listUser, 'add', this.updateNumberOfUser);
            this.listenTo(listUser, 'remove', this.updateNumberOfUser);
        },

        setModel:function (model) {
            if(this.model !== model) {
                this.model = model;
                this.render();
            }
            return this;
        },

        render: function () {
            if($(document).find(this.$el).length == 0) {
                // parent view has been rebuild, we have to update our $el
                this.$el = $(this.__proto__.el);
                this.delegateEvents();
            }

            this.$el.removeClass('hide');
            this.$el.html(this.template(this.model.toJSON()));
            this.updateNumberOfUser();

            return this;
        },

        createUser: function(e) {
            e.preventDefault();
            if (typeof(userEditView) !== 'undefined')
                userEditView.remove();

            user = new lily.User({avatar:"http://saio.fr/images/avatar-utilisateur.png"});
            user.url = '/rest';

            if(typeof(userEditView) === "undefined")
                userEditView = new lily.UserEditView();
            userEditView.setModel(user);
            

            $('#user-list .active').removeClass('active');
            return this;
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
            return this;
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

            return this;
        },

        close: closeModelView
    });

/* ============================================================================================
                                            Router
   ========================================================================================== */

    AppRouter = Backbone.Router.extend({

        routes: {
          "" : "home",
          "*path" : "home"
        },

        initialize: function () {
            listUser = new lily.ListUser();
            listUser.url = "/rest/";
            listUserLoader = listUser.fetch();
        },

        home: function() {
            userManagementApp = new lily.UserManagementApp();
            userManagementApp.url = "/rest/maxusers";

            userManagementApp.fetch({
                success: function() {
                    listUserLoader.success(function() {
                        if(typeof(userManagementAppView) === "undefined")
                            userManagementAppView = new lily.UserManagementAppView();
                        userManagementAppView.setModel(userManagementApp)
                        listUserView = new lily.ListUserView(listUser);
                    });
                }
            });
        },
    });

    // Let's rock
    var app = new AppRouter();
    Backbone.history.start();
});