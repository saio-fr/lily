/***********************
INFORMATIONS VIEW
***********************/
chat.Views.Informations = Backbone.View.extend({
	
	tagName: 'aside',
	className: 'vbox bg-white aside-chat-right animated fadeInRight',
	
    events: {
		'click .informations-header .icon-angle-right': 'reduce',
		'click .informations-header .icon-angle-left': 'extend',
		'focusout input': 'update'
	},	
	
	initialize: function() {
		
		// Change the informations view if pages or questions changed
		this.listenTo(this.model, 'change:pages', this.render);
		this.listenTo(this.model, 'change:questions', this.render);
		
		this.render();
	},
	
	render: function () {
		
		var template= _.template( $('#informations').html());
		this.$el.html(template( this.model.toJSON() ));
		
		this.$el.appendTo( '#live' );
		
		if (chat.app.live.showInformations) this.extend();
		else this.reduce();
		
		return Backbone.View.prototype.render.apply(this, arguments);
	},
	
	reduce: function() {
		
		this.$el.find('.informations-header h5').addClass('hide');
		this.$el.find('.informations-section').addClass('hide');
		this.$el.find('.informations-header .icon-angle-right').addClass('hide');
		this.$el.find('.informations-header .icon-angle-left').removeClass('hide');
		this.$el.width('50');
		
		chat.app.live.showInformations = false;
		
	},
	
	extend: function() {
		
		this.$el.find('.informations-header h5').removeClass('hide');
		this.$el.find('.informations-section').removeClass('hide');
		this.$el.find('.informations-header .icon-angle-right').removeClass('hide');
		this.$el.find('.informations-header .icon-angle-left').addClass('hide');
		this.$el.width('275');
		
		chat.app.live.showInformations = true;
		
	},
	
	update: function(e) {
		
		this.firstname = this.$el.find('input[name="firstname"]').val();
		this.lastname = this.$el.find('input[name="lastname"]').val();
		this.email = this.$el.find('input[name="email"]').val();
		
		sess.call('chat/updateInformations', {sid: this.model.get('id'), firstname: this.firstname, lastname: this.lastname, email: this.email});
		
	}
	
});