/*************************************
View the full personal question on the right side panel
*************************************/
lily.QuestionUnansweredFullView = Backbone.View.extend({
    model: lily.Question, 
    // el: '#question-content',
    
	classeAttente:'0',
    template: _.template($('#full-unanswered-question').html()),
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function() {
	questionFull = this;
        this.render();
		$('#question-content').prepend(this.el);
		$('#question-content').removeClass('hide');
        if (typeof(this.model.id) !== 'undefined') {
            this.displayArborescence();
        }
        this.$el.removeClass('hide');
        // $('.logo-display').addClass('logo-mood' + this.model.get('mood'));
		if(typeof(this.model.get('mood'))!=='undefined'){
			if (this.model.get('mood').length>'0') {
				$('.select-mood').find('i').addClass('icon-'+this.model.get('mood'));
			} else {
			//Utile que parce qu'il y a des humeurs vides
			$('.select-mood').find('i').addClass('icon-neutral');
			}
		} else {
		$('.select-mood').find('i').addClass('icon-neutral');
		}
	/*creation of the category choosen view*/
	if((typeof(this.model.get('category'))!=='undefined')&&(this.model.get('category')!==null)){
		if(this.model.get('category')!=null){
		var categoryChoosen = new lily.Category;
		categoryChoosen.set({title:this.model.get('category').title});
		categoryChoosen.set({id:this.model.get('category').id});
		categoryChoosen.set({color:this.model.get('category').color});
		categoryChoosen.set({parent:this.model.get('category').parent});
		new lily.CategoryChoosenView({model : categoryChoosen});
		$('#category').addClass('hide');
		$('#wrapper-category-choosen').removeClass('hide');
		}
	}
	/*************************************
	Needed to display in fixed position the input    
	 *************************************/
	 // $('.wrapper-categories').offset({left:($('#question-content').offset().left+'15')}) 
	$('.wrapper-categories').width($('#question-content').width()-'30');
	$( window ).resize(function(){
	 $('.wrapper-categories').width($('#question-content').width()-'30');
	 });
    /*yes, i am ashamed to do this like that*/
	},
    events: {
		'click .button-action': 'addAction',
		'click .button-add-answer': 'addAnswer',
		'click .button-precision': 'addPrecision',
        'click .question-parent': 'addClassDelete',
		'click .button-delete': 'deleteElement',
        'click .button-save': 'saveQuestion',
        'click .button-update': 'updateQuestion',
        'click .button-cancel': 'closePanelRight',
        'click .select-mood': 'createMood',
        'keydown #category': 'displayCategories',
		// 'blur #category' :'destroyListCategories',
    },

		addAction: function(e) {
        new lily.ActionView({
            model: new lily.Question
        });
        e.stopImmediatePropagation(); 
    },
		
		addAnswer: function(e) {
			if ($('.wrapper-answer.active').children().length < 1) {
				new lily.AnswerView({
					model: new lily.Question
				});
				e.stopImmediatePropagation();
			}
		},
		
		addPrecision: function(e) {
        new lily.PrecisionView({
            model: new lily.Question
        });
        e.stopImmediatePropagation();
    },
	
		addClassDelete: function(e) {
			$(e.delegateTarget).find('.toDelete').removeClass('toDelete');
			$(e.currentTarget).parent().parent().addClass('toDelete');
    },
		
		closePanelRight: function(e) {
		$(window).unbind('resize');
		questionFullView.remove();
		$('#question-content').addClass('hide');
		if(typeof(questionFullView.model.id)!=='undefined'){
				app.navigate('unanswered',{trigger:true});
		}
		
      
    },
		
		displayArborescence: function() {
        // console.log('displayArborescence');
        modelDisplay = this.model;
        arborescenceToDisplay = this;
        if (typeof(modelDisplay.get('children')) !== "undefined") {
            if (modelDisplay.get('children').length == 0) {
                /*Case simple question*/
                var answer = new lily.Question;
                answer.set({
                    title: modelDisplay.get('answer')
                });
                new lily.AnswerView({
                    model: answer
                });

            } else {
                /*Case question complex*/
                var precision = new lily.Question;
                precision.set({
                    title: modelDisplay.get('answer')
                });
                new lily.PrecisionView({
                    model: precision
                });

                var childrenToDisplay = this.model.get('children'); //PASSER EN LOCAL
                var k = 0;
                _.each(childrenToDisplay, function() {
                    if (childrenToDisplay[k].children.length == 0) {
                        arborescenceToDisplay.displayAnswer(childrenToDisplay[k]);
                    } else {
                        arborescenceToDisplay.displayPrecision(childrenToDisplay[k]);

                    }
                    k++;
                });
            }
        }
    },
	
		displayAnswer: function(object) {

       var  actionToDisplay = new lily.Question;
        actionToDisplay.set({
            title: object.title
        });
        actionToDisplay.set({
            id: object.id
        });

        new lily.ActionView({
            model: actionToDisplay
        });

        if (object.answer != null) {
            var answerToDisplay = new lily.Question;
            answerToDisplay.set({
                title: object.answer
            });
            new lily.AnswerView({
                model: answerToDisplay
            });
        }



    },
		
		displayPrecision: function(precision) {
        this.classeAttente++;
        // n_precision = precision;
        // $('.wrapper-precision.active').removeClass('active');
        // $('.wrapper-actions.active').addClass(JSON.stringify(classeAttente));

        var actionToDisplay = new lily.Question;
        actionToDisplay.set({
            title: precision.title
        });
        actionToDisplay.set({
            id: precision.id
        });

        var actionView = new lily.ActionView({
            model: actionToDisplay
        });
        actionView.$el.addClass('wrapper-' + JSON.stringify(this.classeAttente));
        var precisionToDisplay = new lily.Question;
        precisionToDisplay.set({
            title: precision.answer
        });
        new lily.PrecisionView({
            model: precisionToDisplay
        });
        var children = precision.children;

        var k = 0;
        _.each(children, function() {
            if (children[k].children.length == '0') {

                arborescenceToDisplay.displayAnswer(children[k]);
            } else {
                arborescenceToDisplay.displayPrecision(children[k]);
            }
            k++;
        });

        $('.wrapper-actions.active').removeClass('active');

        $('.wrapper-' + JSON.stringify(this.classeAttente)).addClass('active');
        this.classeAttente--;
        // actionVue.$el.parent().parent().parent().parent().addClass('active');
        // parent_test = actionVue.$el.parent().parent().parent().parent();
    },

		deleteElement: function(e) {
		/*Fonction à réorganiser quand elle sera finie*/
		//We delete an answer
			if($('.toDelete').parent().attr('id')=="wrapper-tree-answers"){
				console.log('supprimer une question');
				var modelToDelete = new lily.Question;
				modelToDelete.url="/delete/"+$('.toDelete').attr('data-id');
				Backbone.sync('delete',modelToDelete);
			} else if($('.toDelete').attr('class').search('content-answer')>0){
				console.log('delete answer');
			if($('.toDelete').parent().parent().attr('data-id')>0){//send delete request if model saved in base
				var modelToUpdate = new lily.Question;
				modelToUpdate.set({answer:null});
				if($('.category-choosen').length>0){
				var idCategory = $('.category-choosen').attr('data-id');
				} else{
				var idCategory = "NULL";
				} 
				var idModel = $('.toDelete').parent().parent().attr('data-id');
				if($('.toDelete').parent().parent().parent().attr('id')=="wrapper-tree-answers"){
					var idParent = "NULL";
				} else {
					var idParent = $('.toDelete').parent().parent().attr('data-id')
				}
				modelToUpdate.set({mood:$('.toDelete').parent().parent().find('.select-mood').children('i').attr('data-name')});
				if($('.toDelete').parent().parent().find('.wrapper-title'.length>0)){
				 modelToUpdate.set({title:$('.toDelete').parent().parent().find('.question-parent').val()});
				} else {
					modelToUpdate.set({title:$('.toDelete').parent().parent().find('.content-action').val()});
				}
				modelToUpdate.url="/update/"+idModel+"/"+idParent+"/"+idCategory;
				Backbone.sync('update',modelToUpdate);
			}
			$('.toDelete').remove();
			/*end delete answer*/
		}	else if($('.toDelete').attr('class').search('wrapper-action')>=0){
			console.log('delete aciton');
		/*we delete an action*/
			if($('.toDelete').attr('data-id')!=="NULL"){ 
			console.log('ee');
				var modelToDelete = new lily.Question;
				modelToDelete.url="/delete/"+$('.toDelete').attr('data-id');
				// modelToDelete.destroy();
				Backbone.sync('delete',modelToDelete);
			}
			$('.toDelete').remove();
		/*end delete action*/
		} else if($('.toDelete').attr('class').search('wrapper-precision')){
		/*delete precision*/
		console.log('delete precision');
		/*delete children saved in base*/
		var listChildrenToDelete = $('.toDelete').children('ol').children('li');
		var k = 0;
		_.each(listChildrenToDelete,function(){
			var modelToDelete = new lily.Question;
			modelToDelete.url="/delete/"+$($('.toDelete').children('ol').children('li')[k]).attr('data-id')
			if($($('.toDelete').children('ol').children('li')[k]).attr('data-id')!=="NULL"){
				Backbone.sync('delete',modelToDelete);
			}
			k++
		});
		
		/*end delete children*/
		/*start delete precision*/
		var modelToUpdate = new lily.Question;
				modelToUpdate.set({answer:null});
				if($('.category-choosen').length>0){
				var idCategory = $('.category-choosen').attr('data-id');
				} else{
				var idCategory = "NULL";
				}
				var idModel = $('.toDelete').parent().parent().attr('data-id');
				if($('.toDelete').parent().parent().parent().attr('id')=="wrapper-tree-answers"){
					var idParent = "NULL";
				} else {
					var idParent = $('.toDelete').parent().parent().attr('data-id')
				}
				modelToUpdate.url="/update/"+idModel+"/"+idParent+"/"+idCategory;
				
				// modelToUpdate.save('answer');
				$('.toDelete').remove();
			}
		/*end delete precision*/
		},
			
		saveQuestion: function(e) {
        console.log('saveQuestion');
        adress = Backbone.history.fragment;
        var itemToSave = $('#wrapper-tree-answers');
         //needed to use the loop savePrecision/saveAnswer
        if ($('#questions-enfants').children().children('ol').length == '0') {
            // /*Case answer*/
            questionFull.saveAnswer(e, itemToSave);
        } else if ($('#questions-enfants').children().children('ol').length > 0) {
            // /*Case precision*/
            questionFull.savePrecision(e, itemToSave);
        } else {
            console.log('on a un problème');
        }
        /*Hide right side panel*/
        // $('#question-content').children().remove();
        // $('#question-content').addClass('hide');
        // if (adress == "") {
            // $('#liste-questions').children().remove();
            // criteriaComparator = "date";
            // listQuestions = new lily.listQuestions;
            // listQuestions.comparator = criteriaComparator;
            // listQuestionsIntermediair = new lily.listQuestions;
            // listQuestions.fetch({
                // success: function() {
                    // var k = listQuestions.length - 1;
                    // _.each(listQuestions, function() {
                        // listQuestionsIntermediair.add(listQuestions.models[k]);
                        // k--;

                    // });
                    // new lily.listQuestionsView(listQuestionsIntermediair);
                    // $('#nombre-questions').children().remove();
                    // new lily.meterView();
                // }

            // });
            // break;
            // case "unanswered":
        // } else if (adress == "unanswered") {
            // var modelDelete = new lily.QuestionUnanswered;
            // modelDelete.url = "/unanswered/delete/" + idQuestionDisplay;
            // Backbone.sync('delete', modelDelete);
            // $('#nombre-questions').children().remove();
            // new lily.meterView();
            // $('#nbQuestions').removeClass('active');
            // $('#nbQuestionsUnanswered').addClass('active');
            // $('#liste-questions').children().remove();
            // new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
            // break;
            // case "personal":
        // } else if (adress == "personal") {
            // /*A FAIRE*/
            // break;
        // }
        // categoryChoosen = "NULL";
        // app.navigate(adress);
        // delete questionFull;
    },
	
		saveAnswer: function(e, item) {
        console.log('saveAnswer');
        var questionSimple = new lily.Question;
        if (item.find('.content-action').length > 0) {
            questionSimple.set({
                title: item.find('.content-action').val()
            });
        } else {
            questionSimple.set({ /*Case of the master's question*/
                title: item.find('.question-parent').val()
            });

        }
        questionSimple.set({
            answer: item.find('textarea').val()
        });
        if (typeof($('.category-choosen').attr('data-id')) == 'undefined') {
           var categoryChoosen = "NULL";
        } else {
		var categoryChoosen=$('.category-choosen').attr('data-id');
		
		}
        /*Definir idParent en le mettant en data-idParent*/
        if (item.attr('id') === 'wrapper-tree-answers') {
           var idParent = "NULL";
			console.log('A');
        } else {
        var    idParent = item.parent().parent().parent().parent().attr('data-id');
			console.log('B');
        }
			var moodChoosen = $(item.find('.select-mood')[0]).children('i').attr('data-name')
        questionSimple.set({
            mood: moodChoosen
        });
        // al = Backbone.history.fragment;
        // console.log('fragment '+al);

            questionSimple.url = "/create/" + categoryChoosen + "/" + idParent;
        
        // questionSimple.url = "/create/" + categoryChoosen + "/" + idParent;

        if (questionSimple.get('title').length > 0) {
            questionSimple.save(null, {
                async: false
            });
			var modelToDelete = new lily.Question;
			modelToDelete.url="/unanswered/delete/"+questionFullView.model.id;
			Backbone.sync('delete',modelToDelete);
        } else {
            alert('Veuillez saisir un title à votre réponse');
        }
        e.stopImmediatePropagation();

    },
  
		savePrecision: function(e, item) {
		lop = item;
        var precision = new lily.Question;
        precision.set({
            title: $(item.find('input')[0]).val()
        });
        precision.set({
            answer: $(item.find('.content-precision')[0]).val()
        });
        /*Category*/
        if (typeof(categoryChoosen) == 'undefined') {
            categoryChoosen = "NULL";
        }
        /*Definir idParent en le mettant en data-idParent*/
       var  idParent = item.parent().parent().parent().parent().attr('data-id');
        if (typeof(idParent) == 'undefined') {
            idParent = "NULL";
        }
        if (typeof(moodChoosen) == 'undefined') {
            moodChoosen = "neutral";
        }
        precision.set({
            mood: moodChoosen
        });
        if (Backbone.history.fragment == 'personal') {
            precision.url = "/personal/create";
        } else {
            precision.url = "/create/" + categoryChoosen + "/" + idParent;
        }

        // precision.url = "/create/" + categoryChoosen + "/" + idParent;
        precision.save(null, {
            async: false
        });

        if (item.attr('id') == 'wrapper-tree-answers') {
            item.children().attr('data-id', precision.id);
        } else {
            item.attr('data-id', precision.id);
        }
        var listChildren = $(item.find('.wrapper-actions')[0]).children(); //Compulsory  let this variable in local !
        var k = 0;

        _.each(listChildren, function() {
            if ($($($(listChildren)[k]).find('.wrapper-precision.wrapper-answer')[0]).find('.wrapper-actions').length > 0) {
                /*if (typeof(questionFull) == 'undefined') {
                    questionFull = this;
                }*/
                questionFull.savePrecision(e, $(listChildren[k]));
                k++;
            } else {

                questionFull.saveAnswer(e, $(listChildren[k]));
                k++;
            }

        });
        // e.stopImmediatePropagation();
    },
 
		updateQuestion: function(e) {
		console.log('updateQuestion');
        var questionToUpdate = this;
        /*On met à jour la question initiale, quoiqu'il arrive*/
        var modelToUpdate = new lily.Question;
		if($('.category-choosen').length>0){
			var categoryChoosen=$('.category-choosen').attr('data-id');
		} else {
			var categoryChoosen="NULL";
		}
        this.model.set({
            title: $('#wrapper-tree-answers').find('.question-parent').val()
        });
        if ($('#questions-enfants').children().length>0) {
            // if ($('#questions-enfants').children().children('.dd3-content').length > 0) {
                this.model.set({
                    answer: $('#questions-enfants').find('.value-save')[0].value
                });
            // } 
        }

		var item = $('.toUpdate');
        var moodChoosen = $(item).find('.select-mood').children('i').attr('data-name')
        this.model.set({
            mood: moodChoosen
        });
        this.model.url = "/update/" + modelDisplay.id + "/NULL/" + categoryChoosen;
        // this.model.save(null,{async:false});       
        this.model.save(null, {
            async: false
        });
		$(item).removeClass('toUpdate');
        /*Update children issue*/
       var listToUpdate = $('.toUpdate');
        var k = 0;
        _.each(listToUpdate, function() {
            listToUpdate = $('.toUpdate');
            if (listToUpdate.length > 0) {
                /*update question already existing*/
                if ($($('.toUpdate')[k]).attr('data-id') !== "NULL") {
                    modeltoUpdate = new lily.Question;
                    if (typeof($(listToUpdate[k]).find('.content-action')[0]) !== 'undefined') {
                        modeltoUpdate.set({
                            title: $(listToUpdate[k]).find('.content-action')[0].value
                        });
                    } else {
                        modeltoUpdate.set({
                            title: $(listToUpdate[0]).find('.edit-reponse-content').val()
                        });
                    }
                    if (typeof($(listToUpdate[k]).find('.content-precision')[0]) !== 'undefined') {
                        modeltoUpdate.set({
                            answer: $(listToUpdate[k]).find('.content-precision')[0].value
                        });
                    } else {
                        modeltoUpdate.set({
                            answer: $(listToUpdate[0]).find('.edit-reponse-content').val()
                        });
                    }
                    var idToUpdate = $(listToUpdate[k]).attr('data-id');
                    var idParentToUpdate = $(listToUpdate[k]).parent().parent().parent().parent().attr('data-id');
                    modeltoUpdate.set({
                        mood: moodChoosen
                    });
                    modeltoUpdate.url = "/update/" + idToUpdate + "/" + idParentToUpdate + "/" + categoryChoosen;
                    Backbone.sync('update', modeltoUpdate);
                } else {
                    // console.log('on ajoute une nouvelle question');
                    /*Add new model to existing question*/
                    /*/questions/create/{category}/{idParent}*/
                    var modelToSave = new lily.Question;
                    var contentToSave = $('.toUpdate');
                    $(contentToSave).find('.toUpdate').removeClass('toUpdate');
                    /*Test if simple question or question comple with precision*/
                    if (contentToSave.children('ol').children().children('ol').children().length == '0') {
                        questionToUpdate.saveAnswer(e, contentToSave);
                    } else {
                        questionToUpdate.savePrecision(e, contentToSave);
                    }




                }
                $(listToUpdate[0]).removeClass('toUpdate');
            }
            // }


        });

        var setChildren = new lily.Question;
        var idQuestionDisplay = this.model.id;
        setChildren.url = "/" + idQuestionDisplay + "/versions/setchildren";
        Backbone.sync('update', setChildren);
        /*Refresh listQuestionsFiltered, removing old model, and adding new one*/
        // var list = new lily.ListQuestions;
        // list.comparator = "date";
        // list.fetch({
            // async: false
        // });


        // delete moodChoosen;
        // idQuestionDisplay = 0;
        // $('#question-content').children().remove();
        // $('#question-content').addClass('hide');
        // $('#liste-questions').children().remove();
        // var listReverse = new lily.listQuestions;
        // var m = list.length - 1;
        // _.each(list, function() {
            // listReverse.add(list.models[m]);
            // m--;
        // });
        // new lily.listQuestionsView(listReverse);
        // delete categoryChoosen;


        e.preventDefault();

    },
   
		createMood: function(e) {
        /*Creation of the list of moods*/
        $('.list-moods').children().remove();
        $('.list-moods.active').removeClass('active');
        $(e.currentTarget).parent().children('.list-moods').addClass('active');
        new lily.ListMoodsView();
        /*We had active class on the button, to know which*/
        $('.select-mood.active').removeClass('active');
        $(e.currentTarget).addClass('active');
    },
  
		displayCategories: function(e) {
        var val = $(e.currentTarget).val();
        var pattern = new RegExp(val, "i")
        // console.log(e.keyCode);
        if ((e.keyCode === '8') && (val.length == '1')) {
            // console.log('a');
            if (typeof(listCategoriesDisplayedView) !== 'undefined') {
                listCategoriesDisplayedView.$el.empty();
                listCategoriesDisplayedView.undelegateEvents();
            }
        }

        /*case input is not empty*/
        if (val.length > 0) {
            var listToDisplay = new lily.ListCategories;
            var l = 0;
            app.listCategories.each(function(item) {
                if (pattern.test(item.get('title'))) {
                    listToDisplay.add(item)
                }
            });

            if (typeof(listCategoriesDisplayedView) !== 'undefined') {
                listCategoriesDisplayedView.$el.empty();
                listCategoriesDisplayedView.undelegateEvents();
            }
            listCategoriesDisplayedView = new lily.ListCategoriesDisplayedView(listToDisplay)
        } else if (val.length == '0') {
            /*case input is empty*/
            if (typeof(listCategoriesDisplayedView) !== 'undefined') {
                listCategoriesDisplayedView.$el.empty();
                listCategoriesDisplayedView.undelegateEvents();
            }
        }
    },

	
/*Régler le bug : supprime l'event sur le clic d'une category display*/	
// destroyListCategories:function(){
		// if(typeof(listCategoriesDisplayedView)!=='undefined'){
			// listCategoriesDisplayedView.undelegateEvents();
			// listCategoriesDisplayedView.unbind();
			// listCategoriesDisplayedView.$el.empty();	
		// }
	// }


});
