/* ===========================
    		Faq Page
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
		app = require('app/app'),
		config = require('app/globals'),
    Messages = require('app/data/collection'),
    PageView = require('app/views/page'),
    MessageChatOperator = require('app/views/messageChatOperator'),
    MessageChatVisitor = require('app/views/messageChatVisitor'),
    // Object wrapper returned as a module
    ChatView;

ChatView = PageView.extend({

	events: {
		'keyup  #lily-search-form' : 'writing',
		'submit #lily-search-form' : 'doChat',
		'click  #lily-go' : 'doChat',
		'click  .lily-icon-thumb-up'   : 'satisfaction',
		'click  .lily-icon-thumb-down' : 'satisfaction'
	},

	initialize: function() {

		var chat = this;

		this.messages = new Messages();
		this.listenTo(this.messages, 'add', this.addItem);

		app.ws.subscribe('visitor/' + config.licence + '/' + config.sid, function (topic, payload) {
			chat.messages.set(payload);
		});

		app.ws.call('chat/open');
		$(this.render().el).appendTo('#lily-wrapper-page');
	},

	render: function () {

		var template = _.template( $('#lily-page-chat-template').html());
		this.$el.html(template());
		this.trigger('render');

		$('input, textarea').placeholder();
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');

		return PageView.prototype.render.apply(this, arguments);
	},

	writing: function (e) {

		if( this.$input.val() ) {
			app.ws.call('chat/writing', { sid: config.sid, writing: true });
		} else {
			app.ws.call('chat/writing', { sid: config.sid, writing: false });
		}
	},

	doChat: function (e) {
		e.preventDefault();

		var message = this.$input.val();
		if ( $.trim(message).length > 0 ){
			// On vérifie que le champ n'est pas vide
			// ou contient uniquement des espaces
			this.send(message);
		}
		// clear the search field
		this.clearInput();
	},

	send: function (message) {
		app.ws.publish('operator/' + config.licence, message);
	},

	addItem: function(message) {
		var messageView;
		// create an instance of the sub-view to render the single message item.
		switch ( message.get('from') ) {
			case 'visitor':
				messageView = new MessageChatVisitor({
					model: message,
				}).render();
				break;
			case 'operator':
				this.$el.find('.lily-msg-chat-wait').hide();
				messageView = new MessageChatOperator({
					model: message
				}).render();
				break;
		}
	},

	clearInput: function() {

		if (config.isMobile.phone){
			this.$input.val('').blur();
		}
		else {this.$input.val('').focus().select();}
	},

	satisfaction: function(e) {

		var target = $(e.target),
				satisfaction;

		this.$el.find('#lily-chat-notation-wrapper i').removeClass('active');

		if (target.hasClass('lily-icon-thumb-up')) {
			this.$el.find('.lily-icon-thumb-up').addClass('active');
			satisfaction = true;
		} else {
			this.$el.find('.lily-icon-thumb-down').addClass('active');
			satisfaction = false;
		}

		app.ws.call('chat/satisfaction', { sid: config.sid, satisfaction: satisfaction });
	}

});

return ChatView;
});