/***********************
INFORMATIONS VIEW
***********************/
chat.Views.Informations = Backbone.View.extend({
	
	tagName: 'aside',
	className: 'vbox bg-white aside-chat-right',
	
    events: {
		'click .informations-header .icon-angle-right': 'reduce',
		'click .informations-header .icon-angle-left': 'extend'
	},	
	
	initialize: function() {	
		this.render();
	},
	
	render: function () {
		
		var template= _.template( $('#informations').html());
		this.$el.html(template());
		
		this.$el.appendTo( '#live' );
		
		return Backbone.View.prototype.render.apply(this, arguments);
	},
	
	reduce: function() {
		
		this.$el.find('.informations-header h5').hide();
		this.$el.find('.informations-section').hide();
		this.$el.find('.informations-header .icon-angle-right').addClass('hide');
		this.$el.find('.informations-header .icon-angle-left').removeClass('hide');
		this.$el.width('50');
		
		chat.app.setWindows();
		
	},
	
	extend: function() {
		
		this.$el.find('.informations-header h5').show();
		this.$el.find('.informations-section').show();
		this.$el.find('.informations-header .icon-angle-right').removeClass('hide');
		this.$el.find('.informations-header .icon-angle-left').addClass('hide');
		this.$el.width('275');
		
		chat.app.setWindows();
		
	}
	
});