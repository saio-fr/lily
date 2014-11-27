/*=============================================================================
Collection category-redirection in side right panel of full question View
=============================================================================*/
lily.ListCategoriesDisplayedView = Backbone.View.extend({
    el: '#list-categories-displayed',
    initialize: function (listCategories) {

        this.collection = listCategories;
        this.render();
        /*Update automatically view	*/
    },
    render: function () {

        this.collection.each(function (item) {
            this.displayCategoryDisplayed(item);
        }, this);
    },
    displayCategoryDisplayed: function (item) {
        var categoryDisplayedView = new lily.CategoryDisplayedView({
            model: item
        });
        this.$el.append(categoryDisplayedView.render().el);
    }

});

