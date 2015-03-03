            /*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    app = require('app'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
    ShortcutSkeletonView = require('backoffice/chat/views/shortcut/skeletonView'),
    Collections = require('components/chat/data/collections'),

    // Object wrapper returned as a module
    Router;

  Router = Backbone.Router.extend({

    url: '',

    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'shortcut': 'shorcut'
    },

    initialize: function() {

      app.skeleton.dashboard = new DashboardSkeletonView({
        collection: app.chatUsers || new Collections.Users(app.chatUsersData || [])       
      });

      $('.live-nav').on('click', function() {
        app.showLiveChat();
      });
    },

    dashboard: function() {
      $('.dashboard-nav').addClass('active');
      app.skeleton.dashboard.$el.removeClass('hide');
      app.pageView("/chat/dashboard");
    },
    
    shortcut: function () {
      
      if (typeof(app.skeleton) !== 'undefined') {
        app.skeleton.remove();
      }
      
      app.skeleton = new ShortcutskeletonView({});
      
      this.toggleActiveTab("shortcut");
      app.pageView("/chat/shortcut");
    },

    toggleActiveTab: function(next) {
      var prev = next === "live" ? "dashboard" : "live";

      $('.nav-tabs .active').removeClass('active');
      $('.' + next + '-nav').addClass('active');
      app.skeleton[prev].$el.addClass('hide');
      app.skeleton[next].$el.removeClass('hide');
    }

  });

  return Router;
});
