/* ===========================
       Chat Clooection View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var Backbone = require('backbone'),
    MessageUserSimple = require('app/views/messageUserSimple'),
    MessageLilySimple = require('app/views/messageLilySimple'),
    MessageLilyRedirection = require('app/views/messageLilyRedirection'),
    MessageLilyPrecision = require('app/views/messageLilyPrecision'),
    MessageLilyNotation = require('app/views/messageLilyNotation'),
    MessageUserCompletion = require('app/views/messageUserCompletion'),
    // Object wrapper returned as a module
    MessagesCollectionView;

MessagesCollectionView = Backbone.View.extend({

	initialize: function () {
		// TODO: keep trak of message views with backbone-babysittor
	},

	addItem: function( messageModel, messageType) {
		// remove waiting message if exists.

		// create an instance of the sub-view to render the single message item.
		var message;
		switch ( messageType ) {
			case 'user-simple':
				message = new MessageUserSimple({
					model: messageModel
				}).render();
				break;
			case 'lily-simple':
				message = new MessageLilySimple({
					model: messageModel
				}).render();
				break;
			case 'lily-redirection':
				message = new MessageLilyRedirection({
					model: messageModel
				}).render();
				break;
			case 'lily-precision':
				message = new MessageLilyPrecision({
					model: messageModel
				}).render();
				break;
			case 'lily-notation':
				message = new MessageLilyNotation({
					model: messageModel
				}).render();
				break;
			case 'lily-completion':
				message = new MessageUserCompletion({
					model: messageModel
				}).render();
				break;
		}
	}
});

return MessagesCollectionView;
});