//var lily = lily || {};

/***********************
PAGE MAIL VIEW
***********************/

lily.Views.Mail = lily.Extensions.View.extend({
	
	events: {
	
        'click button': 'send',

    },
    
	//		el: '#lily-wrapper-page',
	model: lily.Models.Mail,
	template: _.template( $('#lily-page-mail-template').html() ),
	
	initialize: function() {
		$(this.render().el).appendTo('#lily-wrapper-page');
		this.errors = {};
	},
	
	render: function () {
		this.$el.html(this.template( ));
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	send: function () {
		
		this.from = this.$el.find('#from').val() || null;
		this.object = this.$el.find('#object').val() || null;
		this.msg = this.$el.find('#msg').val() || null;
		
		if (this.from == null) {
			this.$el.find('label.from').show();
			this.$el.find('input#from').addClass('warning');
			this.errors.from = true;
		} else {
			this.$el.find('input#from').removeClass('warning');
			this.$el.find('label.from').hide();
			this.errors.from = false;
		}
		
		if (this.object == null) {
			this.$el.find('label.object').show();
			this.$el.find('input#object').addClass('warning');
			this.errors.object = true;
		} else {
			this.$el.find('input#object').removeClass('warning');
			this.$el.find('label.object').hide();
			this.errors.object = false;
		}
		
		if (this.msg == null) {
			this.$el.find('label.msg').show();
			this.$el.find('textarea#msg').addClass('warning');
			this.errors.msg = true;
		} else {
			this.$el.find('textarea#msg').removeClass('warning');
			this.$el.find('label.msg').hide();
			this.errors.msg = false;
		}
		
		if (this.errors.from || this.errors.msg || this.errors.object) return;
		
		var that = this;
		
		$.ajax({
		
			type: 'POST',
			url: root+'/send/mail',
			data: { mail: that.from, object: that.object, msg: that.msg },
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {				
				
			}
			
		});
		
		lily.instance.router.navigate('mail/sent', {trigger: true});
		
	}
	
});