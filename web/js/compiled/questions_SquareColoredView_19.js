/********************************************************************************
View for one square colored
********************************************************************************/
lily.squareColoredView = Backbone.View.extend({
    model: lily.squareColored,
    template: _.template($('#square-colored-category').html()),

    tagName: 'li',
    className: 'category-color',

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .square-colored': 'chooseColor',

    },
    chooseColor: function () {

        color = this.model.attributes.color;

        $('.square-colored').removeClass('active');
        this.$el.children().addClass('active');


    }

});
