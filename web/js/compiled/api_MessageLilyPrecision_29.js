//var lily = lily || {};


// View
// --------------

lily.Views.MessageLilyPrecision = lily.Views.MessageView.extend({
	
	className: 'lily-msg-precision lily-cst-msg-precision',
	
	model: lily.Models.MessageLilyPrecision,
	
	template: _.template( $('#lily-message-precision').html()),
	
	initialize: function () {
		this.listenTo( this, 'render', this.triggerPrecision );
	},
	
	triggerPrecision: function () {
		var message = this;
		this.$('.lily-precision-list').on( 'click', function() { 
			var list_index = message.$( "li.lily-precision-list" ).index( $(this) );/* on récupère l'index de la question dans la liste (non, c'est pas très propre...) */
			var id = message.model.get('actions')[list_index].id;
			var idparent = message.model.get('idparent');
			lily.Events.trigger('precision', id, idparent, message);
			$(this).off( 'click' );
		})
	}
	
});

