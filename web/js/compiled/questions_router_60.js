var AppRouter = Backbone.Router.extend({
    

    //Jquery object used in the http post request in ListQuestionsView to get the right question collection to append in DOM (display right categories and sort)
    //Listened by AppQuestionView for event 'refresh' which is triggered whenever a value change to refresh the ListQuestionView
	postRequest: _.extend({
		
							"categories": [null],
							"tags": [null],
							"max": 50,
							"page": 0,
							"sortBy": { 
								"name": "date",
								"order": "DESC" 
							}

	}, Backbone.Events),


	listCategories : new lily.ListCategories,


	listRedirections : new lily.ListRedirections,


	//A global variable which will be used to instantiate lily.ListQuestionsView
	listQuestionsView: null,


    routes: {
        "": "all",
		"business":"business",
		"business-detail/:id" : "business_detail", /*view to display the view with the right side panel opened*/
		"personal": "personal",
		"personal-detail/:id":"personal_detail",
        "unanswered": "unanswered",
		"unanswered-detail/:id":"unanswered_detail",
		"spam" : "spam", 
		"trash":"trash",
		"synonyms":"synonyms",
		"questions-live-chat":"questions_from_chat"
    },

	all:function(){
		app.navigate('business',{trigger:true});
	
	},
	business: function () {	
		/*****************************
		We gonna instantiate a new public list of categories. We need this list in different view, so we 
		create it here, to use it several times, and loading just 1 time
		*****************************/
		if(app.listCategories.length=='0'){app.listCategories.fetch({async:false});} 
		var l =0;
		/*Loop to recreate categories children*/
		_.each(app.listCategories,function(){
			if(app.listCategories.models[l].get('parent')!=null){
				var idParent = app.listCategories.models[l].get('parent').id;
				if(typeof(app.listCategories.get(idParent).get('children'))=='undefined'){
					app.listCategories.get(idParent).set({children:new lily.ListCategories});
				}
				app.listCategories.get(idParent).get('children').add(app.listCategories.models[l]);
				// app.listCategories.get(idParent).set({children:app.listCategories.models[l]});//on écrase les enfants précédents
			}
			l++;
		});	
		/*End of loop to create artificially categories children*/
		/*Bloc suivant à supprimer quand problème réglé en back end*/
		_.each(app.listCategories,function(){
			if(typeof(app.listCategories.models[l])!='undefined'){
				console.log('parent '+app.listCategories.models[l].get('parent'));
				if(app.listCategories.models[l].get('parent')!==null){
					app.listCategories.remove(app.listCategories.models[l]);
					
				}
			}	
			l++;
		});
		/*Fin du bloc à supprimer*/
		
		if(app.listRedirections.length=='0'){app.listRedirections.fetch();}
		if(typeof(questionFullView)!=='undefined'){

			questionFullView.remove();
			delete QuestionFullView;
			$('#question-content').addClass('hide');

		}
		
		/*****************************
		Creation new left side menu
		*****************************/	

		new lily.LeftMenuView();
		$('.block-answered').find('.title-block-meter').addClass('active');
		$('#wrapper-unanswered').addClass('collapse');
		

		/***********************************
		Creation of header and central panel
		************************************/	


	
		if(typeof(appQuestionUnansweredView)!='undefined'){
			appQuestionUnansweredView.close();
			delete appQuestionUnansweredView;

		}
		if(typeof(appQuestionPersonalView)!='undefined'){
			appQuestionPersonalView.close();
			delete appQuestionPersonalView;
		}


		if(typeof(appQuestionView)=='undefined'){
			appQuestionView = new lily.AppQuestionView();
		}

		$('.meter-business-questions').addClass('active');	

	},
		

	business_detail: function (id) {
		new lily.LeftMenuView();
		
		$('#wrapper-unanswered').addClass('collapse');
		$('.block-answered').find('.title-block-meter').addClass('active');
		$('.block-answered').find('.meter-business-questions').addClass('active');
		
 
			/*	
		if (typeof(appQuestionView) !== 'undefined') { console.log('appQuestionsView removed'); appQuestionView.stopListening(); 
			appQuestionView.$el.empty(); 
		 appQuestionView = new lily.AppQuestionView;
		 } else {
			 appQuestionView = new lily.AppQuestionView;
		 }
		 
		 */
		 if(typeof(appQuestionView)=='undefined'){
			appQuestionView = new lily.AppQuestionView();
			$('#contenant-page').prepend(appQuestionView.el);
		 }
			var modelToDisplay = new lily.Question;
			modelToDisplay.url="/get/"+id;
			modelToDisplay.fetch({async:false});
			if(typeof(questionFullView)!=='undefined'){
				questionFullView.remove(); 
				// delete questionFullView;
			} 
			questionFullView = new lily.QuestionBusinessFullView({model : modelToDisplay});
	
	},


	personal: function () {
		new lily.LeftMenuView();
		
		$('#wrapper-unanswered').addClass('collapse');
		$('.block-answered').find('.title-block-meter').addClass('active');
		$('.block-answered').find('.meter-personal-questions').addClass('active');
		
		if(typeof(appQuestionView)!=='undefined'){
				appQuestionView.close();
				delete appQuestionView;
		}
				if(typeof(appQuestionUnansweredView)!=='undefined'){
				appQuestionUnansweredView.close();
				delete appQuestionUnansweredView;
		}
		


		if(typeof(questionFullView)!=='undefined'){
		$('#question-content').addClass('hide');
		questionFullView.remove();
		delete questionFullView;
		}

		
		appQuestionPersonalView = new lily.AppQuestionPersonalView;
	
	
	},
	

	personal_detail: function (id) {

		/*****************************
		Creation new left side menu
		*****************************/	
		
		new lily.LeftMenuView();
		$('.meter-personal-questions').addClass('active')
// $('.block-answered').find('.title-block-meter').addClass('active');
$('#wrapper-unanswered').addClass('collapse');
		/********************************
		Creation new headerView
		***********************************/	
		
		if(typeof(appQuestionView)!=='undefined'){
				appQuestionView.close();
				delete appQuestionView;
		}
				if(typeof(appQuestionUnansweredView)!=='undefined'){
				appQuestionUnansweredView.close();
				delete appQuestionUnansweredView;
		}
		if(typeof(appQuestionPersonalView)=='undefined'){
		appQuestionPersonalView = new lily.AppQuestionPersonalView;
		}
		if(typeof(questionFullView)!=='undefined'){
			questionFullView.remove();
		}
		var questionToDisplay = new lily.Question;
		questionToDisplay.url="/personal/get/"+id;
		questionToDisplay.fetch({success:function(){
			questionFullView = new lily.QuestionPersonalFullView({model:questionToDisplay});
		}});
		
	},
	

	unanswered: function () {
		if(app.listCategories.length=='0'){app.listCategories.fetch({async:false});}

		new lily.LeftMenuView();
		$('#nombre-questions').find('.active').removeClass('active');
		$('.meter-unanswered-questions').addClass('active');
		// $('.block-unanswered').find('.title-block-meter').addClass('active');
		$('#wrapper-answered').addClass('collapse');
		/********************************
		Creation new central view
		***********************************/	
		if(typeof(appQuestionPersonalView)!=='undefined'){
			appQuestionPersonalView.close();
			delete appQuestionPersonalView;
		}
		if(typeof(appQuestionView)!=='undefined'){
			appQuestionView.close();
			delete appQuestionView;
		}

		if(typeof(questionFullView)!=='undefined'){
			$('#question-content').addClass('hide');
			questionFullView.remove();
			delete questionFullView;
		}

		appQuestionUnansweredView = new lily.AppQuestionUnansweredView;
	},


	unanswered_detail: function (id) {
			if(app.listCategories.length=='0'){app.listCategories.fetch({async:false});}
		/*We check if the structure of page : left menu, header, already exists. In case of refresh the current page, or if the user share a link with an other user*/
		if(($('#question-content').children().length=='0')||((typeof(fullQuesionView)!=='undefined')&&(fullQuesionView.model.id!==id))){


			/*****************************
			Creation new left side menu
			*****************************/	

			// mnew leftMenuView();
			$('#nombre-questions').children('.active').removeClass('active');
			$('.meter-unanswered-questions').addClass('active');
			// $('.block-unanswered').find('.title-block-meter').addClass('active');
			$('#wrapper-answered').addClass('collapse');

			/********************************
			Creation new headerView
			***********************************/	
			new lily.LeftMenuView();
		
			/*Creation of the view which instantiate all the components of the header*/
			/*We create it only if there is not intantiated on this page*/
			// new lily.headerView();
			
			// if(typeof(listQuestionsUnanswered)=='undefined'){
				// listQuestionsUnanswered=new lily.listQuestionsUnanswered;
				// listQuestionsUnanswered.fetch({wait:true});
			// }
	
			// if($('#list-questions').children().length!=='0'){
				// new lily.listQuestionsView(listQuestionsUnanswered);
			// }
	if(typeof(appQuestionPersonalView)!=='undefined'){
			appQuestionPersonalView.close();
			delete appQuestionPersonalView;
		}
		if(typeof(appQuestionView)!=='undefined'){
			appQuestionView.close();
			delete appQuestionView;
		}
		appQuestionUnansweredView = new lily.AppQuestionUnansweredView;
			var modelToDisplay = new lily.Question;
			modelToDisplay.url="/unanswered/get/"+id;
			modelToDisplay.fetch({async:false});
			questionFullView = new lily.QuestionUnansweredFullView({model : modelToDisplay});
		
		}
		else {
			app.navigate('unanswered',{trigger:true});
		}


	},
	

	spam : function () {

		/*****************************
		Creation new left side menu
		*****************************/	

		new lily.LeftMenuView();
		// $('.block-unanswered').find('.title-block-meter').addClass('active');
		$('#wrapper-answered').addClass('collapse');
		/********************************
		Creation new headerView
		***********************************/	
	
		/*Creation of the view which instantiate all the components of the header*/
		/*We create it only if there is not intantiated on this page*/
		// new lily.headerView();	
		$('.meter-spam-questions').addClass('active');

		//Creation of the lsit of questions sorted in spam category
		$('#list-questions').children().remove();
	

	},
	
	
	trash : function () {

		/*****************************
		Creation new left side menu
		*****************************/	

		new lily.LeftMenuView();
		$('.meter-trash-questions').addClass('active');	
		// $('.block-answered').find('.title-block-meter').addClass('active');
		$('#wrapper-unanswered').addClass('collapse');
		/********************************
		Creation new headerView
		***********************************/	
	
		/*Creation of the view which instantiate all the components of the header*/
		/*We create it only if there is not intantiated on this page*/
		// new lily.headerView();	

		//Creation of the lsit of questions sorted in spam category
		


	},
	
	questions_from_chat:function(){
	new lily.LeftMenuView();
	// $('.block-unanswered').find('.title-block-meter').addClass('active');
	$('.meter-live-chat-questions').addClass('active');
	$('#wrapper-answered').addClass('collapse');
	},
	synonyms: function () {

		/*****************************
		Creation new left side menu
		*****************************/	

		new lily.LeftMenuView();
		$('#nombre-questions').find('.active').removeClass('active');
		$('.meter-synonyms').addClass('active');
/*We collapse menu answered and menu unanswered*/
$('#wrapper-answered').addClass('collapse');
$('#wrapper-unanswered').addClass('collapse');
		/********************************
		Creation new headerView
		***********************************/	
		
		/*Creation of the view which instantiate all the components of the header*/
		/*We create it only if there is not intantiated on this page*/
		// new lily.headerView();	
		
		// $('#list-questions').children().remove();
	

	}

	

});//End ot router