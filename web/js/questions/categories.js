/******************************************************
URL pour la gestion des categories :
/categories/create/+idRedirectionAssociee
 /questions/categories/update/id/idRedirectionAssociée ,
/questions//categories/get ,
/questions/categories/delete/id
******************************************************/
/*Side left Menu*/
lily.Category = Backbone.Model.extend({

    initialize: function () {
        this.url = "/categories/" + this.id;
    },
});
/***********************************************
Collection Categories
*************************************************/
lily.listCategories = Backbone.Collection.extend({
    model: lily.Category,
    url: '/categories/get',
    intialize: function () {}
});
/***************************************************
View of one category item
*******************************************************/
lily.CategoryView = Backbone.View.extend({
    model: lily.Category,
    template: _.template($('#item-category').html()),
    tagName: 'li',
    // tagName: 'article',
    className: 'liste-categorie ',
    // className: 'liste-categorie media',
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));


        return this;
    },
    events: {
        'click .categorie': 'changeCategory',
        // 'click .intituleCategorie': 'recupererIdCategorie',
        'click .categorie-delete': 'deleteCategory',
        'click .category-item-list': 'filterQuestions',
    },
    filterQuestions: function (e) {
        idCategoryChangeDisplay = $(e.currentTarget).attr('data-id');
        var lengthInitial = categoriesToHide.length;
        categoriesToHide.add(listCategories.get(idCategoryChangeDisplay));
        /*Creation list questions filtered to dont change the initial list Questions */
        if (typeof (listQuestionsFiltered) == 'undefined') {
            listQuestionsFiltered = new lily.listQuestions();
            listQuestionsFiltered.fetch({
                async: false
            });
            /*Check if the criteriaComparator is true or false*/
        }
        /*First we filtered the list of Questions*/
        if (categoriesToHide.length > lengthInitial) {
            /*Category added to the list of categories to hide*/
            var j = 0;
            _.each(listQuestionsFiltered, function () {
                if (listQuestionsFiltered.models[j].get('category') != null) {
                    if (listQuestionsFiltered.models[j].get('category').id == idCategoryChangeDisplay) {
                        listQuestionsFiltered.remove(listQuestionsFiltered.models[j]);
                        j--;
                    }
                }
                j++;
            });
        } else {
            /*Categorie now have to be displayed !*/
            var k = 0;
            _.each(listQuestions, function () {
                if (listQuestions.models[k].get('category') !== null) {
                    if (listQuestions.models[k].get('category').id == idCategoryChangeDisplay) {
                        listQuestionsFiltered.add(listQuestions.models[k]);
                    }
                }
                k++;
            });

            /*Remove category to "categories to hide"*/
            categoriesToHide.remove(idCategoryChangeDisplay);
            lp = e;
        }


        /*After filter we display the list of the questions*/
        listQuestionsFilteredSorted = new lily.listQuestions;
        switch (criteriaComparator) {
/*The value of criteriaComparator gonna define the order of sort the collection of question*/
       case "category":
	   //TO DO
	   break;



	   case "title":
            if (sortedtitle) {
                listQuestionsFilteredSorted.comparator = "title";
                var k = 0;
                _.each(listQuestionsFiltered, function () {
                    listQuestionsFilteredSorted.add(listQuestionsFiltered.models[k]);
                    k++;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listQuestionsFilteredSorted);
            } else {
                console.log('2');
                listQuestionsFilteredSorted.comparator = "title";
                listToDisplay = new lily.listQuestions;
                var j=0;
				_.each(listQuestionsFiltered,function(){
				listQuestionsFilteredSorted.add(listQuestionsFiltered.models[j]);				
				j++;
				});
				var k = listQuestionsFilteredSorted.length - 1;
                _.each(listQuestionsFilteredSorted, function () {
                    listToDisplay.add(listQuestionsFilteredSorted.models[k]);
                    k--;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listToDisplay);
            }
            break;
			case "satisfaction":
			 if (sortedsatisfaction) {
                listQuestionsFilteredSorted.comparator = "satisfaction";
                var k = 0;
                _.each(listQuestionsFiltered, function () {
                    listQuestionsFilteredSorted.add(listQuestionsFiltered.models[k]);
                    k++;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listQuestionsFilteredSorted);
            } else {
                console.log('2');
                listQuestionsFilteredSorted.comparator = "satisfaction";
                listToDisplay = new lily.listQuestions;
                var j=0;
				_.each(listQuestionsFiltered,function(){
				listQuestionsFilteredSorted.add(listQuestionsFiltered.models[j]);				
				j++;
				});
				var k = listQuestionsFilteredSorted.length - 1;
                _.each(listQuestionsFilteredSorted, function () {
                    listToDisplay.add(listQuestionsFilteredSorted.models[k]);
                    k--;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listToDisplay);
            }
			break;
			
			case "requests":
			 if (sortedrequests) {
                listQuestionsFilteredSorted.comparator = "requests";
                var k = 0;
                _.each(listQuestionsFiltered, function () {
                    listQuestionsFilteredSorted.add(listQuestionsFiltered.models[k]);
                    k++;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listQuestionsFilteredSorted);
            } else {
                console.log('2');
                listQuestionsFilteredSorted.comparator = "requests";
                listToDisplay = new lily.listQuestions;
                var j=0;
				_.each(listQuestionsFiltered,function(){
				listQuestionsFilteredSorted.add(listQuestionsFiltered.models[j]);				
				j++;
				});
				var k = listQuestionsFilteredSorted.length - 1;
                _.each(listQuestionsFilteredSorted, function () {
                    listToDisplay.add(listQuestionsFilteredSorted.models[k]);
                    k--;
                });
                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listToDisplay);
            }
			break;
        case "date":
 if (sorteddate) {
 console.log("sorteddate "+sorteddate);
                listQuestionsFilteredSorted.comparator = "date";
                var k = 0;
                _.each(listQuestionsFiltered, function () {
                    listQuestionsFilteredSorted.add(listQuestionsFiltered.models[k]);
                    k++;
                });
                $('#liste-questions').children().remove();
				if(typeof(listQuestionsFilteredReverseView)!='undefined'){
				delete listQuestionsFilteredReverseView;				
				}
              listQuestionsFilteredView=  new lily.listQuestionsView(listQuestionsFilteredSorted);
            } else {
			console.log("sorteddate "+sorteddate);
                console.log('2');
                listQuestionsFilteredSorted.comparator = "date";
                listQuestionsFilteredSortedReverse = new lily.listQuestions;
                var j=0;
				_.each(listQuestionsFiltered,function(){
				listQuestionsFilteredSorted.add(listQuestionsFiltered.models[j]);				
				j++;
				});
				var k = listQuestionsFilteredSorted.length - 1;
                _.each(listQuestionsFilteredSorted, function () {
                    listQuestionsFilteredSortedReverse.add(listQuestionsFilteredSorted.models[k]);
                    k--;
                });
                $('#liste-questions').children().remove();
               listQuestionsFilteredReverseView = new lily.listQuestionsView(listQuestionsFilteredSortedReverse);
			   if(typeof(listQuestionsFilteredView)!='undefined'){
			   delete listQuestionsFilteredView;
			   }
            }
			break;




        } /*End of the switch*/




    },
    deleteCategory: function () {
        listCategories.remove(this.model);
        this.model.url = "/categories/delete/" + this.model.id
        Backbone.sync("delete", this.model);
        $('#liste-categories').children().remove();
        new lily.listCategoriesView(listCategories);

    },
    changeCategory: function () {
        if ((typeof (idCategoryDisplay) !== 'undefined') && (idCategoryDisplay == this.model.id)) {
            /*Popup already opened*/
            popupCategoryView.$el.children().remove();
            popupCategoryView.$el.attr('class', 'hide');
            idCategoryDisplay = 0;
        } else {
            /*Create a new popup, and destroyed the one already-opened*/

            $('#popup-categorie').children().remove();
            idCategoryDisplay = this.model.id;
            $('#popup-categorie').removeClass('hide');
            popupCategoryView = new lily.PopupCategoryView({
                model: this.model
            });
        }
    }


});
/***************************************************
View list of all Category in side left menu
*******************************************************/
lily.listCategoriesView = Backbone.View.extend({
    el: '#liste-categories',
    initialize: function (collectionCategorie) {
        // this.model.bind('change', this.displayCategory);
        this.collection = collectionCategorie;
        this.render();

        /*=========================================== 
Update list Categories	
	===============================================*/
        // this.listenTo(this.collection, 'add', this.displayCategory);
        // this.listenTo(this.collection, 'remove', this.displayCategory);
        // this.listenTo(this.collection, 'change', this.displayCategory);

    },
    render: function () {
        this.collection.each(function (item) {
            this.displayCategory(item);
        }, this);

    },
    displayCategory: function (item) {
        var categoryView = new lily.CategoryView({
            model: item
        });
        this.$el.append(categoryView.render().el);
    }

});
/***************************************************
Wrapper list Categories
*******************************************************/
lily.wrapperCategoriesView = Backbone.View.extend({
    el: '#wrapper-categories',
    template: _.template($('#wrapper-list-categories').html()),
    render: function () {
        this.$el.html(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click .add-category': 'addCategory',
		
    },
    addCategory: function (e) {
	console.log('addCategory');
	console.log($('#popup-categorie').children().length);
        if ($('#popup-categorie').children().length == 0) {
            $('#popup-categorie').removeClass('hide');
            popupCategoryView = new lily.PopupCategoryView({
                model: new lily.Category
            });

        } else {
            $('#popup-categorie').children().remove();
            $('#popup-categorie').addClass('hide');

        }
    e.stopImmediatePropagation();
	},
	
});
/*********************************************************
Button "hide categories", "display all categories"
************************************************************/
lily.buttonCategoriesView=Backbone.View.extend({
 el: '.content-left-side-menu',
    template: _.template($('#button-categories').html()),
    render: function () {
        this.$el.append(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        
		'click .hide-categories':'hideAllCategories',
		'click .display-categories':'displayAllCategories'
    },
hideAllCategories: function(){
	console.log('hideAllCategories');
	/*Add all categories to Categ*/
	var m=0;
	_.each(listCategories,function(){
	categoriesToHide.add(listCategories.models[m]);
	m++;
	});
	/*We hide circle colored in left side panel*/
	$('i.categorie').addClass('puce-categorie-cachee');
	/*Filtered new listQuestions displayed*/
	var listQuestionsWithoutCategories = new lily.listQuestions;
	listQuestionsWithoutCategories.comparator=criteriaComparator;
	switch(criteriaComparator){
		case "category":
	// TO DO
	break;
	case "title":
	var k=0;
	_.each(listQuestions,function(){
	if(listQuestions.models[k].get('category')==null){
	listQuestionsWithoutCategories.add(listQuestions.models[k]);
	}
	k++
	
	});
	
	if(sortedtitle){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsWithoutCategories);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsWithoutCategories.length-1;
	_.each(listQuestionsWithoutCategories,function(){
	listQuestionsAllCategories.add(listQuestionsWithoutCategories.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
	
		case "satisfaction":
	var k=0;
	_.each(listQuestions,function(){
	if(listQuestions.models.get('category')==null){
	listQuestionsWithoutCategories.add(listQuestions.models[k]);
	}
	k++;
	});

	if(sortedsatisfaction){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsWithoutCategories);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsWithoutCategories.length-1;
	_.each(listQuestionsWithoutCategories,function(){
	listQuestionsAllCategories.add(listQuestionsWithoutCategories.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
			case "requests":
	var k=0;
	_.each(listQuestions,function(){
	if(listQuestions.models[k].get('category')==null){
	listQuestionsWithoutCategories.add(listQuestions.models[k]);

	}
		k++
	});
	if(sortedrequests){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsWithoutCategories);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsWithoutCategories.length-1;
	_.each(listQuestionsWithoutCategories,function(){
	listQuestionsAllCategories.add(listQuestionsWithoutCategories.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
			case "date":
			console.log('date');
	var k=0;
	_.each(listQuestions,function(){
	if(listQuestions.models[k].get('category')==null){
	listQuestionsWithoutCategories.add(listQuestions.models[k]);
	}
	k++
	
	});
	if(sorteddate){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsWithoutCategories);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsWithoutCategories.length-1;
	_.each(listQuestionsWithoutCategories,function(){
	listQuestionsAllCategories.add(listQuestionsWithoutCategories.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
	
	
	}
listQuestionsFiltered=new lily.listQuestions;
var k =0;
_.each(listQuestions,function(){
if(listQuestions.models[k].get('category')==null){
listQuestionsFiltered.add(listQuestions.models[k]);
}
k++
});
	},
	displayAllCategories:function(){
	
	/***************************************
	Reset of the list listQuestionsFiltered
	**************************************/
	if(typeof(listQuestionsFiltered)!='undefined'){
		var m = 0;
		_.each(listQuestions,function(){
		listQuestionsFiltered.add(listQuestions.models[m]);
		m++;
		});
	}
	categoryToHide=new lily.listCategories;
	console.log('displayAllCategories');
	var listQuestionsIntermediaire = new lily.listQuestions();
	listQuestionsIntermediaire.comparator=criteriaComparator;
	/*We display all circles colored*/
	$('i.categorie').removeClass('puce-categorie-cachee');
	switch(criteriaComparator){
		case "category":
	// TO DO
	break;
	case "title":
	var k=0;
	_.each(listQuestions,function(){
	listQuestionsIntermediaire.add(listQuestions.models[k]);
	k++
	});
	if(sortedtitle){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsIntermediaire);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsIntermediaire.length-1;
	_.each(listQuestionsIntermediaire,function(){
	listQuestionsAllCategories.add(listQuestionsIntermediaire.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
	
		case "satisfaction":
	var k=0;
	_.each(listQuestions,function(){
	listQuestionsIntermediaire.add(listQuestions.models[k]);
	k++
	});
	if(sortedsatisfaction){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsIntermediaire);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsIntermediaire.length-1;
	_.each(listQuestionsIntermediaire,function(){
	listQuestionsAllCategories.add(listQuestionsIntermediaire.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
			case "requests":
	var k=0;
	_.each(listQuestions,function(){
	listQuestionsIntermediaire.add(listQuestions.models[k]);
	k++
	});
	if(sortedrequests){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsIntermediaire);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsIntermediaire.length-1;
	_.each(listQuestionsIntermediaire,function(){
	listQuestionsAllCategories.add(listQuestionsIntermediaire.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
			case "date":
			console.log('date');
	var k=0;
	_.each(listQuestions,function(){
	listQuestionsIntermediaire.add(listQuestions.models[k]);
	k++
	});
	if(sorteddate){
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsIntermediaire);
	} else {
	var listQuestionsAllCategories = new lily.listQuestions;
	var k = listQuestionsIntermediaire.length-1;
	_.each(listQuestionsIntermediaire,function(){
	listQuestionsAllCategories.add(listQuestionsIntermediaire.models[k]);
	k--;
	})
	$('#liste-questions').children().remove();
	new lily.listQuestionsView(listQuestionsAllCategories);	
	}
	break;
	
	
	}
	
	}
});


/******************************************************************
Wrapper Popup Categorie
*********************************************************************/
lily.PopupCategoryView = Backbone.View.extend({
    model: lily.Category,
    el: '#popup-categorie',
    template: _.template($('#creation-category').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        var modelDisplayed = this.model;
        this.render();

        /*Creation Squares of color to representate categories*/
        new lily.listSquareColoredView();
        $('.' + this.model.get('color')).addClass('active');
        /*Creation list of redirections*/
        listRedirections = new lily.listRedirections;
        listRedirections.fetch({
            success: function () {
                new lily.listRedirectionsView(listRedirections);
                if (typeof (modelDisplayed.get('redirection')) !== 'undefined') {
                    $('.liste-redirection.' + modelDisplayed.get('redirection').id).parent().addClass('active');
                }
            }
        });



    },
    events: {
        'click .saveCategory ': 'saveCategory',
        'click .cancelCategory': 'cancelCategory',
        'click .updateCategory': 'updateCategory',
    },
    saveCategory: function (e) {
        if ($('#popup-categorie').find('.nouveau-titre').val().length > 0) {
            var category = new lily.Category();
            category.set({
                title: $('#popup-categorie').find('.nouveau-titre').val()
            });
            if (typeof (color) != 'undefined') {
                category.set({
                    color: color
                });
            } else {
                category.set({
                    color: "bbb9b9" 
                });
            }
            if (typeof (idRedirection) == 'undefined') {
                idRedirection = listRedirections.models[0].id;
            }
            category.url = "/categories/create/" + idRedirection;
            listCategories.add(category);
            $('#liste-categories').children().remove();
            category.save(null, {
                async: false
            });
            new lily.listCategoriesView(listCategories);
            delete color;
            delete idRedirection;
        } else {
            alert('Veuillez donner un titre à la nouvelle categorie');
        }
		$('#popup-categorie').children().remove();
        $('#popup-categorie').removeClass('show').addClass('hide');;
        e.stopImmediatePropagation();
    },
    cancelCategory: function (e) {

        $('#popup-categorie').children().remove(); //Destroy the view
        popupCategoryView.$el.removeClass('show');
        idCategoryDisplay = 0;
        delete color;
        delete idRedirection;
        $('#popup-categorie').addClass('hide');
        e.stopImmediatePropagation();
    },
    updateCategory: function (e) {
        var category = new lily.Category;
        category.set({
            title: $('#popup-categorie').find('input.nouveau-titre').val()
        });
        if (typeof (color) !== 'undefined') {
            category.set({
                color: color
            });
        } else {
            category.set({
                color: this.model.get('color')
            });
        }
        if (typeof (idRedirection) == 'undefined') {
            idRedirection = this.model.get('redirection').id;
        }

        category.url = "/categories/update/" + this.model.id + "/" + idRedirection;
        Backbone.sync('update', category, {
            success: function () {
                popupCategoryView.$el.children().remove();
                popupCategoryView.$el.attr('class', 'hide');
                delete color; //unassign global variable color
                delete idRedirection;
            listCategories=new lily.listCategories;
		listCategories.fetch({async:false});
				$('#liste-categories').children().remove();
		new lily.listCategoriesView(listCategories);
		$('#liste-questions').children().remove();
		var listQuestions= new lily.listQuestions;
		


		new lily.listQuestionsView(listQuestions.refreshQuestions());
		}});
		
			// }
        // });
		// var listQuestions
		console.log('222');
		
		
		
		
		
        e.stopImmediatePropagation();
    }


});
/************************************************************************
Square colored model
*************************************************************************/
lily.squareColored = Backbone.Model.extend({

});
/************************************************************************
Collection of colored squares model
*************************************************************************/
lily.listSquareColored = Backbone.Collection.extend({
    model: lily.squareColored,
});
/********************************************************************************
View for one square colored
********************************************************************************/
lily.squareColoredView = Backbone.View.extend({
    model: lily.squareColored,
    template: _.template($('#square-colored-category').html()),

    tagName: 'li',
    className: 'category-color',

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .square-colored': 'chooseColor',

    },
    chooseColor: function () {

        color = this.model.attributes.color;

        $('.square-colored').removeClass('active');
        this.$el.children().addClass('active');


    }

});
/********************************************************************************
View for the lsit of 10 colored squares
********************************************************************************/
lily.listSquareColoredView = Backbone.View.extend({
    el: '#list-squares-colored',

    initialize: function () {
        var liste_colors = [{
            titre: 'color 1',
            color: 'ee5a5a'
        }, {
            titre: 'color 2',
            color: 'feae2f'
        }, {
            titre: 'color 3',
            color: 'fee8a4'
        }, {
            titre: 'color 4',
            color: 'fff32e'
        }, {
            titre: 'color 5',
            color: 'd0ff2e'
        }, {
            titre: 'color 6',
            color: '62db27'
        }, {
            titre: 'color 7',
            color: '539785'
        }, {
            titre: 'color 8',
            color: '66fff6'
        }, {
            titre: 'color 9',
            color: '21d0ce'
        }, {
            titre: 'color 10',
            color: '2184d0'
        }, {
            titre: 'color 11',
            color: '0a48a4'
        }, {
            titre: 'color 12',
            color: '1c006b'
        }, {
            titre: 'color 13',
            color: '8f00b3'
        }, {
            titre: 'color 14',
            color: 'db05d9'
        }, {
            titre: 'color 15',
            color: 'fe9df6'
        }, {
            titre: 'color 16',
            color: 'fe14ae'
        }, {
            titre: 'color 17',
            color: 'ba1c50'
        }, {
            titre: 'light-grey',
            color: 'c3c3c3'
        }, {
            titre: 'dark-grey',
            color: '696969'
        }, {
            titre: 'black 20',
            color: '000000'
        }];
        listColors = new lily.listSquareColored(liste_colors);
        this.collection = listColors;
        this.render();



    },
    render: function () {
        this.collection.each(function (item) {
            this.affichagecolorCategorie(item);
        }, this);

    },
    affichagecolorCategorie: function (item) {
        var categorieVue = new lily.squareColoredView({
            model: item
        });
        this.$el.append(categorieVue.render().el);

    }

});
/*******************************************************************************************************************************************
Redirection Model
*******************************************************************************************************************************************/
lily.Redirection = Backbone.Model.extend({});
/*******************************************************************************************************************************************
Collection Redirections 
*******************************************************************************************************************************************/
lily.listRedirections = Backbone.Collection.extend({
    model: lily.Redirection,
    url: redirections + '/rest',
});
/*******************************************************************************
View for one item category
********************************************************************************/
lily.listRedirectionsView = Backbone.View.extend({
    el: 'ul.contenant-redirection',
    initialize: function (listRedirections) {
        this.model.bind('change', this.displayRedirection);
        this.collection = listRedirections;
        this.render();
        /*Update automatically view	*/
        this.listenTo(this.collection, 'add', this.displayRedirection);
        this.listenTo(this.collection, 'update', this.displayRedirection);
        this.listenTo(this.collection, 'change', this.displayRedirection);
    },
    render: function () {
        this.collection.each(function (item) {
            this.displayRedirection(item);
        }, this);
    },
    displayRedirection: function (item) {
        var redirectionView = new lily.RedirectionView({
            model: item
        });
        this.$el.append(redirectionView.render().el);
    }
});

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
    },
});


/*=============================================================================
Item category-redirection in side right panel of full question View
=============================================================================*/
lily.CategoryRedirectionView = Backbone.View.extend({
    model: lily.Category,
    template: _.template($('#category-redirection').html()),
    tagName: 'li',
    className: 'wrapper-category-redirection',

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .intituleCategorie': 'activateCategory'

    },
    activateCategory: function () {


        /*Reset of preview category-redirection checked*/
        $('#list-categories-redirections').find('.icon-check').attr('class', 'unchecked-categorie');
        this.$el.find('.unchecked-categorie').attr('class', 'icon-check');
        categoryChoosen = this.model.get('id');
    }
});
/*=============================================================================
Collection category-redirection in side right panel of full question View
=============================================================================*/

lily.listCategoriesRedirectionsView = Backbone.View.extend({
    el: '#list-categories-redirections',
    initialize: function () {
        this.collection = listCategories;
        this.render();
        /*Update automatically view	*/
        this.listenTo(this.collection, 'add', this.displayCategoryRedirection);
        this.listenTo(this.collection, 'update', this.displayCategoryRedirection);
        this.listenTo(this.collection, 'change', this.displayCategoryRedirection);
    },
    render: function () {

        this.collection.each(function (item) {
            this.displayCategoryRedirection(item);
        }, this);
    },
    displayCategoryRedirection: function (item) {
        var categoryredirectionView = new lily.CategoryRedirectionView({
            model: item
        });
        this.$el.append(categoryredirectionView.render().el);
    }

});


/***********************************************************
Global variables
***********************************************************/
categoriesToHide = new lily.listCategories();




