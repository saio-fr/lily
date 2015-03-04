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

      if (!app.chatUsers || !app.chatUsers instanceof Backbone.Collection) {
        app.chatUsers = new Collections.Users();
      }

      app.skeleton.dashboard = new DashboardSkeletonView({
        collection: app.chatUsers       
      });

      $('.live-nav').on('click', function() {
        $('#chatModal').modal('show');
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
