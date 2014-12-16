lily.AppQuestionUnansweredView = Backbone.View.extend ({

	id: 'central-panel',

	
	template: _.template($('#central-panel-unanswered').html()),

	
	initialize: function () {		

		this.render();

		//append in DOM
		$('#contenant-page').prepend(this.el);

		//Keep tracks of ChildViews in this array
		this.ChildViews = [];
		
		//init ListLabelsView
		var listLabelsView = new lily.ListLabelsView;
		this.ChildViews.push(listLabelsView);

		//init listQuestionsUnansweredView  (app.listQuestionsUnansweredView is defined in the router)
		app.listQuestionsUnansweredView = new lily.ListQuestionsUnansweredView();
		this.ChildViews.push(app.listQuestionsUnansweredView);

		//fetch the collection and append the view to the DOM when finished
		app.listQuestionsUnansweredView.collection.fetch({
            
            // data: JSON.stringify({'categories': app.postRequest.categories,
                                  // 'tags': app.postRequest.tags,
                                  // 'max': app.postRequest.max,
                                  // 'page': app.postRequest.page,
                                  // 'sortBy': {
                                      // 'name': app.postRequest.sortBy.name,
                                      // 'order': app.postRequest.sortBy.order
                                  // },
            // }),
            // type: 'POST',
            success: function () {
            	$('#list-questions-section').append( app.listQuestionsUnansweredView.render().el );
            },
        });
		
		//init the eventListener on app.postRequest to know when it changes and so know when to refresh ListQuestionView
		this.listenTo(app.postRequest, 'refresh', function () {
			
			//We use a close function instead of the remove funciton to be sure to remove the view (see the definition in listQuestionsUnansweredView.js)
			app.listQuestionsUnansweredView.close();
			app.listQuestionsUnansweredView = new lily.listQuestionsUnansweredView();
			this.ChildViews[1] = app.listQuestionsUnanswereddView;
			
			app.listQuestionsUnansweredView.collection.fetch({
            	data: JSON.stringify({'categories': app.postRequest.categories,
                	                  'tags': app.postRequest.tags,
                	                  'max': app.postRequest.max,
                	                  'page': app.postRequest.page,
                	                  'sortBy': {
                	                      'name': app.postRequest.sortBy.name,
                	                      'order': app.postRequest.sortBy.order
                	                  },
            	}),
            	type: 'POST',
            	success: function () {
            		$('#list-questions-section').append( app.listQuestionsUnansweredView.render().el );
            	},
        	});
		
		});

	},

	
	render: function () {
		this.$el.prepend(this.template());
		return this;
	},


	events: {

		//Search events
		'keyup #filtreRecherche': 'searchQuestions',
		'click .button-search': 'searchQuestions',

		'click .select_all_questions': 'select_all_questions',
		'click .unselect_all_questions': 'unselect_all_questions',

		'click #button-add-question': 'displayFullQuestion',

		//The add label function is in the LabelView.js file
		'click .remove_label': 'remove_label_from_select_questions',

		//Previous and Next page
		'click .previous-page-button': 'display_previous_page',
		'click .next-page-button': 'display_next_page',

	},


	searchQuestions: function () {
		
	},

	
	select_all_questions: function () {
		//set all checkbox to check
		$('#list-questions').find('i').addClass('checked');
	},


	unselect_all_questions: function () {
		//set all checkbox to uncheck
		$('#list-questions').find('i').removeClass('checked');
	},


	displayFullQuestion: function (e) {
	
        console.log('displayFullQuestion');
 		
 		if(typeof(questionFullView)=='undefined'){//right panel closed
 			console.log('1')
 			questionFullView = new lily.QuestionBusinessFullView({model : new lily.Question});
 		} else {
 
 			console.log('2');
 
 			if(typeof(questionFullView.model.id)=='undefined'){//right panel opened on a new question
 				console.log('3');
 				questionFullView.remove()
 				$('#question-content').addClass('hide');
 				delete questionFullView;
 			} else {
 				console.log('4');
 				app.navigate('business',{trigger:true});
 				questionFullView.remove();
 				questionFullView = new lily.QuestionBusinessFullView({model : new lily.Question});
 			}

 		} 
    
    },


    remove_label_from_select_questions: function () {
    	//code
	},

	display_previous_page: function () {
		
		if (app.postRequest.page !== 0) {
			app.postRequest.page--;
			//Event to refresh listQuestionsUnansweredView
			app.postRequest.trigger('refresh');
		}

	},

	display_next_page: function () {
		
		app.postRequest.page++;
		//Event to refresh ListQuestionView
		app.postRequest.trigger('refresh');

	},

	close: function () {
		
		this.unbind();
		this.remove();

		_.each(this.ChildViews, function (childview) {
			if (childview.close) {
				childview.close();
			}
		});
	
	},

});