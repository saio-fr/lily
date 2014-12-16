lily.LeftMenuView=Backbone.View.extend({
	initialize:function(){
		/*Destroy old meter*/
			// $('#nombre-questions').children().remove();
			/*create new meter view*/
		if(typeof(meterView)!=='undefined'){
		meterView.stopListening();
		meterView.$el.empty();
		}
		meterView=new lily.MeterView();
		
		var test_personal=new RegExp('personal');
		var test_business = new RegExp('business');
		var test_unanswered = new RegExp('unanswered');
		if(typeof(listCategoriesView)!=='undefined'){
			listCategoriesView.stopListening();
			listCategoriesView.$el.empty();
		}
		if(typeof(wrapperCategoriesView)!=='undefined'){
			wrapperCategoriesView.stopListening();
			wrapperCategoriesView.$el.empty();
		}
		if(test_business.test(Backbone.history.fragment)){//Display categories for business questions
			wrapperCategoriesView = new lily.WrapperCategoriesView();
			//List categories never loaded
			if(app.listCategories.length=='0'){
				app.listCategories.fetch({success:function(){
					listCategoriesView = new lily.ListCategoriesView(app.listCategories);
				}});
				} else {
					listCategoriesView =new lily.ListCategoriesView(app.listCategories);
				}
			}else if(test_personal.test(Backbone.history.fragment)){  
				// new lily.ListCategoriesView(app.listCategories);
			} else if(test_unanswered.test(Backbone.history.fragment)){ 
			} 
		
	}
});