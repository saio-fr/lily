/*========================================
Dashboard Connected View
=========================================*/
	
chat.DashboardListConnectedView = Backbone.View.extend({
		
	tagName: 'ul',
	className: 'list-group alt',
			
    initialize: function () {
    
    	$(this.render().el).appendTo('.list-connected');
    	
    },
    
    render: function () {
    	var self = this;

	    $.each(self.collection, function(index, operator) { // iterate through the collection
			var connectedView = new chat.DashboardConnectedView({model: operator}); 
			self.$el.append(connectedView.el);
		});

		return this;
	    
    }
    
});