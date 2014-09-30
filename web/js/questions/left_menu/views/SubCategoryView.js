lily.SubCategoryView=Backbone.View.extend({
    model: lily.Category,
    template: _.template($('#item-sub-category').html()),
    tagName: 'li',
    className: 'wrapper-sub-category',
    render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		
        return this;
		
    },
	events :{
		'click .sub-category-item-list':'filter'
	
	},
	filter:function(e){
		console.log('filter sub categories');
		var idCategory = this.model.id;
		if(app.postRequest.categories[0]==null){
			app.postRequest.categories[0]=idCategory;
			$('#list-categories').find('i.display-category').addClass('undisplayed');
			$(e.currentTarget).parent().children('i.display-category').removeClass('undisplayed');	
			// $(e.currentTarget).parent().parent().parent().parent().children('i.display-category').removeClass('undisplayed')			
		} else {
		 var initial_length= app.postRequest.categories.length;
			var l = 0;
			_.each(app.postRequest.categories,function(){
				if(idCategory==app.postRequest.categories[l]){
				//we remove the categories to the list of categories to display
					app.postRequest.categories.splice(l,1);
					$(e.currentTarget).parent().children('i.display-category').addClass('undisplayed');
				}
			
			l++;
			});
		if(app.postRequest.categories.length=='0'){
			app.postRequest.categories.push(null);
			$('#list-categories').find('.display-category').removeClass('undisplayed');
		} else if(initial_length==app.postRequest.categories.length){
			app.postRequest.categories.push(idCategory);
			$(e.currentTarget).parent().children('i.display-category').removeClass('undisplayed');
			// $(e.currentTarget).parent().parent().parent().parent().children('i.display-category').removeClass('undisplayed')
		} 
		}
		app.postRequest.trigger('refresh');
	}

});