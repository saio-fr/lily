/*****************************************
View one item action
*******************************************/
lily.ActionView = Backbone.View.extend({
    el: '.wrapper-actions.active',
    model: lily.Question,
    template: _.template($('#wrapper-action').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
    },
    initialize: function (e) {
        /*Reset of active class to add Precision/Answer*/
        $('.wrapper-action.active').removeClass('active');
        $('.wrapper-precision.active').removeClass('active');
        this.render();
		if(typeof(this.model.get('mood'))=='undefined'){
			this.$el.find('.select-mood').children('i.lily-icon').addClass('icon-neutral');
			this.$el.find('.select-mood').children('i.lily-icon').attr('data-name','neutral');
		}else {
			this.$el.find('.select-mood').children('i.lily-icon').addClass('icon-'+this.model.get('mood'));
			this.$el.find('.select-mood').children('i.lily-icon').attr('data-name',this.model.get('mood'));
		}
		
    },
    events: {
        'click .content-action': 'addClassActiveAction',
        'keyup .content-action': 'toUpdate'
    },
    addClassActiveAction: function (e) {
		console.log('addClassActiveAction');
		$('.toDelete').removeClass('toDelete');
		$('.wrapper-precision.active').removeClass('active');
		$('.wrapper-answer.active').removeClass('active');
		$(e.currentTarget).parent().parent().addClass('toDelete');
		$(e.currentTarget).parent().parent().children('ol').addClass('active');
	// $('.content-answer.active').height('100%');
		e.stopImmediatePropagation();
    },
	
    toUpdate: function (e) {
        $(e.currentTarget).parent().parent().addClass('toUpdate')
    }

});

