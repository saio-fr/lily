
lily.Views.MessageLilyRedirection = lily.Views.MessageView.extend({
	
	className: 'lily-msg-redirection lily-cst-msg-redirection',
	
	template: _.template( $('#lily-message-redirection').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerRedirectionTel );
		this.listenTo( this, 'render', this.triggerRedirectionMail );
	},
	
	redirectionMail: function() {
		
		$.ajax({
			
			type: 'POST',
			url: 'http://saio.fr/web/app_dev.php/api/'+key+'/redirection/'+this.model.get('data').id+'/mail',
			data: 'mail',
			success:  function( data ) {console.log('Log sent')}
			
		});
		
	},
	
	triggerRedirectionTel: function () {
		var view = this;
		this.$('.lily-redirection-tel').on( 'click', function() {
			var id = view.model.get('data').id;
			lily.Events.trigger('redirectionTel', id, 'true', '', view);
			$(this).off('click');
		});
	},
	
	triggerRedirectionMail: function () {
		var view = this;
		this.$('.lily-redirection-mail').on( 'click', function() {
			var id = view.model.get('data').id;
			lily.Events.trigger('redirectionMail', id, 'true', '', view);
			$(this).off('click');
		});
	}
	
});