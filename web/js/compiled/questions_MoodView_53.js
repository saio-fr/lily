lily.MoodView=Backbone.View.extend({
model:lily.Mood,
    tagName: 'li', 
	className:'content-mood',
    template: _.template($('#mood').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
	initialize:function(){
	},
	events:{
	'click .mood-choosen':'chooseMood'
	}, 
	chooseMood:function(e){
		var moodSelected = $(e.currentTarget).attr('data-name');
		$('.select-mood.active').find('.lily-icon').attr('class','lily-icon');
		$('.select-mood.active').find('.lily-icon').addClass('icon-'+moodSelected);
		$(e.currentTarget).parent().parent().parent().children('button').children('i').attr('data-name',moodSelected);
		$('.select-mood.active').removeClass('active');
		$(e.target).parent().parent().parent().parent().parent().addClass('toUpdate')
	// console.log(this.model.get('title'));
	// moodChoosen=this.model.get('title').toLowerCase();
	// /*Reset of mood displayed*/
	// $('.mood-avatar').attr('class','mood-avatar');
	// /*Add class to show mood choosen*/
	// $('.mood-avatar').addClass('mood-detail-'+moodChoosen);
	}
});

