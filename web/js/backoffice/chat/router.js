            /*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    app = require('app'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeletonView'),
    ShortcutSkeletonView = require('backoffice/chat/views/shortcut/skeletonView'),
    Collections = require('components/chat/data/collections'),

    // Object wrapper returned as a module
    Router;

  Router = Backbone.Router.extend({

    routes: {
      '': 'dashboard',
      '/': 'dashboard',
      'dashboard': 'dashboard',
      'shortcut': 'shortcut'
    },

    initialize: function() {

      if (!app.chatUsers || !app.chatUsers instanceof Backbone.Collection) {
        app.chatUsers = new Collections.Users();
      }

      $('.live-nav').on('click', function() {
        app.showLiveChat();
      });
    },

    dashboard: function() {
      
      if (app.skeleton) {
        app.skeleton.remove();
      }

      app.skeleton = new DashboardSkeletonView({
        collection: app.chatUsers       
      });
      
      this.toggleActiveTab('dashboard');
      app.pageView('/chat/dashboard');
    },
    
    shortcut: function () {
      
      if (app.skeleton) {
        app.skeleton.remove();
      }
      
      app.skeleton = new ShortcutSkeletonView({});
      
      this.toggleActiveTab('shortcut');
      app.pageView('/chat/shortcut');
    },

    toggleActiveTab: function(next) {
      
      $('.nav-tabs .active').removeClass('active');
      $('.' + next + '-nav').addClass('active');
    }

  });

  return Router;
});
