chat.Operators = Backbone.Collection.extend({
	
	model: chat.Models.Operator,
	url: 'users',
	
    initialize: function () {

    },

});