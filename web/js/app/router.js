/*========================================
      Router
=========================================*/

define(function(require) {

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
    Collections = require('app/data/collections'),
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
      'welcome-screen': 'welcomeScreen',
      'avi': 'avi',
      'mail': 'mail',
      'faq': 'faq',
      'faq/': 'faq',
      'faq/:parent': 'faq',
      'faq/:parent/content/:id': 'content',
      'top-questions': 'topQuestions',
      'top-questions/': 'topQuestions',
      'top-questions/:id': 'topQuestions'
    },

    initialize: function() {

    },

    home: function() {

      this.navigate('/');
      if (config.chat.active &&
        config.home === 'chat' &&
        config.chatAvailable ||
        app.chatting) {

        this.navigate('chat', {
          trigger: true
        });
      } else if (config.avi && config.avi.active) {
        this.navigate('avi', {
          trigger: true
        });
      } else {
        app.mailOnly = true;
        this.navigate('mail', {
          trigger: true
        });
      }
    },

    avi: function() {

      app.skeleton.collectionView = new MessagesCollectionView();
      var view = new AviView();
      utils.goTo(view);

      this.welcome = new Models.LilySimple({
        message_content: config.avi.welcomeMsg
      });
      this.message = new MessageLilySimpleView({
        model: this.welcome
      }).render();

      app.pageView("/avi");
    },

    chat: function() {

      var view;
      if (config.chat.contactForm && app.showContactForm) {
        this.navigate('welcome-screen', {
          trigger: true
        });
      } else {
        view = new ChatView();
        utils.goTo(view);
      }

      app.pageView("/chat");
    },

    welcomeScreen: function() {

      var view = new ChatWelcomeScreenView();
      utils.goTo(view);

      app.pageView("/welcomScreen");
    },

    mail: function() {

      var view = new MailView();
      utils.goTo(view);

      app.pageView("/mail");
    },

    faq: function(id) {

      id = id || "NULL";
      var router = this,
        view;

      app.skeleton.faqCollection = app.skeleton.faqCollection || new Collections.Faqs();
      api.getFaqModel(id).then(function(model) {

        app.skeleton.faqCollection.add(model);

        view = new FaqView({
          model: model
        });

        utils.goTo(view);
      }, function(err) {
        console.log(err);

        router.navigate('faq', {
          trigger: true
        });
      });

      app.pageView("/faq/" + id);
    },

    content: function(parent, id) {

      var router = this,
        faq, contentModel, view;

      api.getFaqModel(parent).then(function(model) {

        faq = _.find(model.get('faqs'), function(faq) {
          return faq.id.toString() === id;
        });

        contentModel = new Models.Content({
          parent: parent,
          id: id,
          title: faq.title,
          content: faq.content
        });

        view = new ContentView({
          model: contentModel
        });

        utils.goTo(view);

      }, function(err) {
        router.navigate('/', {
          trigger: true
        });
      });

      app.pageView("/faq/" + 'content/' + id);
    },

    topQuestions: function(id) {

      var router = this;
      id = id || "NULL";

      api.getTopQuestions(id)
        .then(function(data) {

          var view, model, question, reponse;

          if (!data) {
            router.navigate('/', {
              trigger: true
            });
            return;
          }

          if (id.toString() === "NULL") {

            model = new Models.TopQuestions({
              data: data
            });
            view = new TopQuestionsView({
              model: model
            });
          } else {

            view = new AviView();
            question = new Models.MessageUserSimple({
              message_content: data.title
            });
            reponse = new Models.MessageLilySimple({
              message_content: data.answer
            });
          }

          utils.goTo(view);

          if (question && reponse) {
            view.addItem(question, 'user-simple');
            view.addItem(reponse, 'lily-simple');
          }
        }, function(err) {
          router.navigate('/', {
            trigger: true
          });
        });

      app.pageView("/topQuestions");
    },

  });

  return Router;
});
