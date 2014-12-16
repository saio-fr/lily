//var lily = lily || {};

/***********************
PAGE MAIL VIEW
***********************/

lily.Views.ChatWelcomeScreen = lily.Extensions.View.extend({
	
	events: {
	
        'click button': 'chat',

    },
    
	//		el: '#lily-wrapper-page',
	model: lily.Models.Mail,
	template: _.template( $('#lily-page-chat-welcome-screen').html() ),
	
	initialize: function() {
		this.errors = {};
		this.errors.firstname = false;
		this.errors.lastname = false;
		this.errors.email = false;
		$(this.render().el).appendTo('#lily-wrapper-page');
	},
	
	render: function () {
		this.$el.html(this.template( ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	chat: function () {

		this.firstname = this.$el.find('input#firstname').val() || null;
		this.lastname = this.$el.find('input#lastname').val() || null;
		this.email = this.$el.find('input#email').val() || null;

		if (!config.chatContactFormAvoidable) {
			if (config.chatContactFirstNameField) {
				if (this.firstname == null) {
					this.$el.find('label.firstname').show();
					this.$el.find('input#firstname').addClass('warning');
					this.errors.firstname = true;
				} else {
					this.$el.find('input#firstname').removeClass('warning');
					this.$el.find('label.firstname').hide();
					this.errors.firstname = false;
				}
			}
			if (config.chatContactLastNameField) {
				if (this.lastname == null) {
					this.$el.find('label.lastname').show();
					this.$el.find('input#lastname').addClass('warning');
					this.errors.lastname = true;
				} else {
					this.$el.find('input#lastname').removeClass('warning');
					this.$el.find('label.lastname').hide();
					this.errors.lastname = false;
				}
			}
			if (config.chatContactEmailField) {
				if (this.email == null) {
					this.$el.find('label.email').show();
					this.$el.find('input#email').addClass('warning');
					this.errors.email = true;
				} else {
					this.$el.find('input#email').removeClass('warning');
					this.$el.find('label.email').hide();
					this.errors.email = false;
				}
			}
		}

		that = this;
		if (this.errors.firstname || this.errors.lastname || this.errors.email) return;

		lily.chatContactForm = false;
		lily.ws.call('chat/contactForm', {'firstname': that.firstname, 'lastname': that.lastname, 'email': that.email});
		lily.instance.router.navigate('chat', {trigger: true});

		
	}
	
});