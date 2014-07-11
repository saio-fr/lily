//var lily = lily || {};

/***********************
PAGE THEMATIQUE VIEW
***********************/

lily.Views.Content = lily.Extensions.View.extend({
	
	//		el: '#lily-wrapper-page',
	model: lily.Models.Content,
	template: _.template( $('#lily-page-content-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');


	},
	
	render: function () {
		this.$el.html(this.template( this.model.toJSON() ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);

	}
});