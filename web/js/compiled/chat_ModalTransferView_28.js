chat.Views.ModalTransfer = Backbone.View.extend({
	
	id: 'transfer',
	className: 'modal fade',
	template: _.template( $('#modal-transfer').html()),
	
	initialize: function(options) {
		this.options = options;	
		this.render();
	},
	
	render: function() {
		
		this.$el.html(this.template());
		this.$el.appendTo('#chat');
		this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
	    var self = this;

		if (_.isEmpty(this.collection)) {
			this.$el.find('.modal-body').html('Aucun opérateur disponible.');
		} else {
		
		    $.each(self.collection, function(index, operator) { // iterate through the collection
				var transferView = new chat.TransferView({model: operator, visitor: self.options.visitor}); 
				self.$el.find('.modal-body').append(transferView.el);
			});
			
		}

		this.$el.modal('show');
		return this;
	}
	
});