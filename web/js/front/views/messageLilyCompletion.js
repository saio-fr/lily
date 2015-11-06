/* ===========================
  Chat Operator Completion View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
		app = require('front/app'),
    Models = require('front/data/models'),
    MessageView = require('front/views/message'),
    // Object wrapper returned as a module
    MessageLilyCompletion;


MessageLilyCompletion = MessageView.extend({

	className: 'msg msg-avatar msg-reporting cst-msg-reporting',
	model: Models.LilyCompletion,
	template: _.template($('#message-completion').html()),

	initialize: function () {
		this.listenTo(this, 'render', this.triggerCompletion);
	},

	triggerCompletion: function () {

		var view = this;
		this.$('.precision-list').on( 'click', function() {
			var id = view.model.get('id');

			if ( $(this).hasClass('completion-incomplete') ) {
				app.trigger('satisfied', id, 'false', 'incomplete', view);
			}
			if ( $(this).hasClass('completion-incorrect') ) {
				app.trigger('satisfied', id, 'false', 'incorrect', view);
			}
			else  {
				return false;
			}
		});
	}

});

return MessageLilyCompletion;
});
