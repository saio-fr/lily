/***********************
PAGE HOME VIEW
***********************/

lily.Views.Home = lily.Extensions.View.extend({
	
	mood: '',
	messageModel: '',
	messageType: '',
	
	events: {
		'submit #lily-search-form': 'doSearch',
		'click #lily-go': 'doSearch'
	},	
	
	initialize: function() {
		
		this.$input = this.$('#lily-search-form input.lily-search-input');
		
		this.listenTo(this, 'render', this.avatar);
		
		lily.Events.on('precision', this.sendPrecision, this); /* On écoute l'evennement 'precision' d'une vue MessageLilyPrecision */
		lily.Events.on('satisfied', this.sendNotation, this); /* On écoute l'evennement 'satisfied' d'une vue MessageLilyNotation */
		lily.Events.on('notSatisfied', this.sendNotation, this); /* On écoute l'evennement 'notSatisfied' d'une vue MessageLilyNotation */
		lily.Events.on('redirectionTel', this.sendRedirectionTel, this); /* On écoute l'evennement 'redirectionTel' d'une vue MessageLilyRedirection */
		lily.Events.on('redirectionMail', this.sendRedirectionMail, this); /* On écoute l'evennement 'redirectionMail' d'une vue MessageLilyRedirection */
		
		$(this.render().el).appendTo('#lily-wrapper-page');
		
	},
	
	render: function () {
		
		var template= _.template( $('#lily-page-home-template').html());
		this.$el.html(template());
		this.trigger('render');
		$('input, textarea').placeholder();
		
		return lily.Extensions.View.prototype.render.apply(this, arguments);
	},
	
	doSearch: function (e) {
		
		e.preventDefault();
		
		this.$input = this.$el.find('#lily-search-form input.lily-search-input');
		var query = this.$input.val();
		
		if ( $.trim(query).length > 0 ){/*On vérifie que le champ n'est pas vide ou contient uniquement des espaces*/
			
			this.search( query );
			var messageModel = new lily.Models.MessageUserSimple ({message_content: this.$input.val()});
			this.addItem ( messageModel, 'user-simple');
			this.showLoading();
			
		}
		// clear the search field
		this.clearInput();
	},
	
	search: function ( q ) {
		
		var home = this;		
		
		$.ajax({
			type: 'POST',
			url: root+'/query',
			data: { query: q },
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
				
				var type = request.getResponseHeader('type');
				
				home.clearLoading();
				
				if ( !data ) {
					this.trigger( 'emptySearch' );
				}
				if ( type === 'insult' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data});
					var messageType = 'lily-simple';
					home.mood = 'angry';
					home.addItem( messageModel, messageType );
					
				}
				if ( type === 'answer' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					home.addItem( messageModel, messageType );
					var messageModel = new lily.Models.MessageLilyNotation ({ id: data.id });
					var messageType = 'lily-notation';
					home.mood = data.mood;
					home.addItem( messageModel, messageType );
					
				}
				if ( type === 'personal' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					home.mood = data.mood;
					home.addItem( messageModel, messageType );
					
				}
				if ( type === 'misunderstood' ) {
				
					var messageModel = new lily.Models.MessageLilySimple ({message_content: "Désolé, je n\'ai pas compris votre question."});
					var messageType = 'lily-simple';
					home.addItem( messageModel, messageType );
					if (data.isMail || data.isTel || data.isChat) {
					
						var messageModel = new lily.Models.MessageLilyRedirection ({data: data});
						var messageType = 'lily-redirection';
						home.mood = 'sceptical';
						home.addItem( messageModel, messageType );
						
					}
				}
				if (( type === 'precision' )) {
				
					var messageModel = new lily.Models.MessageLilyPrecision ({actions: data.actions, precision: data.parent.answer, idparent: data.parent.id});
					var messageType = 'lily-precision';
					home.mood = data.mood;
					home.addItem( messageModel, messageType );
					
				}
				
			}
			
		});
		
	},
	
	sendPrecision: function( id, idparent, parent) {
		
		var home = this;
		
		$.ajax({
			url: root+'/precision/'+id,
			data: id,
			//			dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
				console.log(data);
				
				var type = request.getResponseHeader('type');
				console.log (type);
				
				home.clearLoading();
				
				if ( !data ) {
					this.trigger( 'emptySearch' );
					home.clearLoading();
				}
				if ( type === 'answer' ) {
					var messageModel = new lily.Models.MessageLilySimple ({message_content: data.answer});
					var messageType = 'lily-simple';
					home.addItem( messageModel, messageType );
					var messageModel = new lily.Models.MessageLilyNotation ({ id: idparent });
					var messageType = 'lily-notation';
					home.addItem( messageModel, messageType );
				}
				
				// Delete the parent bubble
				//parent.remove();
			}
		});
	},
	
	sendRedirectionMail: function(id) {
		
		var id = id;
		$.ajax({
			
			type: 'POST',
			url: root+'/logredirection/'+id,
			data: JSON.stringify({ canal: 'mail' }),
			success:  function( data ) {console.log('Log sent')}
			
		});
	},
	
	sendRedirectionTel: function(id) {
		
		var id = id;
		$.ajax({
			
			type: 'POST',
			url: root+'/logredirection/'+id,
			data: JSON.stringify({ canal: 'tel' }),
			success:  function( data ) {console.log('Log sent')}
			
		});
	},
	
	sendNotation: function( id, satisfied, reason, view ) {
		var home = this;
		var id = id;

		$.ajax({
			
			type: 'POST',
			url: root+'/notation/'+id,
			data: JSON.stringify({ satisfied: satisfied, reason: reason }),
			// dataType: 'jsonp',
			success:  function( data, textStatus, request ) {
				
				if ( satisfied == true ){
					var messageModel = new lily.Models.MessageLilySimple ({message_content: "Merci pour votre réponse! N\'hesitez pas à me poser d'autres questions"});
					var messageType = 'lily-simple';
				}
				else {
					var messageModel = new lily.Models.MessageLilyRedirection ({data: data});
					var messageType = 'lily-redirection';
					
				}
				home.addItem( messageModel, messageType );
				view.remove();
				
			}
			
		});
	},
	
	addItem: function( messageModel, messageType) {
		
		// remove waiting message if exists.
		
		// create an instance of the sub-view to render the single message item.
		switch ( messageType ) {
			case 'user-simple':
				var message = new lily.Views.MessageUserSimple({
					model: messageModel
				}).render();
				break;
			case 'lily-simple':	
				var message = new lily.Views.MessageLilySimple({
					model: messageModel
				}).render();
				break;
			case 'lily-redirection':
				var message = new lily.Views.MessageLilyRedirection({
					model: messageModel
				}).render();
				break;
			case 'lily-precision':	
				var message = new lily.Views.MessageLilyPrecision({
					model: messageModel
				}).render();
				break;
			case 'lily-notation':
				var message = new lily.Views.MessageLilyNotation({
					model: messageModel
				}).render();
				break;
			case 'lily-completion':	
				var message = new lily.Views.MessageLilyCompletion({
					model: messageModel
				}).render();
				break;
		}
	},
	
	
	showLoading: function() {
		
		this.$('#lily-box-messages').append(
			'<div class="lily-msg-avatar lily-cst-msg-avatar lily-message-show"><p class="lily-loading"><span></span><span></span><span></span></p><i class="lily-avatar-bubble"></i></div>');
		
	},
	
	clearInput: function() {
		
		if (isMobile.phone){
			this.$input.val('').blur();
		}
		else this.$input.val('');
		
	},
	
	clearLoading: function() {
		
		if ( this.$('.lily-loading').length ) {
			setTimeout(function(){
				this.$('.lily-loading').parent().fadeOut(function(){ $(this).remove(); });
			},500);
		}
		
	},
	
	emptySearch: function() {
		
		this.clearLoading();
		// Append and display the new message.
		var model = new lily.Models.MessageLilySimple({message_content: 'Il semblerait qu\'il y ait un problème. Je n\'ai pas trouvé de réponse à votre question'});
		this.message = new lily.Views.MessageLilySimple ({model: model}).render();
		
	},

    avatar: function() {
    	
    	
    	// On charge l'avatar du client
    	home = this;
    	setTimeout(function() {
	    	$.getScript( root+'/avatar', function( data ) {});
    	}, 500);

    }
	
});