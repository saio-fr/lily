/*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone            = require('backbone'),
    _                     = require('underscore'),
    app                   = require('front/app'),
    api                   = require('front/data/api'),
    utils                 = require('utils/pages'),
    config                = require('front/globals'),
    AviView               = require('front/views/avi'),
    ChatView              = require('front/views/chat'),
    MailView              = require('front/views/mail'),
    FaqView               = require('front/views/faq'),
    Models                = require('front/data/models'),
    Collections           = require('front/data/collections'),
    ContentView           = require('front/views/content'),
    ChatWelcomeScreenView = require('front/views/welcomeScreen'),

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
      'faq/:parent/content/:id': 'content'
    },

    home: function() {

      this.navigate('/');
      if (config.chat.active &&
        config.home === 'chat' &&
        config.chatAvailable ||
        !app.isConversationClosed) {

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

      var view = new AviView();
      utils.goTo(view);

      app.pageView('/avi');
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
        app.pageView('/chat');
      }
    },

    welcomeScreen: function() {

      var view = new ChatWelcomeScreenView();
      utils.goTo(view);

      app.pageView('/welcomeScreen');
    },

    mail: function() {

      var view = new MailView();
      utils.goTo(view);

      app.pageView('/mail');
    },

    faq: function(id) {

      id = id || "NULL";
      var router = this,
        view;

      app.faqCollection = app.faqCollection || new Collections.Faqs();
      api.getFaqModel(id).then(function(model) {

        app.faqCollection.add(model);

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

      app.pageView('/faq/' + id);
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

      app.pageView('/faq/' + 'content/' + id);
    }
  });

  return Router;
});
