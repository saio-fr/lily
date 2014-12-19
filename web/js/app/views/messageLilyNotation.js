/* ===========================
    Operator Notation View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var Backbone = require('backbone'),
		_ = require('underscore'),
		app = require('app/app'),
    Models = require('app/data/models'),
    // Object wrapper returned as a module
    MessageLilyNotation;


MessageLilyNotation = Backbone.View.extend({

	className: 'lily-msg-reporting lily-cst-msg-reporting',

	model: Models.LilyNotation,

	template: _.template( $('#lily-message-notation').html()),
	events: {
		'click .lily-icon-thumb-up': 'satisfied',
		'click .lily-icon-thumb-down': 'notSatisfied'
	},

	initialize: function () {
		this.render();
	},

	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#lily-box-messages .lily-msg-avatar:last' );
		$( '#lily-box-messages .lily-msg-avatar:last' ).addClass('lily-notation-wrapper');
		return this;
	},

	satisfied: function () {
		app.trigger('satisfied', this.model.get('id'), true, '', this);
	},

	notSatisfied: function () {
		app.trigger('notSatisfied', this.model.get('id'), false, '', this);
	}

});


return MessageLilyNotation;
});