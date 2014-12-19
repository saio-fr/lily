/* ===========================
    Chat Visitor Message View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
		Backbone = require('backbone'),
    app = require('app/app'),
    config = require('app/globals'),
    // Object wrapper returned as a module
    PageView;

app.isAnimating = false;
app.endCurrPage = false;
app.endNextPage = false;

PageView = Backbone.View.extend({

	nextTransition: {
		type: '',
		reverse: ''
	},

	render: function (options) {

		options = options || {};

		if (options.page === true) {
			this.$el.find('.lily-page-cont').addClass('lily-page');
		}

		var view = this;

		view.$el.find("a").on("touch click",function(e) {
			/* On regarde data-transition et data-reverse sur le lien cliqué*/
			view.setNextTransition(this);
		});

		return this;

	},

	setNextTransition: function (el) {

		this.nextTransition.type = $(el).attr("data-transition");
		this.nextTransition.reverse = $(el).attr("data-reverse");
	},

	transitionIn: function (previous, transition, reverse, callback) {

		var view = this,
				$nextPage = view.$el.find('.lily-page-cont'),
				$currPage = (previous) ? previous.$el.find('.lily-page-cont') : null,
				inClass = reverse !== 'true' ? 'lily-page-moveFromRight': 'lily-page-moveFromLeft',
				visible = 'lily-page-visible';

		$nextPage.addClass(inClass + visible).on(config.animEndEventName, function() {

			$nextPage.off(config.animEndEventName);
			app.endNextPage = true;

			// TODO: have a look at that!
			FastClick.attach(document.body);

			if (_.isFunction(callback)) {
				callback();
			}

			if ($currPage){
				$currPage.parent().remove();
			}

			$nextPage.removeClass(inClass);
		});

	},

	transitionOut: function (transition, reverse, callback) {

		var view = this,
				$currPage = view.$el.find('.lily-page-cont'),
				outClass = reverse !== 'true' ? 'lily-page-moveToLeft': 'lily-page-moveToRight';

		$currPage.addClass( outClass ).on(config.animEndEventName, function() {
			if (_.isFunction(callback)) {
				callback();
			}
			view.$el.find('.lily-page-cont').removeClass( 'lily-page-visible' );
			view.remove();

			$currPage.off(config.animEndEventName );
		});
	}

});

return PageView;
});
