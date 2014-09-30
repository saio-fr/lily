/*Definition standard of the entire views in the bottom submenu in the header (all the filters). 
Difference between all of them is only the template and the difference in the function : initialize, wrapper and render are the same*/
lily.standardHeaderView = Backbone.View.extend({
    el: '#management-questions',
    render: function () {
        this.$el.append(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
});


lily.standardHeaderViewTop = Backbone.View.extend({
    el: '#header-questions',
     render: function () {

        /*Don't need to render a model*/
        this.$el.append(this.template);


        return this;
    },
    initialize: function () {
        this.render();
    },
});