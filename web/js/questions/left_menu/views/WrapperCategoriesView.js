/***************************************************
Wrapper list Categories
*******************************************************/
lily.WrapperCategoriesView = Backbone.View.extend({
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
		if(typeof(popupCategoryView)=='undefined'){//first time creation of the popup
		popupCategoryView=new lily.PopupCategoryView({model:new lily.Category});
		} else {
			if(typeof(popupCategoryView.model.id)!=='undefined'){
				//hide the current opened popup of an existing category
				popupCategoryView.undelegateEvents();
				popupCategoryView.$el.empty();
				popupCategoryView=new lily.PopupCategoryView({model : new lily.Category});
			} else { 
				// we hide the already opened popup of a new category
				popupCategoryView.undelegateEvents();
				popupCategoryView.$el.empty();
				popupCategoryView.$el.addClass('hide');
				delete popupCategoryView;
			}
		}

    // e.stopImmediatePropagation();
	},
	
});
