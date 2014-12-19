/*========================================
      Router
=========================================*/

define(function (require) {

  'use strict';

  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app/app'),
      utils = require('utils/pages'),
      config = require('app/globals'),
      AviView = require('app/views/avi'),
      ChatView = require('app/views/chat'),
      MailView = require('app/views/mail'),
      FaqView = require('app/views/faq'),
      Models = require('app/data/models'),
      ContentView = require('app/views/content'),
      TopQuestionsView = require('app/views/topQuestions'),
      MessageLilySimpleView = require('app/views/messageLilySimple'),
			ChatWelcomeScreenView = require('app/views/welcomeScreen'),

      // Object wrapper returned as a module
      Router;

  Router = Backbone.Router.extend({

		url: '',

		routes: {
			'/': 'home',
			'avi': 'avi',
			'chat': 'chat',
			'mail': 'mail',
			'mail/sent': 'mailSent',
			'top-questions/:id': 'topQuestions',
			'faq/:id': 'faq',
			'faq/content/:id': 'content'
		},

		home: function () {

			if ( config.chat.active &&
					 config.home === 'chat' &&
					 config.chatAvailable ||
					 app.chatting ) {

				this.chat();
			} else {
				this.avi();
			}
		},

		avi: function () {

			var view = new AviView();
			utils.goTo(view, utils.buttonCallback);

			this.welcome = new Models.MessageLilySimpleModel({
				messageContent: config.avi.welcomeMsg
			});
			this.message = new MessageLilySimpleView({
				model: this.welcome
			}).render();
		},

		chat: function () {
			var view;
			if ( config.chat.contactForm &&
					 app.chatContactForm) {
				view = new ChatWelcomeScreenView();
			} else {
				view = new ChatView();
			}
			utils.goTo(view, utils.buttonCallback);
		},

		mail: function () {

			var view = new MailView();
			utils.goTo(view, utils.buttonCallback);
		},

		mailSent: function () {

			this.home();
		},

		faq: function ( id ) {

			id = (id && id !== '/') ? id : "NULL";

			$.ajax({

				url: config.root + '/faq/'+id,

				success:  function ( data, textStatus, request ) {

					if (data) {
						/*Quand on a un enfant de type content, on change son id à content/id,
						pour que l'url soit traitée différement par le router (methode content() */
						_.each(data.faqs, function (faq) {
							if (faq.type === 'content') {
								faq.id = 'content/' + faq.id;
							}
						});

						var sortedData = _.sortBy(data.faqs, data.faqs.position),
								model = new Models.FaqModel({
									parent: data.parent,
									title: data.title,
									faqs: sortedData
								}),
								view = new FaqView({ model: model });

						utils.goTo(view, utils.buttonCallback);

					}
				}
			});
		},

		content: function ( id ) {

			$.ajax({

				url: config.root + '/faq/' + id,

				success:  function( data, textStatus, request ) {

					if (data) {
						var idParent = data.parent;

						$.ajax({
							url: config.root + '/faq/' + idParent,

							success:  function( data, textStatus, request ) {

								if (data) {
									/*
									We find in the array data.faqs,
									children of the object "data",
									the right "title" and the right "content"
									 */
									var content = _.find(data.faqs, function(obj) {
												return obj.id === id;
											}).content,

											title = _.find(data.faqs, function(obj) {
												return obj.id === id;
											}).title,

											model = new Models.ContentModel({
												parent: idParent,
												title: title,
												content: content
											}),

											view = new ContentView({ model: model });

									utils.goTo(view, utils.buttonCallback);
								}
							}
						});
					}
				}
			});
		},

		topQuestions: function ( id ) {

			if ( !id || id === '/' ) {
				$.ajax({

					url: config.root + '/top-questions/NULL',

					success:  function( data, textStatus, request ) {
						// If there is no results we need to trigger a
						// custom event to inform other objects.

						if (data) {
							var model = new Models.TopQuestions({ data: data });
							var view = new TopQuestionsView({ model: model });

							utils.goTo(view, utils.buttonCallback);
						}
					}
				});

			} else {

				$.ajax({

					url: config.root + '/top-questions/' + id,

					success:  function( data, textStatus, request ) {
						if (data) {

							var view = new AviView(),
									question = new Models.MessageUserSimple({
										messageContent: data.title
									}),
									reponse = new Models.MessageLilySimple ({
										messageContent: data.answer
									});

							utils.goTo(view, utils.buttonCallback);
							view.addItem ( question, 'user-simple');
							view.addItem ( reponse, 'lily-simple');
						}
					}
				});
			}

		},

	});

	return Router;
});