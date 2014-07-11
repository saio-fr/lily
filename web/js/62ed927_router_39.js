// js/router/router.js

var lily = lily || {};

lily.Router = Backbone.Router.extend({
	
	url: '',
	
	routes: {
		'top-questions': 'topQuestions',
		'top-questions/': 'topQuestions',
		'top-questions/:id': 'topQuestions',
		'faq': 'faq',
		'faq/': 'faq',
		'faq/:id': 'faq',
		'faq/content/:id': 'content',
		'': 'home',
		'home': 'home',
		'chat': 'chat',
		'mail': 'mail',
		'mail/sent': 'mailSent'
	},
	
	home: function () {
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Home();
		lily.instance.goTo(view);
		
		this.welcome = new lily.Models.MessageLilySimple({message_content: aviWelcomeMsg});
		this.message = new lily.Views.MessageLilySimple ({model: this.welcome}).render();

	},
	
	mailSent: function () {
	
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Home();
		lily.instance.goTo(view);
		
		this.welcome = new lily.Models.MessageLilySimple({message_content: 'Votre message a bien été envoyé. Que puis-je faire pour vous ?'});
		this.message = new lily.Views.MessageLilySimple ({model: this.welcome}).render();
		
	},
	
	chat: function () {
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Chat();
		lily.instance.goTo(view);
	},

	mail: function () {
		if (typeof(view) !== 'undefined') {view.remove();}
		var view = new lily.Views.Mail();
		lily.instance.goTo(view);
	},
	
	faq: function ( id ) {
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var home = this;
		
		if (( id == '') || (id == undefined  ) || (id == '/' )) id = "NULL";
		
		$.ajax({
			
			url: root+licence+'/faq/'+id,
			
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
	
				if ( !data ) {
					
				}
				if ( data !== '' ) {
		
					/*Quand on a un enfant de type content, on change son id à content/id, 
					pour que l'url soit traitée différement par le router (methode content() */
					
					_.each(data.faqs, function(faq) { 
						if (faq.type === 'content'){
							var id = faq.id;
							faq.id = 'content/'+id;
						}
					});
					
					var sortedData = _.sortBy( data.faqs, data.faqs.position );

					var model = new lily.Models.Faq({ data: {parent: data.parent, title: data.title, faqs: sortedData } });
					var view = new lily.Views.Faq({ model: model });
					lily.instance.goTo(view);
					
				}
			}
		});
	},
	
	content: function ( id ) {
		
		var id = id;
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var home = this;
		
		$.ajax({
			
			url: root+licence+'/faq/'+id,
			
			success:  function( data, textStatus, request ) {
				// If there is no results we need to trigger a custom event to inform other objects.
				// This way other objects (views) can acts according to this event (display some kind of messages)
				console.log(data);				
				
				if ( !data ) {
					
				}
				if ( data !== '' ) {
					
					var idParent = data.parent;
					
			
					$.ajax({
						
						url: root+licence+'/faq/'+idParent,
						
						success:  function( data, textStatus, request ) {
							// If there is no results we need to trigger a custom event to inform other objects.
							// This way other objects (views) can acts according to this event (display some kind of messages)
							
							if ( !data ) {
								
							}
							if ( data !== '' ) {
							
								// console.log (_.find(data.faqs, function(obj) { return obj.id == id }));
								/*We find in the array data.faqs, children of the object "data" the right "title" and the right "content"*/
								var content = _.find(data.faqs, function(obj) { return obj.id == id }).content;
								var title = _.find(data.faqs, function(obj) { return obj.id == id }).title;

					// var title = data.title;
				
		
								// var model = new lily.Models.content({parent: idParent, title: title, content: content }); // Attention à la majuscule au C de content de lily.Models.Content
								var model = new lily.Models.Content({parent: idParent, title: title, content: content });
								var view = new lily.Views.Content({ model: model });
								lily.instance.goTo(view);
								
							}
						}
					});
				}
			}
		});
	},
	
	topQuestions: function ( id ) {
		
		if (typeof(view) !== 'undefined') {view.remove();}
		var home = this;
		
		if (( id == '') || (id == undefined  ) || (id == '/' )) { 
		
			$.ajax({
				
				url: root+licence+'/top-questions/NULL',
				
				success:  function( data, textStatus, request ) {
					// If there is no results we need to trigger a custom event to inform other objects.				
					
					if ( !data ) {
						
					}
					if ( data !== '' ) {
						
						var model = new lily.Models.TopQuestions({ data: data });
						var view = new lily.Views.TopQuestions({ model: model });
						lily.instance.goTo(view);
						
					}
				}
			});

		} else {

			$.ajax({
				
				url: root+licence+'/top-questions/'+id,
				
				success:  function( data, textStatus, request ) {
					// If there is no results we need to trigger a custom event to inform other objects.				
					
					if ( !data ) {
						
					}
					if ( data !== '' ) {
						
						var view = new lily.Views.Home();
						lily.instance.goTo(view);
						var question = new lily.Models.MessageUserSimple ({message_content: data.title});
						var reponse = new lily.Models.MessageLilySimple ({message_content: data.answer});
						view.addItem ( question, 'user-simple');
						view.addItem ( reponse, 'lily-simple');
						
					}
				}
			});
		}
		
	},

	
});