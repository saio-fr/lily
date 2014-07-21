/*========================================
Parameters list
=========================================*/
	
chat.ParametersView = Backbone.View.extend({
		
	tagName: 'section',
	id: 'parameters-section',
	className: 'vbox stretch hide',
			
    initialize: function (records) {
    	
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#parameters').html());
	    this.$el.html( template() );
		this.$el.appendTo( '#chat-section' );
	    
    }
        
});