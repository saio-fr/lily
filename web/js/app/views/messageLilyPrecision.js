/* ===========================
    Operator Notation View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
		app = require('app/app'),
    Models = require('app/data/models'),
    MessageView = require('app/views/message'),
    // Object wrapper returned as a module
    MessageLilyPrecision;

MessageLilyPrecision = MessageView.extend({

	className: 'lily-msg-precision lily-cst-msg-precision',
	model: Models.LilyPrecision,
	template: _.template( $('#lily-message-precision').html()),

	initialize: function () {
		this.listenTo( this, 'render', this.triggerPrecision );
	},

	triggerPrecision: function () {

		var message = this;
		this.$('.lily-precision-list').on( 'click', function() {

			var listIndex = message.$( "li.lily-precision-list" ).index($(this)),
			/* on récupère l'index de la question dans la liste (non, c'est pas très propre...) */
					id = message.model.get('actions')[listIndex].id,
					idParent = message.model.get('idparent');

			app.trigger('precision', id, idParent, message);
		});
	}

});

return MessageLilyPrecision;
});