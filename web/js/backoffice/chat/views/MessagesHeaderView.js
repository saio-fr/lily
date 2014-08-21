chat.Views.MessagesHeader = Backbone.View.extend({
	
	tagName: 'p',
	className: 'conversation-date',
	template: _.template( $('#messages-header').html() ),
	
	initialize: function () {

    	this.render(); 

    },
    
    render: function () {
    
	    this.$el.html(this.template( this.model.toJSON() ));
	    
    },

	
});

