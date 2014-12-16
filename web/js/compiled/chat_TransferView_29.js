/*========================================
Dashboard Connected View
=========================================*/
	
chat.TransferView = Backbone.View.extend({
		
	tagName: 'li',
	className: 'list-group-item',
	
	events: {
		'click .media' : 'select',
		'click .btn-danger' : 'unselect',
		'click .btn-success' : 'transfer'
	},	
			
    initialize: function (options) {
    
    	this.options = options;
    	this.render(); 
    	
    },
    
    render: function () {
    
	    var template= _.template( $('#transfer-view').html());
	    this.$el.html( template(this.model.toJSON()) );
	    
    },
    
    select: function () {
	    
	    this.$el.find('.media').addClass('hide');
	    this.$el.find('.validate').removeClass('hide');
	    
    },
    
    unselect: function () {
	    
	    this.$el.find('.media').removeClass('hide');
	    this.$el.find('.validate').addClass('hide');
	    
    },
    
    transfer: function () {

	    sess.call('chat/transfer', { sid: this.options.visitor.get('id'), operator: this.model.get('id')} );
	    this.options.visitor.trigger('minus');
	    
    }
    
});