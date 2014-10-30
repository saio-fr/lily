$(function(){

	$.ajaxPrefilter(function (options) {
	    options.url = root + options.url;
	});
	var lily = lily || {};
	
	/*================================
	  Model Config
	====================================*/
	
	lily.Config = Backbone.Model.extend({
		
		url: "/get",
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

		    if (this.$el.find('input[name="home"]').length > 0) {
		    	if ( this.$el.find('input[name="home"]').is(':checked') ) { home = 'chat';}
				else { home = 'avi'; }
		    } else home = 'chat'; // If there is no avi, set chat by default
		    
		    aviIfNoOperator = this.$el.find('input[name="aviIfNoOperator"]').is(':checked');
		    chat = this.$el.find('input[name="chat"]').is(':checked');
		    faq = this.$el.find('input[name="faq"]').is(':checked');
		    topQuestions = this.$el.find('input[name="topQuestions"]').is(':checked');

		    this.model.set({'maintenance': maintenance});
		    this.model.set({'home': home});
		    this.model.set({'aviIfNoOperator': aviIfNoOperator});
		    this.model.set({'chat': chat});
		    this.model.set({'faq': faq});
		    this.model.set({'topQuestions': topQuestions});
		    
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
		    chatAutoSetOperator = this.$el.find('input[name="chatAutoSetOperator"]').is(':checked');
		    chatMax = this.$el.find('input[name="chatMax"]').val();
		    chatQueue = this.$el.find('input[name="chatQueue"]').is(':checked');
		    chatMaxQueue = this.$el.find('input[name="chatMaxQueue"]').val();
		    chatContactForm = this.$el.find('input[name="chatContactForm"]').is(':checked');
		    chatContactFormMsg = this.$el.find('div[name="chatContactFormMsg"]').text();
		    chatContactFirstNameField = this.$el.find('input[name="chatContactFirstNameField"]').is(':checked');
		    chatContactLastNameField = this.$el.find('input[name="chatContactLastNameField"]').is(':checked');
		    chatContactEmailField = this.$el.find('input[name="chatContactEmailField"]').is(':checked');
		    chatContactFormAvoidable = this.$el.find('input[name="chatContactFormAvoidable"]').is(':checked');
		    
		    this.model.set({'chatAutoSetOperator': chatAutoSetOperator});
		    this.model.set({'chatMax': chatMax});
		    this.model.set({'chatQueue': chatQueue});
		    this.model.set({'chatMaxQueue': chatMaxQueue});
		    this.model.set({'chatContactForm': chatContactForm});
		    this.model.set({'chatContactFormMsg': chatContactFormMsg});
		    this.model.set({'chatContactFirstNameField': chatContactFirstNameField});
		    this.model.set({'chatContactLastNameField': chatContactLastNameField});
		    this.model.set({'chatContactEmailField': chatContactEmailField});
		    this.model.set({'chatContactFormAvoidable': chatContactFormAvoidable});
		    
		    this.model.url = '/update';
		    
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
	
	  success: function() { new lily.ParametersView( { model: config } ); }	  
	  
	});	

});