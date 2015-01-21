/*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    moment = require('moment'),
    globals = require('globals'),
    app = require('app'),
    timers = require('backoffice/chat/utils/timers'),
    LiveSkeletonView = require('backoffice/chat/views/live/skeleton'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
    Collections = require('backoffice/chat/data/collections'),

    // Object wrapper returned as a module
    Router;

  Router = Backbone.Router.extend({

    url: '',

    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'live': 'live'
    },

    initialize: function() {

      // Initialize Users Collection and global views
      app.users = new Collections.Users();
      app.skeleton.live = new LiveSkeletonView({
        collection: app.users
      });
      app.skeleton.dashboard = new DashboardSkeletonView({
        collection: app.users
      });
    },

    live: function() {

      if (app.available) {
        this.toggleActiveTab("live");
      } else {

        this.navigate('dashboard', {
          trigger: true
        });

        app.createModal(globals.modalConfirm.chatUnavailable, function() {
          app.skeleton.setAvailable();
          app.router.navigate('live', {
            trigger: true
          });
        });
      }
    },

    dashboard: function() {
      this.toggleActiveTab("dashboard");
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
