/*========================================
      Router
=========================================*/

define(function (require) {

  'use strict';

  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app/app'),
      api = require('app/data/api'),
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
			MessagesCollectionView = require('app/views/messagesCollection'),

      // Object wrapper returned as a module
      Router;

  Router = Backbone.Router.extend({

		url: '',

		routes: {
			'': 'home',
			'home': 'home',
			'chat': 'chat',
			'avi' : 'avi',
			'mail': 'mail',
			'mail/sent': 'mailSent',
      'faq': 'faq',
      'faq/': 'faq',
      'faq/:parent': 'faq',
      'faq/:parent/content/:id': 'content',
      'top-questions': 'topQuestions',
      'top-questions/': 'topQuestions',
      'top-questions/:id': 'topQuestions'
		},

		home: function () {

			if ( config.chat.active &&
					 config.home === 'chat' &&
					 config.chatAvailable ||
					 app.chatting ) {

				this.chat();
			} else if (config.avi && config.avi.active){
				this.avi();
			} else {
        this.mail();
      }
		},

		avi: function () {

			app.skeleton.collectionView = new MessagesCollectionView();
			var view = new AviView();
			utils.goTo(view);

			this.welcome = new Models.LilySimple({
				message_content: config.avi.welcomeMsg
			});
			this.message = new MessageLilySimpleView({
				model: this.welcome
			}).render();
		},

		chat: function () {

			var view;
			if ( config.chat.contactForm ||
					 app.chatContactForm) {
				view = new ChatWelcomeScreenView();
			} else {
				view = new ChatView();
			}
			utils.goTo(view);
		},

		mail: function () {

			var view = new MailView();
			utils.goTo(view);
		},

		mailSent: function () {
			this.home();
		},

		faq: function ( parent ) {

			parent = parent || "NULL";

			api.getFaq(parent).then(function (data) {
				if (data) {
					var sortedData = _.indexBy(data.faqs, 'position'),
							view;

					app.skeleton.faqModel = new Models.Faq({
						parent: data.parent,
						title: data.title,
						faqs: sortedData
					});
					view = new FaqView({ model: app.skeleton.faqModel });

					utils.goTo(view);
				}
			}, function (err) {

			});
		},

		content: function ( parent, id ) {

			var router = this,
					faq, contentModel, view;

		  api.getFaqList(parent).then(function (faqs) {

	  		faq = _.find(faqs, function(faq) {
	        return faq.id.toString() === id;
	      });

	      contentModel = new Models.Content({
	        parent: parent,
	        title: faq.title,
	        content: faq.content
	      });

		    view = new ContentView({ model: contentModel });

		    utils.goTo(view);

		  }, function (err) {
			router.navigate('/', {trigger: true});
		  });
		},

		topQuestions: function ( id ) {

      var router = this;
      id = id || "NULL";

			api.getTopQuestions(id).then(function (data) {

        var view, model, question, reponse;

        if (!data) {
          router.navigate('/', {trigger: true});
          return;
        }

        if (id.toString() === "NULL") {

          model = new Models.TopQuestions({ data: data });
          view = new TopQuestionsView({ model: model });
        } else {

          view = new AviView();
          question = new Models.MessageUserSimple({
            message_content: data.title
          });
          reponse = new Models.MessageLilySimple ({
            message_content: data.answer
          });
        }

        utils.goTo(view);

        if (question && reponse) {
          view.addItem ( question, 'user-simple');
          view.addItem ( reponse, 'lily-simple');
        }
      }, function (err) {
        router.navigate('/', {trigger: true});
      });
		},

	});

	return Router;
});
