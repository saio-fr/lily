lily.MeterView = Backbone.View.extend({
    el: '#nombre-questions',
    template: _.template($('#meter-questions').html()),
    render: function (e) {
        this.$el.append(this.template);
        return this;
    		e.stopImmediatePropagation();

	},
    initialize: function () {
        this.render();
    },
    events: {
       
    },



});