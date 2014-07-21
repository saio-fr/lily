//var lily = lily || {};

/***********************
PAGE TOP DES QUESTIONS VIEW
***********************/

lily.Views.TopQuestions = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.TopQuestions,
	template: _.template( $('#lily-page-top-questions-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	}
});