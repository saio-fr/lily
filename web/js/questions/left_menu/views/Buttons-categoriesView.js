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
