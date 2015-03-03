/*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    globals = require('globals'),
    app = require('app'),
    LiveSkeletonView = require('backoffice/chat/views/live/skeleton'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
    ShortcutSkeletonView = require('backoffice/chat/views/shortcut/skeletonView'),

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
    },

    dashboard: function() {
      
      if (typeof(app.skeleton) !== 'undefined') {
        app.skeleton.remove();
      }
      
      app.skeleton = new DashboardSkeletonView({
        collection: app.users
      });
      
      this.toggleActiveTab("dashboard");
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
