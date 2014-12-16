lily.ListVersionsView = Backbone.View.extend({

    tagName: 'ul',
//el = #wrapper-business-version
    
    className: '',


    id: 'list-versions',


    initialize: function () {
	 // listVersions = new lily.ListQuestions;
		// listVersions.url="/"+questionFullView.model.id+"/versions/get";
		// listVersions.fetch({async:false});
		// this.collection=listVersions.clone();
		// console.log(this.collection.length);
		this.collection = new lily.ListQuestions;
		this.collection.url="/"+questionFullView.model.id+"/versions/get";
		this.collection.fetch({async:false});
		var listVersions = this.collection.models[0].get('versions');
		this.collection.add(listVersions);
		this.collection.remove(this.collection.models[0]);
		
		
			listToComplete = new lily.ListQuestions;
		listToComplete=this.collection.clone();
		if(typeof(listToComplete.models[0].get('data').answer)=='undefined'){
			listToComplete.models[0].get('data').answer=questionFullView.model.get('answer');
		}
		if(typeof(listToComplete.models[0].get('data').mood)=='undefined'){
			listToComplete.models[0].get('data').mood=questionFullView.model.get('mood');
		}
		if(typeof(listToComplete.models[0].get('data').category)=='undefined'){
			if(questionFullView.model.get('category')!==null){
				listToComplete.models[0].get('data').category=questionFullView.model.get('category');
				// listToComplete.models[0].get('data').category.id=questionFullView.model.get('category').id;
				// listToComplete.models[0].get('data').category.title=questionFullView.model.get('category').title;
				// listToComplete.models[0].get('data').category.color=questionFullView.model.get('category').color;
			}
		}	
		/*We made a loop to create all the attributes on all versions item : */
		var l = 1;
		_.each(listToComplete,function(){
			if(l<5){
				if(typeof(listToComplete.models[l].get('data').category)=='undefined'){
					listToComplete.models[l].get('data').category=listToComplete.models[l-1].get('data').category;
				}
				if(typeof(listToComplete.models[l].get('data').answer)=='undefined'){
					listToComplete.models[l].get('data').answer=listToComplete.models[l-1].get('data').answer;
				}
				if(typeof(listToComplete.models[l].get('data').mood)=='undefined'){
					listToComplete.models[l].get('data').mood=listToComplete.models[l-1].get('data').mood;
				}
			}
			l++;
		});
		/*We make the loop to add color, and name of category from the id*/
		var m = 0 ; 
			_.each(listToComplete,function(){
				if(listToComplete.models[m].get('data').category!=null){
					var idCategory = listToComplete.models[m].get('data').category;
					console.log('idCategory '+idCategory);
					var colorCategory = app.listCategories.get(idCategory).get('color');
					var titleCategory = app.listCategories.get(idCategory).get('title');
					listToComplete.models[m].get('data').category.title=titleCategory;
					listToComplete.models[m].get('data').category.color=colorCategory;
				}
			
			m++;
			});
		
		
		
		
		
		
		this.collection=listToComplete.clone();
		
		
        this.ChildViews = [];
	// $('#management-questions .category-button-filter').append(listCategoryHeaderView.render().el);
    },
    events:{
	
	},

    render: function () {

        this.collection.each(function (version) {
            var versionView = new lily.VersionView({model: version});
            //push th subview in the array to be able to delete it in this.close function
            this.ChildViews.push(versionView);
            this.$el.append( versionView.render().el );           
        }, this);
        return this;

    },


    close: function () {
    
        this.unbind();
        this.remove();

        //Remove all the ChildView when removing this View
        _.each(this.ChildViews, function (childView) {
            if (childView.close) {
                childView.close();
            }
        });

    },

});

