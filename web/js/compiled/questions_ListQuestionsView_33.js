lily.ListQuestionsUnansweredView= Backbone.View.extend({/*A supprimer quand la fonction tri sera implémentée en back*/
    tagName: 'ul',

    
    className: 'list-questions" class="list-group no-borders m-b-none m-t-n-xxs list-group-alt list-group-lg liste-questions',


    id: 'list-questions',


    initialize: function () {

        this.collection = new lily.ListQuestions;

        //get the right collection
        this.collection.url = '/unanswered/get';

        //Array use to deal with the suppression of the ChildViews
        this.ChildViews = [];

    },
    

    render: function () {

        //append to el element but still not displayed in the DOM (it is done in the appQuestionsView after the instantiation of ListQuestionsView)
        this.collection.each(function (question) {
            var questionunansweredView = new lily.QuestionUnansweredView({model: question});
            //push th subview in the array to be able to delete it in this.close function
            this.ChildViews.push(questionunansweredView);
            this.$el.append( questionunansweredView.render().el );           
        }, this);
        return this;

    },


    close: function () {
    
        this.unbind();
        this.remove();

        //Remove all the ChildView when removing this View
        _.each(this.ChildViews, function (childView) {
            if (childView.close) {
                childView.close();
            }
        });

    },

});
lily.ListQuestionsPersonalView= Backbone.View.extend({/*A supprimer quand la fonction tri sera implémentée en back*/
    tagName: 'ul',

    
    className: 'list-questions" class="list-group no-borders m-b-none m-t-n-xxs list-group-alt list-group-lg liste-questions',


    id: 'list-questions',


    initialize: function () {

        this.collection = new lily.ListQuestions;

        //get the right collection
        this.collection.url = '/personal/get';

        //Array use to deal with the suppression of the ChildViews
        this.ChildViews = [];

    },
    

    render: function () {

        //append to el element but still not displayed in the DOM (it is done in the appQuestionsView after the instantiation of ListQuestionsView)
        this.collection.each(function (question) {
            var questionpersonalView = new lily.QuestionPersonalView({model: question});
            //push th subview in the array to be able to delete it in this.close function
            this.ChildViews.push(questionpersonalView);
            this.$el.append( questionpersonalView.render().el );           
        }, this);
        return this;

    },


    close: function () {
    
        this.unbind();
        this.remove();

        //Remove all the ChildView when removing this View
        _.each(this.ChildViews, function (childView) {
            if (childView.close) {
                childView.close();
            }
        });

    },

});





lily.ListQuestionsView = Backbone.View.extend({

    tagName: 'ul',

    
    className: 'list-questions" class="list-group no-borders m-b-none m-t-n-xxs list-group-alt list-group-lg liste-questions',


    id: 'list-questions',


    initialize: function () {

        this.collection = new lily.ListQuestions;

        //get the right collection
        this.collection.url = '/sort';

        //Array use to deal with the suppression of the ChildViews
        this.ChildViews = [];

    },
    

    render: function () {

        //append to el element but still not displayed in the DOM (it is done in the appQuestionsView after the instantiation of ListQuestionsView)
        this.collection.each(function (question) {
            var questionView = new lily.QuestionView({model: question});
            //push th subview in the array to be able to delete it in this.close function
            this.ChildViews.push(questionView);
            this.$el.append( questionView.render().el );           
        }, this);
        return this;

    },


    close: function () {
    
        this.unbind();
        this.remove();

        //Remove all the ChildView when removing this View
        _.each(this.ChildViews, function (childView) {
            if (childView.close) {
                childView.close();
            }
        });

    },

});



















/*************************************
View list Questions without answers
***************************************/
// lily.listQuestionsUnansweredView = Backbone.View.extend({
    // el: '#liste-questions',
    // initialize: function (collectionDisplay) {
        // this.model.bind('change', this.displayQuestion);
        // this.collection = collectionDisplay;
        // this.render();
        // /*===========================================
// Update automatically of collection
	// ===============================================*/
        // this.listenTo(this.collection, 'add', this.displayQuestionUnanswered);
        // this.listenTo(this.collection, 'update', this.displayQuestionUnanswered);
        // this.listenTo(this.collection, 'change', this.displayQuestionUnanswered);
    // },
    // render: function () {
        // this.collection.each(function (item) {
            // this.displayQuestionUnanswered(item);
        // }, this);
    // },
    // /*Function used in loop to display all items of listQuestions*/
    // displayQuestionUnanswered: function (item) {
        // var questionUnansweredView = new lily.QuestionUnansweredView({
            // model: item
        // });
        // this.$el.append(questionUnansweredView.render().el);
    // }
// });
/*************************************
View list Questions personal
***************************************/
// lily.listQuestionsPersonalView = Backbone.View.extend({
    // el: '#liste-questions',
    // initialize: function (collectionDisplay) {
        // this.model.bind('change', this.displayQuestion);
        // this.collection = collectionDisplay;
		// $('#liste-questions').children().remove();
        // console.log('collectionDisplay longueur'+collectionDisplay.length);
		// this.render();
        // /*===========================================
// Update automatically of collection
// ============================================*/
        // this.listenTo(this.collection, 'add', this.displayQuestionPersonal);
        // this.listenTo(this.collection, 'update', this.displayQuestionPersonal);
        // this.listenTo(this.collection, 'change', this.displayQuestionPersonal);
    // },
    // render: function () {
        // this.collection.each(function (item) {
            // this.displayQuestionPersonal(item);
        // }, this);
    // },
    // /*Function used in loop to display all items of listQuestions*/
    // displayQuestionPersonal: function (item) {
        // var questionPersonalView = new lily.QuestionPersonalView({
            // model: item
        // });
        // this.$el.append(questionPersonalView.render().el);
    // }
// });
