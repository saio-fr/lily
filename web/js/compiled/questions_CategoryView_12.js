/***************************************************
View of one category item
*******************************************************/
lily.CategoryView = Backbone.View.extend({
    model: lily.Category,
    template: _.template($('#item-category').html()),
    tagName: 'li',
    className: 'wrapper-category ',
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
		
        return this;
		
    },
	initialize:function(){
	this.children=this.model.get('children');
	// this.listSubCategoriesView = new lily.ListSubCategoriesView($(e.currentTarget).parent().children('ul'),listSubCategories);
	
	},
	
    events: {
        'click .display-category': 'changeCategory',
        'click .categorie-delete': 'deleteCategory',
        'click .category-item-list': 'filter',
		'click .lily-icon-arrow-down':'showSubCategories',
		'click .lily-icon-arrow-up':'showSubCategories',
		
    },
	changeCategory: function (e) {
		if(typeof(popupCategoryView)=='undefined'){//create for the first time the popupcategoryview
			popupCategoryView = new lily.PopupCategoryView({model:this.model});
		} else {
			if(this.model.id==popupCategoryView.model.id){ 
				//hide the popup category view already opened
				popupCategoryView.undelegateEvents();
				popupCategoryView.$el.empty();
				popupCategoryView.$el.addClass('hide');
				delete popupCategoryView;
				} else {
				popupCategoryView.undelegateEvents();
				popupCategoryView.$el.empty();
				popupCategoryView = new lily.PopupCategoryView({model:this.model});				
				}
		
		
		
		}
        // if ((typeof (idCategoryDisplay) !== 'undefined') && (idCategoryDisplay == this.model.id)) {
            // /*Popup already opened*/
            // popupCategoryView.$el.children().remove();
            // popupCategoryView.$el.attr('class', 'hide');
            // idCategoryDisplay = 0;
        // } else {
            // /*Create a new popup, and destroyed the one already-opened*/
			// popupCategoryView.undelegateEvents();
            // popupCategoryView.$el.empty();
			// popupCategoryView.$el.addClass('hide');
            // var idCategoryDisplay = this.model.id;
            // $('#popup-categorie').removeClass('hide');
            // popupCategoryView = new lily.PopupCategoryView({
                // model: this.model
            // });
        // }
    // e.stopImmediatePropagation();
	}, 

    filter: function (e) {
		var that = this;
		console.log('filter');
		var idCategory = this.model.id;
		if(app.postRequest.categories[0]==null){//Array of categories filtered empty
			// app.postRequest.categories[0]=parseInt(idCategory);
			app.postRequest.categories[0]=idCategory;
				//add sub categories to add, here
			var m = 0;
		
			var listChildren = this.model.get('children');
			_.each(listChildren,function(){
				// if(app.postRequest.categories.indexOf(listChildren.models[m].id)<0){
					app.postRequest.categories.push(listChildren.models[m].id);
				// }
					m++;
			});
			$('#list-categories').find('i.display-category').addClass('undisplayed');
			$(e.currentTarget).parent().children('i.display-category').removeClass('undisplayed');	
			$(e.currentTarget).parent().parent().find('i.display-category').removeClass('undisplayed');		

		} else {//array of categories filtered not empty
		var initial_length= app.postRequest.categories.length;//neceassary to know if we have remove categories from the array app.postRequest.categories
			var l = 0;
			_.each(app.postRequest.categories,function(){
				if(idCategory==app.postRequest.categories[l]){
					app.postRequest.categories.splice(l,1); //we remove the categories to the list of categories to display
					$(e.currentTarget).parent().children('i.display-category').addClass('undisplayed');//Change display of icon tag
					//Add sub categories to remove here
				var listChildren = that.model.get('children');
				console.log(listChildren +'listChildren');
				var m =0;
				_.each(listChildren,function(){
				console.log(app.postRequest.categories.indexOf(listChildren.models[m]));
					// if(app.postRequest.categories.indexOf(listChildren.models[m].id)<0){
					app.postRequest.categories.splice(app.postRequest.categories.indexOf(listChildren.models[m].id),1);
					// }
					m++;
				});
				
				}
			l++;
			});
		if(app.postRequest.categories.length=='0'){
			app.postRequest.categories.push(null);//we push null in the arra if after remove categories, the array is empty
			$('#list-categories').find('.display-category').removeClass('undisplayed');
			$(e.currentTarget).parent().parent().find('i.display-category').removeClass('undisplayed');
		} else if(initial_length==app.postRequest.categories.length){//if we hadn't remove categories, it means we have to add the categories and the sub categories
			app.postRequest.categories.push(idCategory);
			$(e.currentTarget).parent().children('i.display-category').removeClass('undisplayed');
			$(e.currentTarget).parent().parent().find('i.display-category').removeClass('undisplayed');
			//we add here sub categories 
			var m = 0;
			var listChildren = this.model.get('children');
			_.each(listChildren,function(){
				if(app.postRequest.categories.indexOf(listChildren.models[m].id)<0){
				app.postRequest.categories.push(listChildren.models[m].id);
				}
				m++;
			});
			// cat_parent = this;
				
			
			} 
		}
	app.postRequest.trigger('refresh');
	
	

    },
    deleteCategory: function () {
        listCategories.remove(this.model);
        this.model.url = "/categories/delete/" + this.model.id
        Backbone.sync("delete", this.model);
        $('#list-categories').children().remove();
        new lily.listCategoriesView(listCategories);
    },
	showSubCategories:function(e){
		console.log('showSubCategories');
	/*Show, hide the list of sub categories, change orientation arrow*/
		if($(e.currentTarget).parent().children('ul.list-sub-categories').attr('class').search('hide')>0){
		/*we display the list sub-categories*/
			$(e.currentTarget).parent().children('ul.list-sub-categories').removeClass('hide');
			$(e.currentTarget).parent().children('i.lily-icon-arrow-down').removeClass('text').addClass('text-active');
			$(e.currentTarget).parent().children('i.lily-icon-arrow-up').removeClass('text-active').addClass('text');
		} else {
		/*we hide the list sub-categories*/
			$(e.currentTarget).parent().children('i.lily-icon-arrow-up').removeClass('text').addClass('text-active');
			$(e.currentTarget).parent().children('i.lily-icon-arrow-down').removeClass('text-active').addClass('text');
			$(e.currentTarget).parent().children('ul.list-sub-categories').addClass('hide');
		}

		var listSubCategories  = new lily.ListCategories;
		listSubCategories = this.children.clone();
		if(typeof(this.listSubCategoriesView)=='undefined'){
			this.listSubCategoriesView = new lily.ListSubCategoriesView($(e.currentTarget).parent().children('ul'),listSubCategories);
		}
		// if(this.listSubCategoriesView.collection.length!==this.children.length){
			// this.listSubCategoriesView.undeletegateEvents();
			// this.listSubCategoriesView.$el.empty();
		// }
		
		
		 // listSubCategoriesView = new lily.ListSubCategoriesView($(e.currentTarget).parent().children('ul'),listSubCategories);
			
	}
});
