/* ===========================
       Chat Operator View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var Backbone = require('backbone'),
    // Object wrapper returned as a module
    MessageChatView;

MessageChatView = Backbone.View.extend({

	initialize: function() {
		// bind model's changes to the render() method to mantain interface up to date.
		this.model.on( 'change', this.render, this );
	},

	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo('#chat-box-messages');
		$( '#chat-box-messages:last-child' ).scrollTop(10000);

		this.trigger('render');
		return this;
	},

});

return MessageChatView;
});