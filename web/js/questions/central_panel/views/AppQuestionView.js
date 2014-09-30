lily.AppQuestionView = Backbone.View.extend({

	id: 'central-panel',


	template: _.template($('#centralPanelTemplate').html()),

	
	initialize: function () {		

		this.render();

		//append in DOM
		$('#contenant-page').prepend(this.el);
		//Keep tracks of ChildViews in this array
		this.ChildViews = [];
		//init ListLabelsView
		var listLabelsView = new lily.ListLabelsView;
		this.ChildViews.push(listLabelsView);
		//init ListCategoryView
		var listCategoryHeaderView = new lily.ListCategoryHeaderView();
		this.ChildViews.push(listCategoryHeaderView);
		$('#management-questions .category-button-filter').append(listCategoryHeaderView.render().el);

		//init ListQuestionsView  (app.listQuestionsView is defined in the router)
		app.listQuestionsView = new lily.ListQuestionsView();
		this.ChildViews.push(app.listQuestionsView);

		//fetch the collection and append the view to the DOM when finished
		app.listQuestionsView.collection.fetch({
            //
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
            	for (var i = 0; i < app.postRequest.max; i++) {
            		app.listQuestionsView.collection.add(app.listQuestionsView.collection.models[0].get( parseInt(i) ));
            	};
            	app.listQuestionsView.collection.remove(app.listQuestionsView.collection.models[0]);

            	$('#list-questions-section').append( app.listQuestionsView.render().el );
            },
        });

		//init the eventListener on app.postRequest to know when it changes and so know when to refresh ListQuestionView
		this.listenTo(app.postRequest, 'refresh', function () {
			
			//We use a close function instead of the remove funciton to be sure to remove the view (see the definition in ListQuestionsView.js)
			$('#questions').append('<div class="loader-waiting"></div>');
			app.listQuestionsView.close();
			app.listQuestionsView = new lily.ListQuestionsView();
			this.ChildViews[1] = app.listQuestionsView;
			
			app.listQuestionsView.collection.fetch({
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
            		for (var i = 0; i < app.postRequest.max; i++) {
            		app.listQuestionsView.collection.add(app.listQuestionsView.collection.models[0].get( parseInt(i) ));
            	};
            	app.listQuestionsView.collection.remove(app.listQuestionsView.collection.models[0]);

            		$('#list-questions-section').append( app.listQuestionsView.render().el );
					$('.loader-waiting').remove();
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

		//Sort
		'click .newest-date':'sortDateNewest',
		'click .oldest-date':'sortDateOldest',
		
		'click .more-asked':'sortMoreAsked',
		'click .less-asked':'sortLessAsked',
		
		'click .more-satifactory':'sortMoreSatisfactory',
		'click .less-satifactory':'sortLessSatisfactory',
		
		'click .delete-questions':'displayPopupDelete',
		'click .button-validate-popup-delete':'validateDelete',
		'click .close-popup-delete':'cancelDelete',
		'click .button-cancel-popup-delete':'cancelDelete',
		'click .validate-cookie':'toggleClass',

		'click #button-add-question': 'displayFullQuestion',

		//The add label function is in the LabelView.js file
		'click .remove_label': 'remove_label_from_select_questions',

		//Previous and Next page
		'click .previous-page-button': 'display_previous_page',
		'click .next-page-button': 'display_next_page',

		//Number of question per page
		'click .25-questions-per-page': 'display_25_questions_per_page',
		'click .50-questions-per-page': 'display_50_questions_per_page',
		'click .100-questions-per-page': 'display_100_questions_per_page',
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
	
	sortDateNewest:function(){
		if(!((app.postRequest.sortBy.name=="date")&&(app.postRequest.sortBy.order=="DESC"))){
			app.postRequest.sortBy.name="date";
			app.postRequest.sortBy.order="DESC";
			app.postRequest.trigger('refresh');
		} 
	},
	
	sortDateOldest:function(){
		if(!((app.postRequest.sortBy.name=="date")&&(app.postRequest.sortBy.order=="ASC"))){
			app.postRequest.sortBy.name="date";
			app.postRequest.sortBy.order="ASC";	
			app.postRequest.trigger('refresh');
		} 
	},
	
	sortMoreAsked:function(){
		if(!((app.postRequest.sortByame=='requests')&&(app.postRequest.sortBy.order=="DESC"))){
			app.postRequest.sortBy.name="requests";
			app.postRequest.sortBy.order="DESC";
			app.postRequest.trigger('refresh');
			}
	},
	
	sortLessAsked:function(){
		if(!((app.postRequest.sortByame=='requests')&&(app.postRequest.sortBy.order=="ASC"))){
			app.postRequest.sortBy.name="requests";
			app.postRequest.sortBy.order="ASC";
			app.postRequest.trigger('refresh');
		}
	},
	
	sortMoreSatisfactory:function(){
		if(!((app.postRequest.sortByame=='satisfaction')&&(app.postRequest.sortBy.order=="DESC"))){
		app.postRequest.sortBy.name="satisfaction";
		app.postRequest.sortBy.order="DESC";
		app.postRequest.trigger('refresh');
		}
	},
	
	sortLessSatisfactory:function(){
		if(!((app.postRequest.sortByame=='satisfaction')&&(app.postRequest.sortBy.order=="ASC"))){
		app.postRequest.sortBy.name="satisfaction";
		app.postRequest.sortBy.order="ASC";
		app.postRequest.trigger('refresh');
	}
	
	},
	
	displayPopupDelete:function(){
		if($('#list-questions i.checked').length>0){ 
			if(document.cookie.search('deleteAuthorized')<0){//we check if the cookie deleteAuthorized, which allow to undisplay the popup of confirmation is here, or not.
				/*Cookies not created*/
				if(typeof(questionFullView)!='undefined'){
					questionFullView.remove();
					questionFullView.$el.addClass('hide');
				}
				$('#wrapper-popup-delete').removeClass('hide');
				
			} else {
			/*Cookie already here, so we destroy all selected elements */
			appQuestionView.deleteQuestions();	
				} 
		}
	},
	
	validateDelete:function(){
		console.log('validateDelete');
		// var arrayToDelete = $('#list-questions i.checked');
		/*we check if checkbox is checked, if it is, we save in cookie the variable to know that we don't need to ask again the confirmation*/
			var test_class = $('i.validate-cookie').attr('class');
			test_class.replace('icon-unchecked','');
			if(test_class.search('checked')>-1){
			/*if the checkbox is checked, we have to create the cookie*/	
			var today = new Date(), expires = new Date();
			expires.setTime(today.getTime() + (1000*60*60*24*7));//cookie expires each week
			document.cookie = "deleteAuthorized" + ";expires=" + expires.toGMTString();
			}
		/*we delete the questions selected*/	
			appQuestionView.deleteQuestions();	
			
			
			
			
	},
	
	cancelDelete:function(){
		console.log('cancelDelete');
		$('#wrapper-popup-delete').addClass('hide');
	
	},
	
	toggleClass:function(){
		this.$el.find('i.validate-cookie').toggleClass('checked')
	},
	
	deleteQuestions:function(){
		console.log('deleteQuestions');
		var i = 0;
		var arrayI = $('#list-questions i');
		if(arrayI.length>0){
			_.each(app.listQuestionsView.collection, function () {
				
				if(arrayI.eq(i).hasClass('checked')) {

					var question = app.listQuestionsView.collection.models[i];

					question.url = "/delete/" + question.id;

					question.destroy({wait:true});//need to be sure last item is destroyed before trigger event refresh.

				}

				i++;
			
			}); 
			  
			
			
			
			$('#wrapper-popup-delete').addClass('hide');
			app.postRequest.trigger('refresh');	
		}
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
			//Event to refresh ListQuestionsView
			app.postRequest.trigger('refresh');
		}

	},

	
	display_next_page: function () {
		
		app.postRequest.page++;
		//Event to refresh ListQuestionView
		app.postRequest.trigger('refresh');

	},


	display_25_questions_per_page: function () {
		app.postRequest.max = 25;
		app.postRequest.trigger('refresh');
	},


	display_50_questions_per_page: function () {
		app.postRequest.max = 50;
		app.postRequest.trigger('refresh');
	},


	display_100_questions_per_page: function () {
		app.postRequest.max = 100;
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