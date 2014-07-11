lily.Views.MessageLilyCompletion = lily.Views.MessageView.extend({
	
	className: 'lily-msg-reporting lily-cst-msg-reporting',
	
	model: lily.Models.MessageLilyCompletion,
	
	template: _.template( $('#lily-message-completion').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerCompletion );
	},
	
	triggerCompletion: function () {
		var view = this;
		this.$('.lily-precision-list').on( 'click', function() {
			var id = view.model.get('id');
			if ( $(this).hasClass('lily-completion-incomplete') ) {
				
				lily.Events.trigger('satisfied', id, 'false', 'incomplete', view);
				
			}
			if ( $(this).hasClass('lily-completion-incorrect') ) {
				
				lily.Events.trigger('satisfied', id, 'false', 'incorrect', view);
				
			}
			else return false;
			$(this).off('click');
		});
	}
	
});