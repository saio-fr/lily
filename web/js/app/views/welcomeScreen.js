/* ===========================
    	Chat welcome screen
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Models = require('app/data/models'),
    PageView = require('app/views/page'),
    config = require('app/globals'),
    app = require('app/app'),
    // Object wrapper returned as a module
    ChatWelcomeScreen;

ChatWelcomeScreen = PageView.extend({

	events: {
    'click button': 'chat',
  },

	model: Models.Mail,
	template: _.template($('#lily-page-chat-welcome-screen').html()),

	initialize: function() {

		this.errors = {};
		this.errors.firstname = false;
		this.errors.lastname = false;
		this.errors.email = false;
		$(this.render().el).appendTo('#lily-wrapper-page');
	},

	render: function () {

		this.$el.html(this.template( ));
		return PageView.prototype.render.apply(this, arguments);
	},

	chat: function () {

		var $labeFirst 	= this.$el.find('label.firstname'),
				$inputFirst = this.$el.find('input#firstname'),
				$labeLast 	= this.$el.find('label.lastname'),
				$inputLast 	= this.$el.find('input#lastname'),
				$labeMail 	= this.$el.find('label.email'),
				$inputMail 	= this.$el.find('input#email'),

				firstname = $inputFirst.val() || null,
				lastName = $inputLast.val() || null,
				email = $inputMail.val() || null;

		if (!config.chatContactFormAvoidable) {
			if (config.chatContactFirstNameField) {
				if (firstname === null) {
					$labeFirst.show();
					$inputFirst .addClass('warning');
					this.errors.firstname = true;
				} else {
					$inputFirst .removeClass('warning');
					$labeFirst.hide();
					this.errors.firstname = false;
				}
			}
			if (config.chatContactLastNameField) {
				if (lastName === null) {
					$labeLast.show();
					$inputLast.addClass('warning');
					this.errors.lastname = true;
				} else {
					$inputLast.removeClass('warning');
					$labeLast.hide();
					this.errors.lastname = false;
				}
			}
			if (config.chatContactEmailField) {
				if (email === null) {
					$labeMail.show();
					$inputMail.addClass('warning');
					this.errors.email = true;
				} else {
					$inputMail.removeClass('warning');
					$labeMail.hide();
					this.errors.email = false;
				}
			}
		}

		var that = this;
		if (this.errors.firstname || this.errors.lastname || this.errors.email) {
			return;
		}

		app.chatContactForm = false;
		app.ws.call('chat/contactForm', {
			'firstname': that.firstname,
			'lastname': that.lastname,
			'email': that.email
		});

		app.router.navigate('chat', {trigger: true});
	}

});

return ChatWelcomeScreen;
});