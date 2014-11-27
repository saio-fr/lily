var lily = lily || {};

// The Page
// ---------------
// Page transitions Canvas

var isAnimating = false,
	endCurrPage = false,
	endNextPage = false,
	inClass = '',
	outClass = '',
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},
	// animation end event name
	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	// support css animations
	support = Modernizr.cssanimations;



lily.Extensions.View = Backbone.View.extend({
	
	nextTransition: {
		type: '',
		reverse: '' 
	},
	
	initialize: function () {
		this.router = new lily.Router();
	},
	
	setNextTransition: function (el) { 
		
		var view = this;
		
		view.nextTransition.type=$(el).attr("data-transition");
		view.nextTransition.reverse=$(el).attr("data-reverse");
	},
	
	render: function (options) {
		
		options = options || {};
		
		if (options.page === true) {
			this.$el.find('.lily-page-cont').addClass('lily-page');
		}
		
		var view = this
		
		view.$el.find("a").on("touch click",function(e) { /* On regarde data-transition et data-reverse sur le lien cliqué*/
			view.setNextTransition(this);
		});
		
		return this;
		
	},
	
	transitionIn: function (previous, transition, reverse, callback) {
		
		var view = this,
			delay;
		var $nextPage = view.$el.find('.lily-page-cont');
		var $currPage = (previous) ? previous.$el.find('.lily-page-cont') : null;
		var inClass = (reverse !== 'true') ? 'lily-page-moveFromRight': 'lily-page-moveFromLeft';
		var visible = ' lily-page-visible';
//		var animateIn = function () {
			$nextPage.addClass( inClass + visible ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true
				FastClick.attach(document.body);
				if (_.isFunction(callback)) {
					callback();
				}
				if ($currPage){
					$currPage.parent().remove();
				}
				$nextPage.removeClass( inClass )
			});
//		});
		
//		_.delay(animateIn, 10);
		
	},
	
	transitionOut: function (transition, reverse, callback) {
		
		var view = this;
		var $currPage = view.$el.find('.lily-page-cont');
		var outClass = (reverse !== 'true') ? 'lily-page-moveToLeft': 'lily-page-moveToRight';
		
		$currPage.addClass( outClass ).on( animEndEventName, function() {
			if (_.isFunction(callback)) {
				callback();
			}
			view.$el.find('.lily-page-cont').removeClass( 'lily-page-visible' );
			view.remove();
			$currPage.off( animEndEventName );
		});
	}
	
});

lily.Views.App = lily.Extensions.View.extend({
	
	goTo: function (view, transition, reverse) { /* Déclenche les transitions entre pages */
		
		previous = this.currentPage || null;
		var next = view;
		
		if (previous) {
			var reverse= previous.nextTransition.reverse;
			var transition= previous.nextTransition.transition;
			
			//Get last transition information if exists
			if(previous.nextTransition.type!=undefined) {
				if(previous.nextTransition.reverse!=undefined) {
					reverse=true;
				}
				transition= previous.nextTransition.type;
			}
			
			previous.transitionOut(transition, reverse)
		}
		next.render({ page: true });
		next.transitionIn(previous, transition, reverse, button_callback);
		this.currentPage = next;
	}
	
});


button_callback = function() {
	$('.lily-bt-menu').on('click', function(){
		if( snapper.state().state=="left" ){
			snapper.close();
		} else {
			snapper.open('left');
		}
	});
}

// Session id
var sid = document.cookie.match('PHPSESSID=([^;]*)')[1];