/***************************************************
View list of all Category in side left menu
*******************************************************/
lily.ListCategoriesView = Backbone.View.extend({
    el: '#list-categories',
    initialize: function (collectionCategorie) {

        this.collection = collectionCategorie;
        this.render();

    },
    render: function () {
        this.collection.each(function (item) {
            this.displayCategory(item);
        }, this);

    },
    displayCategory: function (item) {
        var categoryView = new lily.CategoryView({
            model: item
        });
        this.$el.append(categoryView.render().el);
    }

});
