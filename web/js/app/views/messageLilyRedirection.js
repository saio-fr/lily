/* ===========================
       Chat Operator View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    app = require('app/app'),
    config = require('app/globals'),
    MessageView = require('app/views/message'),
    // Object wrapper returned as a module
    MessageLilyRedirection;

MessageLilyRedirection = MessageView.extend({

	className: 'lily-msg-redirection lily-cst-msg-redirection',
	template: _.template( $('#lily-message-redirection').html()),

	initialize: function () {

		this.listenTo( this, 'render', this.triggerRedirectionTel );
		this.listenTo( this, 'render', this.triggerRedirectionMail );
	},

	redirectionMail: function() {
		$.ajax({
			type: 'POST',
			url: config.root + '/redirection/' + this.model.get('id') + '/mail',
			data: 'mail',
		});
	},

	triggerRedirectionTel: function () {
		this.$('.lily-redirection-tel')
			.on( 'click', this.triggerRedirection, 'redirectionTel', this);
	},

	triggerRedirectionMail: function () {
		this.$('.lily-redirection-mail')
			.on('click', this.triggerRedirection, 'redirectionMail', this);
	},

	triggerRedirection: function (redirection) {
		var id = this.model.get('id');
		app.trigger(redirection, id, 'true', '', this);
	}

});

return MessageLilyRedirection;
});