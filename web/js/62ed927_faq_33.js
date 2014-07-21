//var lily = lily || {};

/***********************
PAGE THEMATIQUE VIEW
***********************/

lily.Views.Faq = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.Faq,
	template: _.template( $('#lily-page-faq-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');

	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	}
});