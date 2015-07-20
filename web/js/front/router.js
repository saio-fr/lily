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
      'mail': 'mail'
    },

    home: function() {
      this.navigate('/');

      if (config.chat.active &&
        config.home === 'chat' &&
        config.chatAvailable ||
        !app.isConversationClosed) {

        this.navigate('chat', { trigger: true });
      } else if (config.avi && config.avi.active) {
        this.navigate('avi', { trigger: true });
      } else {
        app.mailOnly = true;
        this.navigate('mail', { trigger: true });
      }
    },

    avi: function() {
      var model = new Backbone.Model(config.avi),
          view = new AviView({ model: model});

      utils.goTo(view);
      app.trackPageView('Visitor saw page: Avi');
    },

    chat: function() {
      var view, model;

      if (config.chat.contactForm && app.showContactForm) {
        this.navigate('welcome-screen', { trigger: true });
      } else {
        model = new Backbone.Model(config.chat);
        view = new ChatView({ model: model });
        utils.goTo(view);
        app.trackPageView('Visitor saw page: chat');
      }
    },

    welcomeScreen: function() {
      var view = new ChatWelcomeScreenView();
      app.trackPageView('Visitor saw page: welcomeScreen');
      utils.goTo(view);
    },

    mail: function() {
      var view = new MailView();
      app.trackPageView('Visitor saw page: mail');
      utils.goTo(view);
    }

  });

  return Router;
});
