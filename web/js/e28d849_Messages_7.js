chat.Messages = Backbone.Collection.extend({
	
	model: chat.Models.Message,
	
    initialize: function () {

    },
    
    defaults: {
		id: ''
	}

});