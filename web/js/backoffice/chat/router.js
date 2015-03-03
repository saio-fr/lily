            /*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    app = require('app'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
    Collections = require('components/chat/data/collections'),

    // Object wrapper returned as a module
    Router;

  Router = Backbone.Router.extend({

    url: '',

    routes: {
      '': 'dashboard',
      'dashboard': 'dashboard',
      'live': 'live',
      'live/:id': 'live'
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
    }

  });

  return Router;
});
