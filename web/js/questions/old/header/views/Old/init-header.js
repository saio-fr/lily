/*This view has to goal : initialize all the components of the header */
lily.headerView=Backbone.View.extend({
initialize:function(){
	if(($('#header-questions').children().length==0)&&($('#management-questions').children().length==0)){
new lily.searchView();
new lily.filterView();
new lily.selectButtonView();
new lily.spamView();
new lily.trashView();
new lily.labelView();
new lily.categorieButtonView();
new lily.mergeView();
new lily.buttonAddView();
 }
 }
});