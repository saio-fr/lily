/*Main script for Questions*/
$.ajaxPrefilter(function (options) {
    /*Test if redirection or other model*/
    if (options.url !== redirections + "/rest") {
        options.url = root + options.url;
    }
});
var lily = lily || {};

/*============================================================
HEADER
============================================================*/

/****************************
View to Display Header of list Questions, with answers
*************************************/
lily.HeaderView = Backbone.View.extend({
    el: '#wrapper-header-list-questions',
    template: _.template($('#header-list-questions').html()),
    render: function () {
        this.$el.html(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click #header-question-satisfaction': 'sortCollection',
        'click #header-question-title': 'sortCollection',
        'click #header-question-requests': 'sortCollection',
        'click #header-question-date': 'sortCollection',
        'click .colonne-category': 'sortCategories',

    },
    sortCollection: function (e) {
        /*Sort Collection according to criteria of comparation. Special Case for categorys in an other function*/
        criteriaComparator = $(e.currentTarget).attr('id').replace('header-question-', '');
        $('.arrow-sort').removeClass('active');
        $('#header-question-' + criteriaComparator).find('.arrow-sort').addClass('active');
        var listQuestionSatisfaction = new lily.listQuestions;
        $('#liste-questions').children().remove();
        /*Use of boolean test, to know if we sort a collection, or reverse sort*/
        switch (criteriaComparator) {
        case "title":
            sortedtitle = !sortedtitle;
            if (sortedtitle) {
                console.log('1');
                // /*Test if listQuestions displayed is the initial list or if it is the filtered list*/		
                new lily.listQuestionsView(listQuestionSatisfaction.classicalComparator(criteriaComparator));
                $('#header-question-' + criteriaComparator).find('.arrow-sort').removeClass('active');
            } else {
                console.log('2');
                new lily.listQuestionsView(listQuestionSatisfaction.reverseComparator(criteriaComparator));
            }
            break;
        case "satisfaction":

            sortedsatisfaction = !sortedsatisfaction;
            if (sortedsatisfaction) {
                new lily.listQuestionsView(listQuestionSatisfaction.classicalComparator(criteriaComparator));
                $('#header-question-' + criteriaComparator).find('.arrow-sort').removeClass('active');
            } else {
                new lily.listQuestionsView(listQuestionSatisfaction.reverseComparator(criteriaComparator));

            }

            break;
        case "requests":

            sortedrequests = !sortedrequests;
            if (sortedrequests) {
                new lily.listQuestionsView(listQuestionSatisfaction.classicalComparator(criteriaComparator));
                $('#header-question-' + criteriaComparator).find('.arrow-sort').removeClass('active');
            } else {
                new lily.listQuestionsView(listQuestionSatisfaction.reverseComparator(criteriaComparator));

            }
            break;
        case "redirections":

            sortedredirections = !sortedredirections;
            if (sortedredirections) {
                new lily.listQuestionsView(listQuestionSatisfaction.classicalComparator(criteriaComparator));
                $('#header-question-' + criteriaComparator).find('.arrow-sort').removeClass('active');
            } else {
                new lily.listQuestionsView(listQuestionSatisfaction.reverseComparator(criteriaComparator));

            }

            break;
        case "date":

            sorteddate = !sorteddate;
            if (sorteddate) {
                new lily.listQuestionsView(listQuestionSatisfaction.classicalComparator(criteriaComparator));
                $('#header-question-' + criteriaComparator).find('.arrow-sort').removeClass('active');
            } else {
                new lily.listQuestionsView(listQuestionSatisfaction.reverseComparator(criteriaComparator));

            }

            break;
        }




    },
    sortCategories: function () {
	console.log('888');
        $('.arrow-sort').removeClass('active');
        var listQuestionsIntermediair = new lily.listQuestions();
        var listQuestionsDiplay = new lily.listQuestions();


        listQuestionsIntermediair.fetch({
            success: function () {
                var i = 0;
                _.each(listQuestionsIntermediair, function () {
                    if (listQuestionsIntermediair.models[i].get('category') == null) {
                        listQuestionsIntermediair.models[i].set({
                            'category': new Array()
                        });

                        listQuestionsIntermediair.models[i].get('category').color = null;
                    }
                    listQuestionsIntermediair.models[i].set({
                        'title_category': listQuestionsIntermediair.models[i].get('category').title
                    });

                    i++;
                });
                var listSorted = listQuestionsIntermediair.sortBy('title_category');
                //listQuestionsDiplay
                /*Selon la valeur de classementCategorie on les questions dans l'ordre alphabetique, ou antealphabetique de leurs categorys*/
                if (sortedcategory) {
                    $('#header-question-category').find('.arrow-sort').addClass('active');
                    var i = 0;
                    _.each(listSorted, function () {
                        listQuestionsDiplay.add(listSorted[i]);

                        i++;

                    });

                } else {
                    var i = (listQuestionsIntermediair.length) - 1;
                    _.each(listSorted, function () {
                        listQuestionsDiplay.add(listSorted[i]);
                        i--;

                    });

                }
                sortedcategory = !sortedcategory;

                $('#liste-questions').children().remove();
                new lily.listQuestionsView(listQuestionsDiplay);
            }
        });


    }

    /*End HeaderView*/
});
/****************************
View to Display Header of list Questions, without answers
*************************************/
lily.HeaderPersonalView = Backbone.View.extend({
    el: '#wrapper-header-list-questions',
    template: _.template($('#header-list-questions-personal').html()),
    render: function () {
        this.$el.html(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click #header-questions-personal-title': 'sortQuestionsPersonalByTitle',
        'click #header-questions-personal-answered': 'sortQuestionsPersonalByAnswer',
        'click #header-questions-personal-date': 'sortQuestionsPersonalByDate'
    },
    sortQuestionsPersonalByTitle: function () {
        var listQuestionsPersonalSorted = new lily.listQuestions;
        listQuestionsPersonalSorted.comparator = "title";
        var k = 0;
        _.each(listQuestionsPersonal, function () {
            listQuestionsPersonalSorted.add(listQuestionsPersonal.models[k]),
            k++;
        });
        if (sortedPersonalTitle) {
            var l = listQuestionsPersonalSorted.length - 1;
            var listQuestionsPersonalSortedReverse = new lily.listQuestions;
            _.each(listQuestionsPersonalSorted, function () {
                listQuestionsPersonalSortedReverse.add(listQuestionsPersonalSorted.models[l]);
                l--;
            });
        }
        if (typeof (listQuestionsPersonalSortedReverse) == 'undefined') {
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listQuestionsPersonalSorted);
        } else {
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listQuestionsPersonalSortedReverse);
            delete listQuestionsPersonalSortedReverse;
        }

        sortedPersonalTitle = !sortedPersonalTitle;

    },

    sortQuestionsPersonalByAnswer: function () {
        var listQuestionsPersonalSorted = new lily.listQuestions;
        listQuestionsPersonalSorted.comparator = "answer";
        var k = 0;
        _.each(listQuestionsPersonal, function () {
            listQuestionsPersonalSorted.add(listQuestionsPersonal.models[k]),
            k++;
        });
        if (sortedPersonalAnswer) {
            var l = listQuestionsPersonalSorted.length - 1;
            var listQuestionsPersonalSortedReverse = new lily.listQuestions;
            _.each(listQuestionsPersonalSorted, function () {
                listQuestionsPersonalSortedReverse.add(listQuestionsPersonalSorted.models[l]);
                l--;
            });
        }
        if (typeof (listQuestionsPersonalSortedReverse) == 'undefined') {
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listQuestionsPersonalSorted);
        } else {
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listQuestionsPersonalSortedReverse);
            delete listQuestionsPersonalSortedReverse;
        }
        sortedPersonalAnswer = !sortedPersonalAnswer;
        console.log('sortQuestionsPersonalByTitle');
    },
    sortQuestionsPersonalByDate: function () {
        var listSorted = new lily.listQuestions;
        listSorted.comparator = "date"
        var k = 0;
        _.each(listQuestionsPersonal, function () {
            listSorted.add(listQuestionsPersonal.models[k]);
            k++;
        });
        if (sortedPersonalDate) {
            var l = listSorted.length - 1;
            listReverse = new lily.listQuestions;
            _.each(listSorted, function () {
                listReverse.add(listSorted.models[l]);
                l--;

            });
        }
        if (typeof (listReverse) == 'undefined') {
            console.log('9669');
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listSorted);
        } else {
            console.log('eazeazaez');
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listReverse);
            delete listReverse;
        }
        sortedPersonalDate = !sortedPersonalDate;
    }



});
lily.HeaderUnansweredView = Backbone.View.extend({
    el: '#wrapper-header-list-questions',
    template: _.template($('#header-list-questions-unanswered').html()),
    render: function () {
        this.$el.html(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click #header-questions-unanswered-title': 'sortCollectionUnanswered',
        'click #header-questions-unanswered-requests': 'sortCollectionUnanswered',
        'click #header-questions-unanswered-date': 'sortCollectionUnanswered',
    },
    sortCollectionUnanswered: function (e) {
        criteriaComparatorUnanswered = $(e.currentTarget).attr('id').replace('header-questions-unanswered-', '');
        listQuestionsUnanswered = new lily.listQuestions;
        listQuestionsUnanswered.url = "/unanswered/get";


        switch (criteriaComparatorUnanswered) {
        case "title":
            if (comparatorTitleUnanswered) {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
                    }
                });
            } else {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        listIntermidiaire = new lily.listQuestions();
                        var k = listQuestionsUnanswered.length - 1;
                        _.each(listQuestionsUnanswered, function () {
                            listIntermidiaire.add(listQuestionsUnanswered.models[k]);
                            k--;
                        });
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listIntermidiaire);
                    }
                });
            }
            comparatorTitleUnanswered = !comparatorTitleUnanswered;

            break;
        case "requests":
            if (comparatorRequestsUnanswered) {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
                    }
                });
            } else {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        listIntermidiaire = new lily.listQuestions();
                        var k = listQuestionsUnanswered.length - 1;
                        _.each(listQuestionsUnanswered, function () {
                            listIntermidiaire.add(listQuestionsUnanswered.models[k]);
                            k--;
                        });
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listIntermidiaire);
                    }
                });
            }


            comparatorRequestsUnanswered = !comparatorRequestsUnanswered;

            break;
        case "date":
            if (comparatorDateUnanswered) {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
                    }
                });
            } else {
                listQuestionsUnanswered.comparator = criteriaComparatorUnanswered;
                listQuestionsUnanswered.fetch({
                    success: function () {
                        listIntermidiaire = new lily.listQuestions();
                        var k = listQuestionsUnanswered.length - 1;
                        _.each(listQuestionsUnanswered, function () {
                            listIntermidiaire.add(listQuestionsUnanswered.models[k]);
                            k--;
                        });
                        $('#liste-questions').children().remove();
                        new lily.listQuestionsUnansweredView(listIntermidiaire);
                    }
                });
            }
            comparatorDateUnanswered = !comparatorDateUnanswered;
            break;
        }
    }
})
/*******************************************************************
View to display search block 
*******************************************************************/
lily.searchView = Backbone.View.extend({
    el: '#header-questions',
    template: _.template($('#search-form').html()),
    render: function () {

        /*Don't need to render a model*/
        this.$el.append(this.template);


        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'keyup  #filtreRecherche': 'searchQuestions',
        'click .button-search': 'searchQuestions'

    },
    searchQuestions: function (e) {

        /*Premier cas : on cherche dans la liste des questions avec réponses*/
        if (Backbone.history.fragment=="") {
		console.log('search function questions with answers');
             search_pattern = $('#filtreRecherche').val();
			 console.log('search_pattern '+search_pattern);
             search_string = new RegExp(search_pattern, "i");
             results = _(listQuestions.filter(function (data) {
                return search_string.test(data.get("title"));
            }));
            var listQuestionsFiltered = new lily.listQuestions();
            var k = 0;
            _.each(results.toArray(), function () {
                listQuestionsFiltered.add(results.toArray()[k]);
                k++;
            });
            $('#liste-questions').children().remove();
            new lily.listQuestionsView(listQuestionsFiltered);
       } else if(Backbone.history.fragment=="unanswered"){
	   console.log('search function questions without answers');
	               var search_pattern = $("#filtreRecherche").val();
            var search_string = new RegExp(search_pattern, "i");
            var results = _(listQuestionsUnanswered.filter(function (data) {
                return search_string.test(data.get("title"));
            }));
            var listQuestionsFiltered = new lily.listQuestions();
            var k = 0;
            _.each(results.toArray(), function () {
                listQuestionsFiltered.add(results.toArray()[k]);
                k++;
            });
            $('#liste-questions').children().remove();
            new lily.listQuestionsUnansweredView(listQuestionsFiltered);
	   
	   } else if(Backbone.history.fragment=="personal"){
	   console.log('search function personal questions');
	   	               var search_pattern = $("#filtreRecherche").val();
            var search_string = new RegExp(search_pattern, "i");
            var results = _(listQuestionsPersonal.filter(function (data) {
                return search_string.test(data.get("title"));
            }));
            var listQuestionsFiltered = new lily.listQuestions();
            var k = 0;
            _.each(results.toArray(), function () {
                listQuestionsFiltered.add(results.toArray()[k]);
                k++;
            });
            $('#liste-questions').children().remove();
            new lily.listQuestionsPersonalView(listQuestionsFiltered);
	   
	   
	   }
        /*Deuxième cas : On cherche dans la liste des questions sans réponse*/
        /*else if ($('#liste-questions-sans-reponse').children().length > 0) {

var alpha = $("#filtreRecherche").val();
var search_string = new RegExp(alpha, "i");

results = _(test_sans_reponse.filter(function (data) {
return search_string.test(data.get("title"));
}));

var listeQuestionsSansReponseFiltrees = new lily.listeQuestionsSansReponse();

var k = 0;
_.each(results.toArray(), function () {
listeQuestionsSansReponseFiltrees.add(results.toArray()[k]);

k++;
});
$('#liste-questions-sans-reponse').children().remove();
new lily.listeQuestionsSansReponseVue(listeQuestionsSansReponseFiltrees);
}	*/
    }


});


/*************************************************************************
View Button Add personal Question
**************************************************************************/
lily.buttonAddPersonalView = Backbone.View.extend({
    el: '#header-questions',
    template: _.template($('#add-question').html()),
    render: function () {
        /*Don't need to render a model*/
        this.$el.append(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click #button-add-personal-question': 'displayFullPersonalQuestion'
    },
    displayFullPersonalQuestion: function (e) {
        console.log('displayFullPersonalQuestion');
        if ($('#question-content').children().length == 0) { //If right panel not displayed
            new lily.QuestionPersonalFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        } else if (($('#question-content').children().length > 0) && ($('#contenant-questions-enfants').children('li').attr('data-id') == 0)) { //Right panel display already a new question
            $('#question-content').children().remove();
            $('#question-content').addClass('hide');

        } else { //Display an question already ewisting
            idQuestionDisplay = 0;
            $('.resume-question.active').removeClass('active');
            $('#question-content').children().remove();
            new lily.QuestionPersonalFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        }
    }
});
/********************************************************************
View Button Add Question
*******************************************************************/
lily.buttonAddView = Backbone.View.extend({
    el: '#header-questions',
    template: _.template($('#add-question').html()),
    render: function () {
        /*Don't need to render a model*/
        this.$el.append(this.template);
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click #button-add-question': 'displayFullQuestion'
    },
    displayFullQuestion: function (e) {
        if ($('#question-content').children().length == 0) { //If right panel not displayed
            new lily.QuestionFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        } else if (($('#question-content').children().length > 0) && ($('#contenant-questions-enfants').children('li').attr('data-id') == 0)) { //Right panel display already a new question
            $('#question-content').children().remove();
            $('#question-content').addClass('hide');

        } else { //Display an question already ewisting
            idQuestionDisplay = 0;
            $('.resume-question.active').removeClass('active');
            $('#question-content').children().remove();
            new lily.QuestionFullView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        }
    }

});



/*==================================================================
CONTENT
==================================================================*/
/************************************
Model Question
*************************************************/
lily.Question = Backbone.Model.extend({
    initialize: function () {
        this.url = "/get/" + this.id;
    },
});
/************************************
Collection list Questions
*************************************/
lily.listQuestions = Backbone.Collection.extend({
    model: lily.Question,
    url: "/get",

    initialize: function () {},

    reverseComparator: function (criteriaComparator) {
        if (typeof (listQuestionsFiltered) == 'undefined') {
            var listIntermediar = new lily.listQuestions;
            listIntermediar.comparator = criteriaComparator;
            listIntermediar.fetch({
                async: false
            });
            var listOrdered = new lily.listQuestions;
            var k = listIntermediar.length - 1;
            _.each(listIntermediar, function () {
                listOrdered.add(listIntermediar.models[k]);
                k--;
            });
            return listOrdered;
        } else {
            var listIntermediaire = new lily.listQuestions;
            listIntermediaire.comparator = criteriaComparator;
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listIntermediaire.add(listQuestionsFiltered.models[k]);
                k++;
            });

            var listQuestionsFilteredOrdered = new lily.listQuestions;

            // listIntermediaire
            var l = listIntermediaire.length - 1;
            _.each(listIntermediaire, function () {
                listQuestionsFilteredOrdered.add(listIntermediaire.models[l]);
                l--;
            });
            return listQuestionsFilteredOrdered;
        }
    },

    classicalComparator: function (criteriaComparator) {
        // if(typeof(listQuestions)!='undefined'){


        // } else {




        var listQuestionsOrdered = new lily.listQuestions;
        if (typeof (listQuestionsFiltered) == 'undefined') {
            listQuestionsOrdered.comparator = criteriaComparator;
            listQuestionsOrdered.fetch({
                async: false
            });
            return listQuestionsOrdered;
        } else {
            var listQuestionsFilteredOrdered = new lily.listQuestions;
            listQuestionsFilteredOrdered.comparator = criteriaComparator;
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listQuestionsFilteredOrdered.add(listQuestionsFiltered.models[k]);
                k++;
            });
            return listQuestionsFilteredOrdered;
        }




    },
    orderQuestions: function () {
        if (typeof (listQuestionsFiltered) == 'undefined') {
            listQuestionsFiltered = new lily.listQuestions;
            var k = 0;
            _.each(listQuestions, function () {
                listQuestionsFiltered.add(listQuestions.models[k]);
                k++;
            });


        }
        var listQuestionsFilteredToDisplay = new lily.listQuestions;
        listQuestionsFilteredToDisplay.comparator = criteriaComparator;

        switch (criteriaComparator) {
        case "category":
            //TO DO
            break;

        case "title":
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listQuestionsFilteredToDisplay.add(listQuestionsFiltered.models[k]);
                k++;
            });

            if (!sortedtitle) {
                var listQuestionsReverseFilteredToDisplay = new lily.listQuestions;
                var l = listQuestionsFilteredToDisplay.length - 1;

                _.each(listQuestionsFilteredToDisplay, function () {
                    listQuestionsReverseFilteredToDisplay.add(listQuestionsFilteredToDisplay.models[l]);
                    l--;
                });
            }
            break;
        case "satisfaction":
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listQuestionsFilteredToDisplay.add(listQuestionsFiltered.models[k]);
                k++;
            });
            if (!sortedsatisfaction) {
                var listQuestionsReverseFilteredToDisplay = new lily.listQuestions;
                var l = listQuestionsFilteredToDisplay.length - 1;

                _.each(listQuestionsFilteredToDisplay, function () {
                    listQuestionsReverseFilteredToDisplay.add(listQuestionsFilteredToDisplay.models[l]);
                    l--;
                });
            }
            break;
        case "requests":
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listQuestionsFilteredToDisplay.add(listQuestionsFiltered.models[k]);
                k++;
            });
            if (!sortedrequests) {
                var listQuestionsReverseFilteredToDisplay = new lily.listQuestions;
                var l = listQuestionsFilteredToDisplay.length - 1;

                _.each(listQuestionsFilteredToDisplay, function () {
                    listQuestionsReverseFilteredToDisplay.add(listQuestionsFilteredToDisplay.models[l]);
                    l--;
                });
            }
            break;
        case "date":
            var k = 0;
            _.each(listQuestionsFiltered, function () {
                listQuestionsFilteredToDisplay.add(listQuestionsFiltered.models[k]);
                k++;
            });
            if (!sorteddate) {
                var listQuestionsReverseFilteredToDisplay = new lily.listQuestions;
                var l = listQuestionsFilteredToDisplay.length - 1;

                _.each(listQuestionsFilteredToDisplay, function () {
                    listQuestionsReverseFilteredToDisplay.add(listQuestionsFilteredToDisplay.models[l]);
                    l--;
                });
            }
            break;

        }

        if (typeof (listQuestionsReverseFilteredToDisplay) == 'undefined') {
            delete listQuestionsReverseFilteredToDisplay;
            return listQuestionsFilteredToDisplay;
        } else {
            delete listQuestionsFilteredToDisplay;
            return listQuestionsReverseFilteredToDisplay;
        }
    },
    /*Function to refresh the list of the questions, in particular in case of changing color of the category's circle*/
    refreshQuestions: function () {
        var listInitial = new lily.listQuestions;
        /*We load all the questions*/
        listInitial.comparator = criteriaComparator;
        listInitial.fetch({
            async: false
        });
        /*We remove the questions which the category is disabled*/
        //variable to count in the loop of the collection CategoriesToHide
        var m = 0; //variable to count in the loop of the collection listInitial
        if (categorysToHide.length > 0) {
            _.each(listInitial, function () {
                if (listInitial.models[m].get('category') != null) { //Check if the category is not null, without this check : probably bug on the next test
                    var l = 0;
                    _.each(categorysToHide, function () {
                        console.log("category" + categorysToHide.models[l].id);
                        console.log("questions" + listInitial.models[m].get('category').id);
                        if (listInitial.models[m].get('category').id == categorysToHide.models[l].id) { //if the test is OK, remove the object of the collection
                            listInitial.remove(listInitial.models[m]);
                            m--;
                            return true;
                        }
                        l++;
                    });

                }
                m++;
            });

        } //End of test of the length of categorysToHide

        /*We order the list of questions*/

        switch (criteriaComparator) {
        case "category":
            //TO DO
            break;
        case "title":
            if (!sortedtitle) {
                var listQuestionsToDisplay = new lily.listQuestions;
                var k = listInitial.length - 1;
                _.each(listInitial, function () {
                    listQuestionsToDisplay.add(listInitial.models[k]);
                    k--;
                });
            }
            break;
        case "satisfaction":
            if (!sortedsatisfaction) {
                var listQuestionsToDisplay = new lily.listQuestions;
                var k = listInitial.length - 1;
                _.each(listInitial, function () {
                    listQuestionsToDisplay.add(listInitial.models[k]);
                    k--;
                });
            }
            break;
        case "requests":
            if (!sortedrequests) {
                var listQuestionsToDisplay = new lily.listQuestions;
                var k = listInitial.length - 1;
                _.each(listInitial, function () {
                    listQuestionsToDisplay.add(listInitial.models[k]);
                    k--;
                });
            }
            break;
        case "date":
            if (!sorteddate) {
                var listQuestionsToDisplay = new lily.listQuestions;
                var k = listInitial.length - 1;
                _.each(listInitial, function () {
                    listQuestionsToDisplay.add(listInitial.models[k]);
                    k--;
                });
            }
            break;
        }
        if (typeof (listQuestionsToDisplay) == 'undefined') {
            return listInitial;
            delete listInitial;
        } else {
            return listQuestionsToDisplay;
            delete listInitial;
            delete listQuestionsToDisplay;
        }


    }
});
/****************************************
View Question in item list
*******************************************/
lily.QuestionView = Backbone.View.extend({
    model: lily.Question,
    tagName: 'li',
    className: 'list-group-item animated  resume-question',
    template: _.template($('#question-item-list').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .question-delete': 'deleteQuestion',
        'click .question-show': 'showQuestion',
    },

    /*Display full Question*/
    showQuestion: function () {
        
        if ($('.toUpdate').length != 0) {
            if (confirm("Vous allez quitter la question, sans sauvegarder les modifications. Voulez-vous continuer ?")) {
                console.log('confirmer');
            } else {
                console.log('infirmer');
                return true;
            }
        }
        $('#question-content').removeClass('show');
        $('#question-content').children().remove();
        $('.resume-question').removeClass('active');
        this.$el.addClass('active');
        $('#question-content').removeClass('show');
        if (idQuestionDisplay != this.model.get('id')) {
            $('#question-content-existant').remove();
            idQuestionDisplay = this.model.id;
            if (this.model.get('category') != null) {
                idCategory = this.model.get('category').id;
            } else {
                idCategory = 'NULL'
            }
            modelDisplay = new lily.Question;
            modelDisplay.url = '/get/' + idQuestionDisplay;
            modelDisplay.fetch({
                async: false
            });
            new lily.QuestionFullView({
                model: modelDisplay
            });
        } else {
            idQuestionDisplay = 0;
            $('#question-content-existant').remove();
            $('#question-content').addClass('hide');
            $('#question-content').removeClass('show');
            $('.resume-question').removeClass('active')
        }



    },

    /*Delete question*/
    deleteQuestion: function () {
	console.log('deleteQuestion');
        /*========================================
FOnction suppression de la question OK
=========================================*/
        if (confirm('Êtes-vous sur de vouloir supprimer ce contenu ?')) {
            /*Faire une confirmation pour la suppression des questions*/
            listQuestions.remove(this.model); /*Suppression du modèle de la collection*/
            this.remove(); /*Suppression de la vue*/
            /*Supprimer l'affichage d'une question pour Backbone*/

            this.model.url = '/delete/' + this.model.id; /*On change l'url sur laquelle on va faire un DELETE*/
            /*On supprime le modèle en base*/
            this.model.destroy();
            /*   var modelDelete = new lily.Question;
            modelAAsupprimer.url = "/delete/" + this.model.id;
            Backbone.sync('delete', this.model, {
                async: true
            });*/
            /*Faire la mise à jour du nombre de questions*/
        }
        $('#nombre-questions').children().remove();
        new lily.meterView();
		$('.resume-question.active').removeClass('active');
		
    },

});
/***********************
View Question unanswered in item list
***********************/
lily.QuestionUnansweredView = Backbone.View.extend({
    model: lily.Question,
    tagName: 'li',
    className: 'list-group-item animated  resume-question',
    template: _.template($('#question-unanswered-item-list').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .question-delete': 'deleteQuestionUnanswered',
        'click .question-show': 'showQuestionUnanswered',
    },

    /*Display full Question*/
    showQuestionUnanswered: function () {
        $('#question-content').removeClass('show');
        $('#question-content').children().remove();
        $('.resume-question').removeClass('active');
        this.$el.addClass('active');
        $('#question-content').removeClass('show');
        if (idQuestionDisplay != this.model.get('id')) {
            $('#question-content-existant').remove();
            idQuestionDisplay = this.model.id;
            if (this.model.get('category') != null) {
                idCategory = this.model.get('category').id;
            } else {
                idCategory = 'NULL'
            }
            modelDisplay = new lily.Question;
            modelDisplay.url = '/unanswered/get/' + idQuestionDisplay;
            modelDisplay.fetch({
                async: false
            });
            listCategories = new lily.listCategories;
            listCategories.url = "/categorys/get";
            listCategories.fetch({
                async: false
            });
            new lily.QuestionFullView({
                model: modelDisplay
            });
        } else {
            idQuestionDisplay = 0;
            $('#question-content-existant').remove();
            $('#question-content').addClass('hide');
            $('#question-content').removeClass('show');
            $('.resume-question').removeClass('active')
        }


    },

    /*Delete question*/
    deleteQuestionUnanswered: function () {

        /*========================================
FOnction suppression de la question OK
=========================================*/
        if (confirm('Êtes-vous sur de vouloir supprimer ce contenu ?')) {
            /*Faire une confirmation pour la suppression des questions*/
            listQuestionsUnanswered.remove(this.model); /*Suppression du modèle de la collection*/
            this.remove(); /*Suppression de la vue*/
            /*Supprimer l'affichage d'une question pour Backbone*/

            this.model.url = '/unanswered/delete/' + this.model.id; /*On change l'url sur laquelle on va faire un DELETE*/
            /*On supprime le modèle en base*/
            this.model.destroy();
            idQuestionDisplay = 0;
            /*Faire la mise à jour du nombre de questions*/

        }
        $('#nombre-questions').children().remove();
        new lily.meterView();
    },

});

/**************************************
View Question personal in item list
********************************************/
lily.QuestionPersonalView = Backbone.View.extend({
    model: lily.Question,
    tagName: 'li',
    className: 'list-group-item animated resume-question',
    template: _.template($('#question-personal-item-list').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .question-delete': 'deleteQuestionPersonal',
        'click .question-show': 'showQuestionPersonal',
    },

    /*Display full Question*/
    showQuestionPersonal: function () {
        console.log('showQuestionPersonal');
        $('#question-content').removeClass('show');
        $('#question-content').children().remove();
        $('.resume-question').removeClass('active');
        this.$el.addClass('active');
        $('#question-content').removeClass('show');
        if (idQuestionPersonalDisplay != this.model.get('id')) {
            $('#question-content-existant').remove();
            idQuestionPersonalDisplay = this.model.id;

            modelDisplay = new lily.Question;
            modelDisplay.url = '/personal/get/' + idQuestionPersonalDisplay;
            modelDisplay.fetch({
                async: false
            });

            new lily.QuestionPersonalFullView({
                model: modelDisplay
            });
        } else {
            idQuestionPersonalDisplay = 0;
            $('#question-content-existant').remove();
            $('#question-content').addClass('hide');
            $('#question-content').removeClass('show');
            $('.resume-question').removeClass('active')
        }


    },

    /*Delete question*/
    deleteQuestionPersonal: function () {

        /*========================================
FOnction suppression de la question OK
=========================================*/
        if (confirm('Êtes-vous sur de vouloir supprimer ce contenu ?')) {
            /*Faire une confirmation pour la suppression des questions*/
            listQuestionsUnanswered.remove(this.model); /*Suppression du modèle de la collection*/
            this.remove(); /*Suppression de la vue*/
            /*Supprimer l'affichage d'une question pour Backbone*/

            this.model.url = '/personal/delete/' + this.model.id; /*On change l'url sur laquelle on va faire un DELETE*/
            /*On supprime le modèle en base*/
            this.model.destroy();
            idQuestionDisplay = 0;
            /*Faire la mise à jour du nombre de questions*/

        }
        $('#nombre-questions').children().remove();
        new lily.meterView();
    },

});
/****************************
View List Questions with answer
*************************************/
lily.listQuestionsView = Backbone.View.extend({
    el: '#liste-questions',
    initialize: function (collectionDisplay) {
        this.model.bind('change', this.displayQuestion);
        this.collection = collectionDisplay;
        this.collection.comparator = criteriaComparator;
        this.render();
        /*===========================================
Update automatically of collection
	===============================================*/
        this.listenTo(this.collection, 'add', this.displayQuestion);
        this.listenTo(this.collection, 'update', this.displayQuestion);
        this.listenTo(this.collection, 'change', this.displayQuestion);
    },
    render: function () {
        this.collection.each(function (item) {
            this.displayQuestion(item);
        }, this);
    },
    /*Function used in loop to display all items of listQuestions*/
    displayQuestion: function (item) {
        var questionView = new lily.QuestionView({
            model: item
        });
        this.$el.append(questionView.render().el);
    }
});
/*************************************
View list Questions without answers
***************************************/
lily.listQuestionsUnansweredView = Backbone.View.extend({
    el: '#liste-questions',
    initialize: function (collectionDisplay) {
        this.model.bind('change', this.displayQuestion);
        this.collection = collectionDisplay;
        this.render();
        /*===========================================
Update automatically of collection
	===============================================*/
        this.listenTo(this.collection, 'add', this.displayQuestionUnanswered);
        this.listenTo(this.collection, 'update', this.displayQuestionUnanswered);
        this.listenTo(this.collection, 'change', this.displayQuestionUnanswered);
    },
    render: function () {
        this.collection.each(function (item) {
            this.displayQuestionUnanswered(item);
        }, this);
    },
    /*Function used in loop to display all items of listQuestions*/
    displayQuestionUnanswered: function (item) {
        var questionUnansweredView = new lily.QuestionUnansweredView({
            model: item
        });
        this.$el.append(questionUnansweredView.render().el);
    }
});
/*************************************
View list Questions personal
***************************************/
lily.listQuestionsPersonalView = Backbone.View.extend({
    el: '#liste-questions',
    initialize: function (collectionDisplay) {
        this.model.bind('change', this.displayQuestion);
        this.collection = collectionDisplay;
		$('#liste-questions').children().remove();
        console.log('collectionDisplay longueur'+collectionDisplay.length);
		this.render();
        /*===========================================
Update automatically of collection
============================================*/
        this.listenTo(this.collection, 'add', this.displayQuestionPersonal);
        this.listenTo(this.collection, 'update', this.displayQuestionPersonal);
        this.listenTo(this.collection, 'change', this.displayQuestionPersonal);
    },
    render: function () {
        this.collection.each(function (item) {
            this.displayQuestionPersonal(item);
        }, this);
    },
    /*Function used in loop to display all items of listQuestions*/
    displayQuestionPersonal: function (item) {
        var questionPersonalView = new lily.QuestionPersonalView({
            model: item
        });
        this.$el.append(questionPersonalView.render().el);
    }
});
/**********************************
View full question side panel right
*************************************/
lily.QuestionFullView = Backbone.View.extend({
    model: lily.Question,
    el: '#question-content',
    template: _.template($('#full-question').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {

        this.render();
        if (typeof (this.model.id) !== 'undefined') {
            this.displayArborescence();
        }
        this.$el.removeClass('hide');
        new lily.listMoodsView();
        new lily.listCategoriesRedirectionsView();
        if (typeof (this.model.get('mood')) != 'undefined') {
            $('.mood-avatar').addClass('mood-detail-' + this.model.get('mood'));
        }
    },
    events: {
        'click .button-add-answer': 'addAnswer',
        'click .button-delete': 'deleteElement',
        'click .button-action': 'addAction',
        'click .button-precision': 'addPrecision',
        'click .button-save': 'saveQuestion',
        'click .button-update': 'updateQuestion',
        'click .button-cancel': 'closePanelRight',
        'click .content-action': 'addClassToDelete'

    },
    addClassToDelete: function (e) {

        $(e.currentTarget).parent().parent().addClass('toDelete');
        $(e.currentTarget).parent().parent().children('ol').addClass('active')
    },
    closePanelRight: function (e) {
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        $('.resume-question.active').removeClass('active');
        // $('#question-content').addClass("hide");
        // $('.resume-question.active').removeClass('active');
        // $('#question-content').children().remove();
        // $('#question-content').addClass("hide");
        idQuestionDisplay = 0;
    },
    displayArborescence: function () {
        arborescenceToDisplay = this;
        if (typeof (modelDisplay.get('children')) !== "undefined") {
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
                _.each(childrenToDisplay, function () {
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
    displayAnswer: function (object) {

        actionToDisplay = new lily.Question;
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
    displayPrecision: function (precision) {
        classeAttente++;
        n_precision = precision;
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
        actionView.$el.addClass('wrapper-' + JSON.stringify(classeAttente));
        var precisionToDisplay = new lily.Question;
        precisionToDisplay.set({
            title: precision.answer
        });
        new lily.PrecisionView({
            model: precisionToDisplay
        });
        var children = precision.children;

        var k = 0;
        _.each(children, function () {
            if (children[k].children.length == '0') {

                arborescenceToDisplay.displayAnswer(children[k]);
            } else {
                arborescenceToDisplay.displayPrecision(children[k]);
            }
            k++;
        });

        $('.wrapper-actions.active').removeClass('active');

        $('.wrapper-' + JSON.stringify(classeAttente)).addClass('active');
        classeAttente--;
        // actionVue.$el.parent().parent().parent().parent().addClass('active');
        // parent_test = actionVue.$el.parent().parent().parent().parent();
    },
    addAnswer: function (e) {
        if ($('.wrapper-answer.active').children().length < 1) {
            new lily.AnswerView({
                model: new lily.Question
            });
            e.stopImmediatePropagation();
        }
    },
    deleteElement: function (e) {
        listElementsToDelete = $('.toDelete');
        var modelToDelete = new lily.Question;
        modelToDelete.id = listElementsToDelete.attr('data-id');
        modelToDelete.url = "/delete/" + listElementsToDelete.attr('data-id');
		if((typeof(listElementsToDelete.attr('data-id'))!=='undefined')&&(listElementsToDelete.attr('data-id')!="NULL")){
		console.log('5555');
        Backbone.sync('delete', modelToDelete);
		}
        if ($('.toDelete').parent().attr('id') == "contenant-questions-enfants") {//Delete the parent question
            $('#question-content').children().remove();
            $('#question-content').addClass('hide');

var list = new lily.listQuestions;
list.comparator="date";               
			   switch(Backbone.history.fragment){
                case "":


                break;
                case "unanswered":
list.url="/unanswered/get";
                break;
                case "personal":
				list.url="/pesonal/get";
break;
                }
      list.fetch({async:false});
var listToDisplay = new lily.listQuestions;
var l = list.length-1;
console.log('l vaut '+l);
_.each(list,function(){
listToDisplay.add(list.models[l]);
l--;
});
$('#liste-questions').children().remove();
new lily.listQuestionsView(listToDisplay);
				
 } else if($('.toDelete').parent().attr('class').search('wrapper-precision')>-1){//Test if we delete a precision
		/*First one : we destroy all the children()*/
var childrenToKill = new lily.Question;	
childrenToKill.url="/get/"+$('.toDelete').parent().parent().attr('data-id');
	childrenToKill.fetch({async:false});
	 listChildren = childrenToKill.get('children');
	var k =0;
	_.each(listChildren,function(){
		var childToKill = new lily.Question;
		console.log(listChildren[k].id);
		childToKill.url="/delete/"+listChildren[k].id;
		Backbone.sync('delete',childToKill,{success:function(){
		console.log('kkkk');
		              }
		});
	
	k++;
	});
	/*We erase the title of the precision*/
	if($('.toDelete').parent().parent().parent().parent().parent().parent().attr('data-id')=='undefined'){
	var idParent="NULL";
	} else {
	var idParent = $('.toDelete').parent().parent().parent().parent().parent().parent().attr('data-id');
	}
	if(childrenToKill.get('category')==null){
	idCategory="NULL";
	} else {
	idCategory=childrenToKill.get('category').id;
	}
	childrenToKill.url="/questions/update/"+$('.toDelete').parent().parent().attr('data-id')+"/"+idParent+"/"+idCategory;
	childrenToKill.set({answer:null});
	
	
		
		}
        $('.toDelete').remove();	
        $('#nombre-questions').children().remove();
        new lily.meterView();
        switch (Backbone.history.fragment) {
		case "":
		 list = new lily.listQuestions;
		list.comparator="date";
		list.fetch({async:false});
 listToDisplay = new lily.listQuestions;
var k = list.length-1;
console.log('k vaut '+k);
_.each(list,function(){
listToDisplay.add(list.models[k]);
k--;

});		
$('#liste-questions').children().remove();
new lily.listQuestionsView(listToDisplay);
		break;
        case "unanswered":
            $('#nbQuestions').removeClass('active');
            $('#nbQuestionsUnanswered').addClass('active');
            break;
        case "personal":
            $('#nbQuestions').removeClass('active');
            $('#nbQuestionsPerso').addClass('active');
            break;
        }

        app.navigate(Backbone.history.fragment);




        e.stopImmediatePropagation();

    },
    addAction: function (e) {
        new lily.ActionView({
            model: new lily.Question
        });
        e.stopImmediatePropagation();
    },
    addPrecision: function (e) {
        new lily.PrecisionView({
            model: new lily.Question
        });
        e.stopImmediatePropagation();
    },
    saveQuestion: function (e) {
        adress = Backbone.history.fragment;
        var itemToSave = $('#contenant-questions-enfants');
		
        questionFull = this; //needed to use the loop savePrecision/saveAnswer
        if ($('#questions-enfants').children().children('ol').length == '0') {
            /*Case answer*/
            questionFull.saveAnswer(e, itemToSave);
        } else if ($('#questions-enfants').children().children('ol').length > 0) {
            /*Case precision*/
            questionFull.savePrecision(e, itemToSave);
        } else {
            console.log('on a un problème');
        }
        /*Hide right side panel*/
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        if (adress == "") {
            $('#nombre-questions').children().remove();
            new lily.meterView();
            $('#liste-questions').children().remove();
            criteriaComparator = "date";
            listQuestions = new lily.listQuestions;
            listQuestions.comparator = criteriaComparator;
            listQuestionsIntermediair = new lily.listQuestions;
            listQuestions.fetch({
                success: function () {
                    var k = listQuestions.length - 1;
                    _.each(listQuestions, function () {
                        listQuestionsIntermediair.add(listQuestions.models[k]);
                        k--;

                    });




                    new lily.listQuestionsView(listQuestionsIntermediair);

                }
            });
            // break;
            // case "unanswered":
        } else if (adress == "unanswered") {

            var modelDelete = new lily.Question;
            modelDelete.url = "/unanswered/delete/" + idQuestionDisplay;
            Backbone.sync('delete', modelDelete);
            $('#nombre-questions').children().remove();
            new lily.meterView();
            $('#nbQuestions').removeClass('active');
            $('#nbQuestionsUnanswered').addClass('active');
            $('#liste-questions').children().remove();
            new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
            // break;
            // case "personal":
        } else if (adress == "personal") {
            /*A FAIRE*/
            // break;
        }




        categoryChoosen = "NULL";


        app.navigate(adress);
		delete questionFull;
    },
    saveAnswer: function (e, item) {

        var questionSimple = new lily.Question;

        questionSimple.set({
            title: item.find('.content-action').val()
        });
        questionSimple.set({
            answer: item.find('textarea').val()
        });
        if (typeof (categoryChoosen) == 'undefined') {
            categoryChoosen = "NULL";
        }
        /*Definir idParent en le mettant en data-idParent*/
        if (item.attr('id') === 'contenant-questions-enfants') {
            idParent = "NULL";
        } else {
            idParent = item.parent().parent().parent().parent().attr('data-id');
        }

        if (typeof (moodChoosen) == 'undefined') {
            moodChoosen = "neutral";
        }
        questionSimple.set({
            mood: moodChoosen
        });
        questionSimple.url = "/create/" + categoryChoosen + "/" + idParent;

        if (questionSimple.get('title').length > 0) {
            questionSimple.save(null, {
                async: false
            });
        } else {
            alert('Veuillez saisir un title à votre réponse');
        }
        e.stopImmediatePropagation();
       
    },
    savePrecision: function (e, item) {
        var precision = new lily.Question;
        precision.set({
            title: $(item.find('.dd3-content')[0]).children().val()
        });
        precision.set({
            answer: $(item.find('.content-precision')[0]).val()
        });
        /*Category*/
        if (typeof (categoryChoosen) == 'undefined') {
            categoryChoosen = "NULL";
        }
        /*Definir idParent en le mettant en data-idParent*/
        idParent = item.parent().parent().parent().parent().attr('data-id');
        if (typeof (idParent) == 'undefined') {
            idParent = "NULL";
        }
        if (typeof (moodChoosen) == 'undefined') {
            moodChoosen = "neutral";
        }
        precision.set({
            mood: moodChoosen
        });
        precision.url = "/create/" + categoryChoosen + "/" + idParent;
        precision.save(null, {
            async: false
        });

        if (item.attr('id') == 'contenant-questions-enfants') {
            item.children().attr('data-id', precision.id);
        } else {
            item.attr('data-id', precision.id);
        }
        var listChildren = $(item.find('.wrapper-actions')[0]).children(); //Compulsory  let this variable in local !
        var k = 0;

        _.each(listChildren, function () {
            if ($($($(listChildren)[k]).find('.wrapper-precision.wrapper-answer')[0]).find('.wrapper-actions').length > 0) {
                	console.log('888888 '+questionFull);
					if(typeof(questionFull)=='undefined'){
					questionFull=this;
					}
				questionFull.savePrecision(e, $(listChildren[k]));
                k++;
            } else {
			
			if(typeof(questionFull)=='undefined'){
					questionFull=this;
					}
					console.log('888888 '+questionFull);
                questionFull.saveAnswer(e, $(listChildren[k]));
                k++;
            }

        });
        // e.stopImmediatePropagation();
    },
    updateQuestion: function (e) {
	console.log('updateQuestion');
	console.log('humeur '+modelDisplay.get('mood'));
      var  questionToUpdate = this;
        /*On met à jour la question initiale, quoiqu'il arrive*/
        var modelToUpdate = new lily.Question;
        if (typeof (categoryChoosen) == 'undefined') {
            if (modelDisplay.get('category') !== null) {
                categoryChoosen = modelDisplay.get('category').id;
            } else {
                categoryChoosen = "NULL";
            }
        }
        if (typeof (moodChoosen) == 'undefined') {
            moodChoosen = modelDisplay.get('mood');
        }

        this.model.set({title: $('#contenant-questions-enfants').find('.question-parent').val() });
		if($('#questions-enfants').children().children('.dd3-content').length>0){
   this.model.set({answer:$('#questions-enfants').children().children('.dd3-content').children().val()});
		}else{
		    this.model.set({answer: $('#questions-enfants').find('textarea')[0].value});
		}
		
		
        // modelToUpdate.set({	mood: moodChoosen });
        this.model.set({mood: moodChoosen });
		console.log('moodChoosen');
		console.log(moodChoosen);
        this.model.url = "/update/" + modelDisplay.id + "/NULL/" + categoryChoosen;

        // this.model.save(null,{async:false});       
        this.model.save(null,{async:false});       
        /*Update children issue*/      
	  listToUpdate = $('.toUpdate');
        var k = 0;
        _.each(listToUpdate, function () {
		console.log('222');
            listToUpdate = $('.toUpdate');
            if (listToUpdate.length > 0) {
                /*update question already existing*/
                if ($($('.toUpdate')[k]).attr('data-id') !== "NULL") {

                    modeltoUpdate = new lily.Question;
					if(typeof($(listToUpdate[k]).find('.content-action')[0])!=='undefined'){
                    modeltoUpdate.set({ title: $(listToUpdate[k]).find('.content-action')[0].value});
					} else {
					 modeltoUpdate.set({ title:$(listToUpdate[0]).find('.edit-reponse-content').val() });
					}
                    if (typeof ($(listToUpdate[k]).find('.content-precision')[0]) !== 'undefined') {
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
                    Backbone.sync('update', modeltoUpdate, {
                        success: function () {
                            console.log('update completed');
                            console.log(modeltoUpdate);
                        }
                    });

                } else {
                    console.log('on ajoute une nouvelle question');
                    /*Add new model to existing question*/
                    /*/questions/create/{category}/{idParent}*/
                    var modelToSave = new lily.Question;
                    contentToSave = $('.toUpdate');
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
        setChildren.url = "/" + idQuestionDisplay + "/versions/setchildren";
        Backbone.sync('update', setChildren);
/*Refresh listQuestionsFiltered, removing old model, and adding new one*/
var  list = new lily.listQuestions;
list.comparator="date";
list.fetch({async:false});

var l=0;
_.each(list,function(){
	if(list.models[l].get('category')!=null){
	var k =0;
		_.each(categoriesToHide,function(){

if(typeof(list.models[l])!=='undefined'){	
	if(list.models[l].get('category')!=null){
			if(categoriesToHide.models[k].id==list.models[l].get('category').id){
			list.remove(list.models[l]);
			l--;
		
			}
			}
		 }
		k++;
		
		});
	}





l++; 
});
delete moodChoosen;
      idQuestionDisplay = 0;
                $('#question-content').children().remove();
                $('#question-content').addClass('hide');
                $('#liste-questions').children().remove();
var listReverse = new lily.listQuestions;
var m = list.length-1;
_.each(list,function(){
listReverse.add(list.models[m]);
m--;
});
new lily.listQuestionsView(listReverse);
delete categoryChoosen;

// listQuestionsFiltered.
// }

        e.stopImmediatePropagation();

    }


});
/*************************************
View the full personal question on the right side panel
*************************************/
lily.QuestionPersonalFullView = Backbone.View.extend({
    model: lily.Question,
    el: '#question-content',
    template: _.template($('#full-personal-question').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        this.render();
        $('#question-content').removeClass('hide');
        new lily.listMoodsView();
        if (idQuestionPersonalDisplay !== 0) {
            var answer = new lily.Question;
            answer.set({
                title: this.model.get('answer')
            });
            new lily.AnswerView({
                model: answer
            });
        }
        // var answer = new lily.Question;
        // alpha = this;
        // answer.set({title:this.model.get('answer')});
    },
    events: {
        'click .button-update-personal-question': 'updatePersonalQuestion',
        'click .button-cancel-personal-question': 'cancelPanelFullPersonalQuestion',
        'click .button-add-answer-personal': 'addPersonalAnswer',
        'click .button-save-personal-question': 'savePersonalQuestion',
    },
    cancelPanelFullPersonalQuestion: function () {
        delete moodChoosen;
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        $('.resume-question.active').removeClass('active');
        idQuestionPersonalDisplay = 0;
    },
    updatePersonalQuestion: function (e) {
        var questionPersonal = new lily.Question;
		console.log('idQuestionPersonalDisplay '+idQuestionPersonalDisplay);
        questionPersonal.url = "/personal/update/" + idQuestionPersonalDisplay;
        questionPersonal.set({
            title: $('.question-parent').val()
        });
        questionPersonal.set({
            answer: $('.edit-reponse-content').val() 
        });
if(typeof(moodChoosen)=='undefined'){
console.log('11111');
moodChoosen=modelDisplay.get('mood');
} else {
console.log('22222222');

}

questionPersonal.set({mood:moodChoosen});
        console.log('questionPersonal mood');
		console.log(moodChoosen);
        console.log(questionPersonal.get('mood'));
		Backbone.sync('update', questionPersonal, { 
            success: function () {

                $('#question-content').children().remove();
                $('#question-content').addClass('hide');
                $('.resume-question.active').removeClass('active');
                listQuestionsPersonal = new lily.listQuestions;
                listQuestionsPersonal.url = "/personal/get";
                listQuestionsPersonal.fetch({
                    async: false
                });
                listQuestionsPersonalSorted = new lily.listQuestions;
                listQuestionsPersonalSorted.comparator = "date";
                var k = 0;
                _.each(listQuestionsPersonal, function () {
                    listQuestionsPersonalSorted.add(listQuestionsPersonal.models[k]);
                    k++;
                });
                listToDisplay = new lily.listQuestions;
                var l = listQuestionsPersonalSorted.length - 1;
                _.each(listQuestionsPersonalSorted, function () {
                    listToDisplay.add(listQuestionsPersonalSorted.models[l]);
                    l--;
                });

                $('#liste-questions').children().remove();
                new lily.listQuestionsPersonalView(listToDisplay);


            }
        });
delete moodChoosen;
        idQuestionPersonalDisplay = 0;
e.stopImmediatePropagation();
    },
    addPersonalAnswer: function () {
        if ($('#questions-enfants').children().length == '0') {
            new lily.AnswerView({
                model: new lily.Question
            });
        }
    },
    savePersonalQuestion: function (e) {
        var questionPersonal = new lily.Question;
        questionPersonal.url = "/personal/create";
        questionPersonal.set({
            title: $('.question-parent').val()
        });
        questionPersonal.set({
            answer: $('#questions-enfants').find('textarea').val()
        });
        if (questionPersonal.get('answer') == null) {
            questionPersonal.set({
                answer: "Pas de réponse enregitrée"
            });
            // alert('Attention, vous n\'avez pas rentré de réponse pour cette question personnelle');
        }
        if (typeof (moodChoosen) == 'undefined') {
            moodChoosen = "neutral";
        }
        questionPersonal.set({
            mood: moodChoosen
        });
console.log('moodChoosen '+moodChoosen);
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        questionPersonal.save(null, {

            success: function () {
                listQuestionsPersonal.add(questionPersonal);
                /* Refrsh meter of the questions*/
                $('#nombre-questions').children().remove();
                new lily.meterView();
                $('#nbQuestions').removeClass('active');
                $('#nbQuestionsPerso').addClass('active');
                $('#liste-questions').children().remove();
                /*listPersonalReverse = list of the personal questions which the first object is the last created*/
                listPersonalReverse = new lily.listQuestions;
                var l = listQuestionsPersonal.length - 1;
                listPersonalReverse.comparator = "date";
                _.each(listQuestionsPersonal, function () {
                    listPersonalReverse.add(listQuestionsPersonal.models[l]);
                    l--;
                });
                new lily.listQuestionsPersonalView(listPersonalReverse);
            }
        });


e.stopImmediatePropagation();

    }

});
/*==================================================================
Right Side Panel
==================================================================*/
/****************************
View answer
*************************************/
lily.AnswerView = Backbone.View.extend({
    el: '.wrapper-answer.active',
    model: lily.Question,
    template: _.template($('#answer-question').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {

        $('.content-answer.active').removeClass('active');
        this.render();
		
        this.$el.find('textarea').wysihtml5({
            "font-styles": false,
            "emphasis": true,
            "lists": false,
            "html": false,
            "link": false,
            "image": false,
            "color": false,
        });
// $(".wysihtml5-sandbox").css("resize", "vertical");

// /*We had event listener, only way to hear the different events in the iframe of the WYSIWYG*/
//Event : the user press a key
$('.wysihtml5-sandbox').contents().find('body').on("keydown",function(e) {	
console.log('eysown');
	$('.wysihtml5-sandbox').height($(e.currentTarget).height());
	$('.content-answer').height('100%');
	$('.content-answer.active').height($(e.currentTarget).height());
    });
//Event : the user click on the answer fieldd
	$('.wysihtml5-sandbox').contents().find('body').on("click",function(e) {
		lp = e;
		al = this;
	console.log('click');


		 listIframe = $('.wysihtml5-sandbox');
		var k = 0;
		_.each(listIframe,function(){
				if($(listIframe[k]).contents().find('.wysihtml5-editor.actve').length>0){
					// $(listIframe[k]).addClass('active');				
					$(listIframe[k]).contents().find('.wysihtml5-editor.active').removeClass('active');
console.log('on efface la classe active');					
				} else {
				console.log('on ne fait rien');
				
				}
		k++;
		});
		$(e.currentTarget).addClass('active');
				// _.each(listIframe,function(){
				// if($(listIframe[k]).contents().find('.wysihtml5-editor.actve').length>0){
					// $(listIframe[k]).addClass('active');				
				// }
		// k++;
		// });	
	
	
	
		// $(e.currentTarget).addClass('active');
		// $('.wysihtml5-sandbox.active').height($(e.currentTarget).height());
		// $('.content-answer').height('100%');
		// $('.content-answer.active').height($(e.currentTarget).height());
		e.stopImmediatePropagation();
		});
$('.wysihtml5-sandbox').contents().find('body').on("blur",function(e) {
console.log('blur');
/*Resize all the contents content-answer when we lost the focus*/
$('.content-answer').height('100%');
		e.stopImmediatePropagation();

});
		
		
    },
    events: {
        'click .reponse-item': 'toUpdate',
		'click .conteneur-textarea':'toUpdate',
		'click .reponse-item': 'toDeleteEditAnswer',
        'blur .reponse-item': 'hideWysiwyg',
         'click .button-edit-reponse': 'createWysiwyg',
		 // 'click .reponse-name':'resizeTextArea'
        
    },

    // resizeTextArea:function(e){
	// console.log('tttt');
	// p = e;
	// },
    createWysiwyg: function (e) {
	this.toUpdate();
      $('.wrapper-answer.active').removeClass('active');
        $(e.currentTarget).parent().parent().addClass('active');
        $('.content-answer.active').removeClass('active');
        $(e.currentTarget).parent().addClass('active');
        if ($(e.currentTarget).parent().parent().find('.popup-edition').length == 0) {
            if ($('.popup-edition').length > 0) {
                $('.popup-edition').remove();
            }
            var answer = new lily.Question;
            if ($('.content-answer.active').find('textarea')[0].value.length > 0) {
                answer.set({
                    title: $('.content-answer.active').find('textarea')[0].value
                });
            }
            popupEditorWysiwyg = new lily.WysiwygView({
                model: answer
            });
            popupEditorWysiwyg.$el.find('#answer-editor').wysihtml5({
                "font-styles": false,
                "emphasis": true,
                "lists": false,
                "html": false,
                "link": true,
                "image": false,
                "color": false,

            });
        } else {
            $('.popup-edition').remove();
        }
        e.stopImmediatePropagation();
    },

    hideWysiwyg: function (e) {
        $('.reponse-name.hide').parent().parent().parent().parent().addClass('toUpdate');
        $('.reponse-name.hide').html($('.conteneur-textarea.show').children('textarea').val());
        $('.reponse-name.hide').removeClass('hide');
        $('.reponse-name').parent().children('.conteneur-textarea').removeClass('show');
        $('.reponse-name').parent().children('.conteneur-textarea').addClass('hide');
		$('.content-answer.active').height('33px');

    },
    toDeleteEditAnswer: function (e) {	
$(e.currentTarget).parent().parent().parent().addClass('toUpdate')
        $('.toDelete').removeClass('toDelete');
        this.$el.children().addClass('toDelete');
        /*Hide the text name of the answer*/
        $(e.currentTarget).children('.reponse-name').addClass('hide');
        /*Show the textarea of the wysiwyg*/
        $(e.currentTarget).children('.conteneur-textarea').removeClass('hide');
        $(e.currentTarget).children('.conteneur-textarea').addClass('show');
    },
    toUpdate: function (e) {
	// this.$el.trigger('autosize.resize');
	console.log(e);
        this.$el.children().addClass('toUpdate');
		
		
    }
});
/******************************************
Popup for the Wysiwyg editor
******************************************/
lily.WysiwygView = Backbone.View.extend({
    el: '.content-answer.active',
    template: _.template($('#wysiwyg').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        this.render();
    },
    events: {
        'click .button-update-answer': 'updateValue',
        'click .button-cancel-answer': 'cancelWysiwyg'
    },
    updateValue: function () {
        
        console.log('updateValue');
        var answer = new lily.Question;
        answer.set({
            title: $('#answer-editor').val()
        });
        $('.content-answer.active').remove();
        new lily.AnswerView({
            model: answer
        });
    },
    cancelWysiwyg: function () {
  
        $('.popup-edition').remove();
		$('.content-answer.active').height('33px');
    }

});
/*****************************************
View Precision
*******************************************/
lily.PrecisionView = Backbone.View.extend({
    model: lily.Question,
    el: '.wrapper-precision.active',
    template: _.template($('#wrapper-precision').html()),
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .content-precision ': 'addClassActive',
        'keyup .content-precision': 'toUpdate'
    },
    initialize: function () {
        $('.wrapper-precision.active').removeClass('active');
        $('.wrapper-answer.active').removeClass('active');
        $('.wrapper-actions.active').removeClass('active');
        this.render();
        /*Display 2 actions if it is a new precision view*/
        if (typeof (this.model.get('title')) == 'undefined') {
            new lily.ActionView({
                model: new lily.Question
            });
            new lily.ActionView({
                model: new lily.Question
            });
        }
        /*var action1=new lily.Question;
	action1.set({title:'title action 1'});
	var action2 = new lily.Question;
	action2.set({title:'action 2 title'});
	listActions.add(action1);
	listActions.add(action2);*/
        // vue =	new lily.listActionsView(listActions);

    },
    toUpdate: function (e) {
        $(e.currentTarget).parent().parent().parent().parent().addClass('toUpdate');
    },
    addClassActive: function (e) {
        /*Reset de la classe toDelete*/
        $('.toDelete').removeClass('toDelete');
        this.$el.children().addClass('toDelete')
        $('.wrapper-actions.active').removeClass('active');
        $(this.$el.find('.wrapper-actions')[0]).addClass('active');
        e.stopImmediatePropagation();
    }
});
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
    initialize: function () {
        /*Reset of active class to add Precision/Answer*/
        $('.wrapper-action.active').removeClass('active');
        $('.wrapper-precision.wrapper-answer').removeClass('active');
        this.render();
    },
    events: {
        'click .content-action': 'addClassActiveAction',
        'keyup .content-action': 'toUpdate'
    },
    addClassActiveAction: function (e) {
$('.content-answer.active').height('100%');
        $('.toDelete').removeClass('toDelete');
        $('.wrapper-answer.wrapper-precision.active').removeClass('active');
        $(e.currentTarget).parent().parent().children('ol').addClass('active');
        $(e.currentTarget).parent().parent().addClass('toDelete');
        e.stopImmediatePropagation();
    },
    toUpdate: function (e) {
        $(e.currentTarget).parent().parent().addClass('toUpdate')
    }

});


/*===================================================================	
SIDE MENU LEFT
===================================================================*/
lily.meterView = Backbone.View.extend({
    el: '#nombre-questions',
    template: _.template($('#meter-questions').html()),
    render: function () {
        this.$el.append(this.template(this.model.toJSON()));
        return this;
    },
    initialize: function () {
        this.model = new lily.Question;
        if (typeof (listQuestions) == "undefined") {
            listQuestions = new lily.listQuestions();
        }
        listQuestions.fetch({
            async: false
        });
        this.model.set({
            nbQuestions: listQuestions.length
        });
        if (typeof (listQuestionsUnanswered) == 'undefined') {
            listQuestionsUnanswered = new lily.listQuestions();
            listQuestionsUnanswered.url = "/unanswered/get";
        }
        listQuestionsUnanswered.fetch({
            async: false
        });
        if (typeof (listQuestionsPersonal) == 'undefined') {
            listQuestionsPersonal = new lily.listQuestions;
            listQuestionsPersonal.url = "/personal/get";
        }
        listQuestionsPersonal.fetch({
            async: false
        });
        // if(typeof(listRedirections)=="undefined"){
        // listRedirections = new lily.listRedirections();
        // listRedirections.fetch({async:false});
        // }
        this.model.set({
            questions: listQuestions.length
        });
        this.model.set({
            unanswered: listQuestionsUnanswered.length
        });
        this.model.set({
            personal: listQuestionsPersonal.length
        });
        // this.model.set({redirections:listRedirections.length});
        this.render();
    },
    events: {
        // 'click #nbQuestions': 'displayQuestions',
        'click #nbQuestionsUnanswered': 'displayUnansweredQuestions',
        'click #nbQuestionsPerso': 'displayPersonalQuestions',
        'click #nbRedirections': 'displayRedirections',
    },
    // displayQuestions: function (e) {

    // e.stopImmediatePropagation();
    // },
    displayUnansweredQuestions: function (e) {
        app.navigate("unanswered", {
            trigger: true
        });
    },

    displayPersonalQuestions: function (e) {
        app.navigate("personal", {
            trigger: true
        });
        e.stopImmediatePropagation();
    },
    displayRedirections: function (e) {

        app.navigate("redirections", {
            trigger: true
        });

        e.stopImmediatePropagation();

    }


});
var AppRouter = Backbone.Router.extend({
    routes: {
        "": "home",
        "unanswered": "questionsUnanswered",
        "personal": "questionsPersonal",

    },

    home: function () {
	
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        /********************************************
Global variables used in this script
***********************************************/



        idQuestionDisplay = 0;

        idCategory = 'NULL';
        sortedsatisfaction = true;
        sortedtitle = true;
        sortedrequests = true;
        sorteddate = false; //Initial sort = sort by date, initial state of the boolean, different of the other
        sortedcategory = true;
        classeAttente = 0;
        criteriaComparator = "date";
        /*TODO Destroy old view displayed*/
        /***************************************************************
HEADER
**********************************************/
        /*Header list Questions*/
        $('#wrapper-header-list-questions').children().remove();
        new lily.HeaderView();
        /*Destroy old header page*/
        $('#header-questions').children().remove();
        /*Creation Form Search*/
        new lily.searchView();
        /*Creation Add Button*/
        new lily.buttonAddView();
        /***************************************************************
		Side Menu LEFT
		*****************************************************************/
        /*Destroy old meter */
        $('#nombre-questions').children().remove();
        $('#liste-questions').children().remove();
        /*Destroy old list Questions unanswered/*/
        /*Meter Questions/Questions without answers/Personal Questions/Redirections*/
        new lily.meterView();
		
        /*Wrapper Categories*/
        new lily.wrapperCategoriesView();
        /*List Categories*/
        listCategories = new lily.listCategories;
        listCategories.fetch({
            success: function () {
                new lily.listCategoriesView(listCategories);
            }
        });
		$('.wrapper-button-categorys').remove();
        new lily.buttonCategoriesView();
        /***************************************************************
Content
**********************************************/
        /*Creation list of Questions*/
        listQuestions = new lily.listQuestions;
        listQuestions.comparator = criteriaComparator;
        listQuestionsIntermediair = new lily.listQuestions;
        listQuestions.fetch({
            success: function () {
                var k = listQuestions.length - 1;
                _.each(listQuestions, function () {
                    listQuestionsIntermediair.add(listQuestions.models[k]);
                    k--;

                });




                new lily.listQuestionsView(listQuestionsIntermediair);

            }
        });
    }, //End function home
    questionsUnanswered: function () {
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        /* Instanciation of global variables*/
        idQuestionDisplay = 0;
        comparatorTitleUnanswered = true;
        comparatorRequestsUnanswered = true;
        comparatorDateUnanswered = true;



        /*Hide categories left side panel*/
        $('#conteneur-liste-categories').addClass('hide');
		$('.wrapper-button-categories').remove();
        /*Refresh meter view*/
        $('#nombre-questions').children().remove();
        new lily.meterView();
        /*Change active class on meter */
        $('#nbQuestions').removeClass('active');
        $('#nbQuestionsUnanswered').addClass('active');
        /*Update search block view*/
        $('#header-questions').children().remove();
        new lily.searchView();
        /*Update header of list of questions*/
        $('#wrapper-header-list-questions').children().remove();
        new lily.HeaderUnansweredView();
        listQuestionsUnanswered = new lily.listQuestions;
        listQuestionsUnanswered.url = "/unanswered/get";
        listQuestionsUnanswered.fetch({
            success: function () {
                $('#liste-questions').children().remove();
                new lily.listQuestionsUnansweredView(listQuestionsUnanswered);
            }
        });



        // $('#nombre-questions').find('li.active').removeClass('active');
        // $('#nbQuestionsUnanswered').addClass('active');
        // /*TO DO REFRESH NUMBER QUESTIONS */

        // /*Load list questions unanswered*/
        // listQuestionsUnanswered = new lily.listQuestions();
        // listQuestionsUnanswered.url="/unanswered/get";
        // listQuestionsUnanswered.fetch({success:function(){
        // $('#liste-questions').children().remove();
        // $('#wrapper-header-list-questions').remove();
        // new lily.listQuestionsView(listQuestionsUnanswered);
        // $('#nombre-questions').children().remove();

        // new lily.meterView();
        // $('#nombre-questions').children('li').removeClass('active');
        // $('#nbQuestionsUnanswered').addClass('active');

        // }
        // });


        // new lily.listQuestionsView(listQuestions);
        // $("#question-content").children().remove();
        // $("#question-content").addClass('hide');
        // $('#liste-questions').children().remove();


    }, //End function questions-unanswered
    questionsPersonal: function () {
        sortedPersonalDate = true;
        sortedPersonalTitle = true;
        sortedPersonalAnswer = true;
        idQuestionPersonalDisplay = 0;
        /*Destroy old views*/
		console.log($('#liste-questions').children().length);
        $('#liste-questions').children().remove();
		console.log($('#liste-questions').children().length);
        $('#nombre-questions').children().remove();
        $('#conteneur-liste-categorys').children().remove();
        $('#question-content').children().remove();
        $('#question-content').addClass('hide');
        $('.wrapper-button-categories').remove();
        new lily.meterView();
        $('#nombre-questions').children().removeClass('active');
        $('#nbQuestionsPerso').addClass('active');
        $('#header-questions').children().remove();
        $('#wrapper-header-list-questions').children().remove();
        new lily.HeaderPersonalView();
        new lily.buttonAddPersonalView();
        new lily.searchView();
        listQuestionsPersonal = new lily.listQuestions();
        listQuestionsPersonal.url = "/personal/get";
        listQuestionsPersonal.fetch({
            success: function () {
                new lily.listQuestionsPersonalView(listQuestionsPersonal)

            }
        });
    },
    /*redirections: function () {
        console.log('redirections');


    }*/

}); //End Router
$(function () {
    app = new AppRouter();
    Backbone.history.start();

}) /*This is the end*/


