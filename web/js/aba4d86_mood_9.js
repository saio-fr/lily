lily.Mood=Backbone.Model.extend({});
lily.listMoods=Backbone.Collection.extend({
initialize:function(){
}
});

lily.MoodView=Backbone.View.extend({
model:lily.Mood,
    tagName: 'li', 
    template: _.template($('#mood').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
	events:{
	'click .button-mood':'chooseMood'
	},
	chooseMood:function(){
	moodChoosen=this.model.get('title').toLowerCase();
	/*Reset of mood displayed*/
	$('.mood-avatar').attr('class','mood-avatar');
	/*Add class to show mood choosen*/
	$('.mood-avatar').addClass('mood-detail-'+moodChoosen);
	}
});


lily.listMoodsView=Backbone.View.extend({
el:'.content-mood',
initialize: function (collectionmoodDisplay) {
/*moods defined in this file, not in the backend*/
var liste_moods = [{
        title: 'neutral',
        
    }, {
        title: 'happy',
        
    }, {
        title: 'sceptical',
        
    }, {
        title: 'sad',
        
    }, {
        title: 'angry',
        
    }];


	listmoods=new lily.listMoods(liste_moods);
        this.collection = listmoods;
        this.render();       
		

    },



    render: function () {
        this.collection.each(function (item) {
            this.displaymood(item);
        }, this);

    },
	/*Function used in loop to display all items of listQuestions*/
    displaymood: function (item) {
        var moodView = new lily.MoodView({
            model: item
        });
        this.$el.append(moodView.render().el);
    }
});
