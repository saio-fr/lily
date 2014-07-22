chat.Views.ModalBan = Backbone.View.extend({
	
	id: 'close',
	className: 'modal fade',
	template: _.template( $('#modal-ban').html()),
	
	initialize: function() {		
		this.render();
	},
	
	render: function() {
		this.$el.html(this.template());
		this.$el.appendTo('#chat');
		this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
		this.$el.modal('show');
		return this;
	}
	
});