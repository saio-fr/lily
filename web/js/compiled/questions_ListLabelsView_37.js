lily.ListLabelsView = Backbone.View.extend ({
	

	el: '#menu-label',

	
	initialize: function () {
		//Keep track of the ChildViews in this array
		this.ChildViews = [];

		this.collection = new lily.ListLabels;
		
		this.render();
	},

	
	render: function () {
		
		var that = this;
		
		this.collection.each(function (item) {
			
			var labelView = new lily.LabelView({model: item});
			that.ChildViews.push(labelView);			
			
			//Insert the labels before the divider in the menu
			$('#menu-label .divider').before( labelView.render().el );
			// console.log($('#menu-label'));
		});
	
	},

	close: function () {
		this.unbind();
		this.remove();

		_.each(this.ChildViews, function (childview) {
			if (childview.close) {
				childview.close();
			}
		});
	},

});