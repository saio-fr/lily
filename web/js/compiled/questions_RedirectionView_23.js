
lily.RedirectionView = Backbone.View.extend({
    model: lily.Redirection,
    tagName: 'li',
    template: _.template($('#redirection').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .liste-redirection': 'chooseRedirection',
    },
    chooseRedirection: function () {
        idRedirection = this.model.id;
		// $('button.button-redirection').children(
		$('#redirectionToSave').attr('data-id',this.model.id);
		
    },
});

