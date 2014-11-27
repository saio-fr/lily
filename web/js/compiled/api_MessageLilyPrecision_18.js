//var lily = lily || {};

// Message Model
// ----------
// 

lily.Models.MessageLilyPrecision = Backbone.Model.extend({
	
	// Default attributes ensure that each todo created has `title` and `completed` keys.
	defaults: {
		questions : [
			{id: '',
			 titre: ''}
		],
		idparent: ''
	}	
});
