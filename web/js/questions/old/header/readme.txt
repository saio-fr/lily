DATE : 10/07
/**************************************
The header is just componed of views. We create the views, without model associated, 
cause we just want to add event-listener created by backbone.
********************************************************************/
button-add.js : black button to create a question. The question's type depend on the adress (and so the questions displayed's type)
categories.js : attribute a categorie to selected questions
filter.js : filter the questions in fonction of one criteria
init-header.js : view to create all the views included in the header. Just to simplify the creation of the header
label.js : attribute, or change, a label of selected questions
merge.Js : allow to merge differents questions
search.js : search bar. Search in one collection according to the current adress
select.Js : select/unselect all the questions
standarView.js : initial template of a view in the header. Barely all the views extends of this view
thrash.js : send selected personal/business question to the trash. Delete all the selected unanswered questions