
lily.ListMoodsView=Backbone.View.extend({
el:'.list-moods.active',
initialize: function () {
/*moods are defined in this file, not in the backend*/
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


        this.collection = new lily.ListMoods(liste_moods);
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
