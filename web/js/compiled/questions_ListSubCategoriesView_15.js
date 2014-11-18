lily.ListSubCategoriesView=Backbone.View.extend({

    initialize: function (idWrapper,collectionCategorie) {
        this.collection = collectionCategorie;
		this.$el=idWrapper;
        this.render();
    },
    render: function () {
        this.collection.each(function (item) {
            this.displaySubCategory(item);
        }, this);

    },
    displaySubCategory: function (item) {
        var subcategoryView = new lily.SubCategoryView({
            model: item
        });
        this.$el.append(subcategoryView.render().el);
    }

});


