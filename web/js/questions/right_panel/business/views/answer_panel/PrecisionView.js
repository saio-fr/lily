/*****************************************
View Precision
*******************************************/
lily.PrecisionView = Backbone.View.extend({
    model: lily.Question,
    el: '.wrapper-precision.active',
    template: _.template($('#wrapper-precision').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .content-precision ': 'addClassActive',
        'keyup .content-precision': 'toUpdate'
    },
    initialize: function () {
        $('.wrapper-precision.active').removeClass('active');
        $('.wrapper-answer.active').removeClass('active');
        $('.wrapper-actions.active').removeClass('active');
        this.render();
        /*Display 2 actions if it is a new precision view*/
        if (typeof (this.model.get('title')) == 'undefined') {
            new lily.ActionView({
                model: new lily.Question
            });
            new lily.ActionView({
                model: new lily.Question
            });
        }

    },
    toUpdate: function (e) {
        $(e.currentTarget).parent().parent().parent().parent().addClass('toUpdate');
    },
    addClassActive: function (e) {
        /*Reset de la classe toDelete*/
        $('.toDelete').removeClass('toDelete');
        this.$el.children().addClass('toDelete')
        $('.wrapper-actions.active').removeClass('active');
        $(this.$el.find('.wrapper-actions')[0]).addClass('active');
        e.stopImmediatePropagation();
    }
});
