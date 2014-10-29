/*=============================================================================
Item category-redirection in side right panel of full question View
=============================================================================*/
lily.CategoryDisplayedView = Backbone.View.extend({
    model: lily.Category,
    template: _.template($('#category-display').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .category-displayed': 'chooseCategory'
    },
    chooseCategory: function (e) {
		var idCategory=$(e.currentTarget).attr('data-id');
		var titleCategory=$(e.currentTarget).attr('data-title')
		// var parentCategory=$(e.currentTarget).attr('parent');
		var colorCategory = $(e.currentTarget).attr('data-color');
		var categoryToDisplay = new lily.Category;
		categoryToDisplay.set({id:idCategory});
		categoryToDisplay.set({title:titleCategory});
		categoryToDisplay.set({color:colorCategory});
		// categoryToDisplay.set({});
		console.log(categoryToDisplay.toJSON());
		new lily.CategoryChoosenView({model:categoryToDisplay});
		listCategoriesDisplayedView.$el.empty();

		$('#category').addClass('hide');
		$('#wrapper-category-choosen').removeClass('hide');
	}
});