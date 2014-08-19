//var lily = lily || {};

/***********************
PAGE MAIL VIEW
***********************/

lily.Views.Mail = lily.Extensions.View.extend({
	
	events: {
	
        'click a': 'send',

    },
    
	//		el: '#lily-wrapper-page',
	model: lily.Models.Mail,
	template: _.template( $('#lily-page-mail-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
	},
	
	render: function () {
		this.$el.html(this.template( ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	send: function () {
		
		this.from = this.$el.find('#from').val();
		this.object = this.$el.find('#object').val();
		this.msg = this.$el.find('#msg').val();
		
		var that = this;
		
		$.ajax({
		
			type: 'POST',
			url: root+'/send/mail',
			data: { mail: that.from, object: that.object, msg: that.msg },
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {				
				
			}
			
		});
		
	}
	
});