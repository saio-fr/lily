lily.ListCategoryHeaderView = Backbone.View.extend ({
	
	tagName: 'ul',


	className: 'dropdown-menu',


	initialize: function () {
		this.ChildViews = [];

		this.collection = app.listCategories;
	},


	render: function () {

		var that = this;

		this.collection.each(function (categoryItem) {

			var categoryHeaderView = new lily.CategoryHeaderView({model: categoryItem});
			that.ChildViews.push(categoryHeaderView);

			that.$el.append( categoryHeaderView.render().el );

		});

		return this;

	},


	close: function () {
		
		this.unbind();
		this.remove();

		_.each(this.ChildViews, function (ChildView) {
			if (ChildView.close) {
				ChildView.close();
			}
		});
	
	},

});