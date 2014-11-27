	var lily = lily || {};

	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});

    /*================================
      Model User
    ====================================*/

    lily.User = Backbone.Model.extend({
	    url: '/user'
    });

    /*========================================
      User Edit View
    =========================================*/

    lily.UserEditView = Backbone.View.extend({
        el: '.aside-profil',
        template: _.template($('#user-edit').html().replace(/<\\\/script/g, '</script')),

        initialize: function () {
			that = this;
			this.model = new lily.User();
			this.model.fetch({
				success: function() {
					that.render();
					that.widget = that.$el.find('#avatarWidget');
            
					that.widget.load(function() {             
						that.widget.contents().find('input').change(function() {            	
							that.changeAvatar();           	           
						});
					});
				}
			});

        },

        events: {
            'click .button-update' : 'update',
            'click .button-cancel' : 'cancel',
            'keyup input' : 'checkIfValid',
            'blur input' : 'checkIfValid'
        },
        
        changeAvatar: function () {
	        this.widget.contents().find('#avatarWidgetForm').submit();
        },
		
        update: function (e) {        	
            if($('form input')[0].jsFormValidator.isValid()) {
            
                var classicInputs=$('form input:not([type="checkbox"]):not([type="password"]):not([name="avatar"]');
                
                for(var i=0; i<classicInputs.length; i++) {
                    this.model.set(classicInputs.eq(i).attr('name'), classicInputs.eq(i).val());
                }

                this.avatar = $('iframe#avatarWidget').contents().find('input#lily_userbundle_user_avatar').val();                 				this.model.set('avatar', this.avatar);

                this.pw1=$('#lily_userbundle_user_plainPassword_first').val();
                this.pw2=$('#lily_userbundle_user_plainPassword_second').val();
                this.model.set('plainPassword', {'first' : this.pw1, 'second' : this.pw2});

				this.model.save();               				
            }
        },

        cancel: function () {

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            $('iframe#avatarWidget').load(function () { $('.loader').hide() })
        },

        checkIfValid: function(e) {
            e.target.jsFormValidator.validate();
        }

    });
    
    /* ============================================================================================
                                            Router
   ========================================================================================== */

    lily.AppRouter = Backbone.Router.extend({

        routes: {
          "" : "home"
        },

        initialize: function () {
			this.edit = new lily.UserEditView();
        },

        home: function() {
            
        },
    });
    
    // Let's rock
    var app = new lily.AppRouter();