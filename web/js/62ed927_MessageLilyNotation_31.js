lily.Views.MessageLilyNotation = Backbone.View.extend({
	
	className: 'lily-msg-reporting lily-cst-msg-reporting',
	
	model: lily.Models.MessageLilyNotation,
	
	template: _.template( $('#lily-message-notation').html()),
	events: {
		'click .lily-icon-thumb-up': 'satisfied',
		'click .lily-icon-thumb-down': 'notSatisfied'
	},
	
	initialize: function () {
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template( this.model.toJSON() ));
		this.$el.appendTo( '#lily-box-messages .lily-msg-avatar:last' );
		$( '#lily-box-messages .lily-msg-avatar:last' ).addClass('lily-notation-wrapper');
		return this;
	},
	
	satisfied: function () {

		lily.Events.trigger('satisfied', this.model.get('id'), true, '', this);
		
	},
	
	notSatisfied: function () {
	
		lily.Events.trigger('notSatisfied', this.model.get('id'), false, '', this);
		
	}
	
});