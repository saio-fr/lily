/*========================================
Dashboard Connected View
=========================================*/
	
chat.DashboardConnectedView = Backbone.View.extend({
		
	tagName: 'li',
	className: 'list-group-item',
			
    initialize: function () {
    
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#dashboard_connected').html());
	    this.$el.html( template() );
		this.$el.prependTo( '.list-connected' );
	    
    }
    
});