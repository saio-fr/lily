/* ===========================
    		Faq Page
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Models = require('app/data/models'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    ContentPage;

ContentPage = PageView.extend({

	model: Models.Content,
	template: _.template( $('#lily-page-content-template').html() ),

	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},

	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return PageView.prototype.render.apply(this, arguments);
	}
});

return ContentPage;
});