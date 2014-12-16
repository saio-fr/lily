/*=============================================================================
Collection category-redirection in side right panel of full question View
=============================================================================*/
lily.ListCategoriesParentsView = Backbone.View.extend({
    el: '.list-categories-displayed',
    initialize: function (listCategories) {

        this.collection = listCategories;
        this.render();
        /*Update automatically view	*/
    },
    render: function () {

        this.collection.each(function (item) {
            this.displayCategoryPopup(item);
        }, this);
    },
    displayCategoryPopup: function (item) {
        var categoryDisplayedView = new lily.CategoryParentView({
            model: item
        });
        this.$el.append(categoryDisplayedView.render().el);
    }

});

