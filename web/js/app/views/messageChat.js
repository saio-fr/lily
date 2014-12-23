/* ===========================
       Chat Operator View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var Backbone = require('backbone'),
    config =require('app/globals'),
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
    this.transitionInMessage();
		$( '#chat-box-messages:last-child' ).scrollTop(10000);

		return this;
	},

  transitionInMessage: function (callback) {

    var $message = this.$el,
        $messageBox = $('#lily-box-messages'),
        inClass = 'lily-message-show';

    $message.addClass(inClass).on(config.animEndEventName, function() {

      $message.off(config.animEndEventName);
      $messageBox.animate({
        scrollTop: $messageBox.get(0).scrollHeight
      }, 500);
    });
  }

});

return MessageChatView;
});