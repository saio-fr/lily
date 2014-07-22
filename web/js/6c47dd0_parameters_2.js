$(function(){

	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});
	var lily = lily || {};
	
	/*================================
	  Model Config
	====================================*/
	
	lily.Config = Backbone.Model.extend({
		
		url: "/config",
	    initialize: function () {	    	
	    },
		
	});
	
	/*======================================
	  View Modal
	=========================================*/
	
	lily.ModalView = Backbone.View.extend({
	
	    className: "modal fade",
	    template: _.template($('#modal').html()),
	    
	    initialize: function() {
			this.render();
	    },
	    render: function () {
	    
			this.$el.html(this.template());
			this.$el.appendTo('#administration');
			this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } )
			this.$el.modal('show');
			return this;
	        
	    }	
	
	});	
	
   /*======================================
	  View Parameters
	=========================================*/
	
	lily.ParametersView = Backbone.View.extend({
	
	    tagName:  "section",
	    className: "vbox",
	    template: _.template($('#parameters').html()),
	    
	    initialize: function() {
			this.render();
	    },
	    render: function () {
	    
	        this.$el.html(this.template(this.model.toJSON()));
	        this.$el.appendTo('#administration');
	        $('input[name="aviIfNoOperator"]').checkbox();
	        return this;
	        
	    },
	    events: {
	       'click #save' : 'save'
	    },
	    
	    save: function () {
		    
		    //  Overall
		    maintenance = !this.$el.find('input[name="maintenance"]').is(':checked');
		    
		    if ( this.$el.find('input[name="defaultCommunicationChannel"]').is(':checked') ) { defaultCommunicationChannel = 'chat';} 			else { defaultCommunicationChannel = 'avi' }
		    
		    aviIfNoOperator = this.$el.find('input[name="aviIfNoOperator"]').is(':checked');
		    chat = this.$el.find('input[name="chat"]').is(':checked');
		    faq = this.$el.find('input[name="faq"]').is(':checked');
		    topquestions = this.$el.find('input[name="topquestions"]').is(':checked');

		    this.model.set({'maintenance': maintenance});
		    this.model.set({'defaultCommunicationChannel': defaultCommunicationChannel});
		    this.model.set({'aviIfNoOperator': aviIfNoOperator});
		    this.model.set({'chat': chat});
		    this.model.set({'faq': faq});
		    this.model.set({'topquestions': topquestions});
		    
		    // Avi
		    aviWelcomeMsg = this.$el.find('div[name="aviWelcomeMsg"]').text();
		    aviAnimations = this.$el.find('input[name="aviAnimations"]').is(':checked');
		    redirectionTel = this.$el.find('input[name="redirectionTel"]').is(':checked');
		    redirectionMail = this.$el.find('input[name="redirectionMail"]').is(':checked');
		    redirectionChat = this.$el.find('input[name="redirectionChat"]').is(':checked');
		    
		    this.model.set({'aviWelcomeMsg': aviWelcomeMsg});
		    this.model.set({'aviAnimations': aviAnimations});
		    this.model.set({'redirectionTel': redirectionTel});
		    this.model.set({'redirectionMail': redirectionMail});
		    this.model.set({'redirectionChat': redirectionChat});
		    
		    // Chat
		    chatQueue = this.$el.find('input[name="chatQueue"]').is(':checked');
		    chatQueueLimit = this.$el.find('input[name="chatQueueLimit"]').val();
		    
		    this.model.set({'chatQueue': chatQueue});
		    this.model.set({'chatQueueLimit': chatQueueLimit});
		    
		    this.model.url = '/config/update';
		    
		    // Save the parameters
		    this.model.save(null, {
		      success: function() {
			      
			      mod = new lily.ModalView();
				  setTimeout(function() { mod.$el.modal('hide') }, 2500);  
				  
		      }
		    });	
		    
	    }
		
	});	

	config = new lily.Config();
	config.fetch({
	
	  success: function() {
	  		  console.log(config);
		  new lily.ParametersView( { model: config } );
		  
	  }	  
	  
	});	

});