/*******************************************************************************
View for one item category
********************************************************************************/
lily.ListRedirectionsView = Backbone.View.extend({
    el: 'ul.wrapper-redirection',
    initialize: function (listRedirections) {
        this.model.bind('change', this.displayRedirection);
        this.collection = listRedirections;
        this.render();
        /*Update automatically view	*/
        this.listenTo(this.collection, 'add', this.displayRedirection);
        this.listenTo(this.collection, 'update', this.displayRedirection);
        this.listenTo(this.collection, 'change', this.displayRedirection);
    },
    render: function () {
        this.collection.each(function (item) {
            this.displayRedirection(item);
        }, this);
    },
    displayRedirection: function (item) {
        var redirectionView = new lily.RedirectionView({
            model: item
        });
        this.$el.append(redirectionView.render().el);
    }
});
