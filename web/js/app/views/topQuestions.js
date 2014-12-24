/* ===========================
    		Top Questions
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Models = require('app/data/models'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    TopQuestions;

TopQuestions = PageView.extend({

	model: Models.TopQuestions,
	template: _.template( $('#lily-page-top-questions-template').html() ),

	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},

	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return PageView.prototype.render.apply(this, arguments);
	}

});

return TopQuestions;
});