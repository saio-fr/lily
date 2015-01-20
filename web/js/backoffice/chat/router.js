/*========================================
      Router
=========================================*/

define(function(require) {

  'use strict';

  var Backbone = require('backbone'),
    _ = require('underscore'),
    moment = require('moment'),
    globals = require('globals'),
    app = require('app'),
    timers = require('backoffice/chat/utils/timers'),
    SkeletonView = require('backoffice/chat/views/skeleton'),
    LiveSkeletonView = require('backoffice/chat/views/live/skeleton'),
    DashboardSkeletonView = require('backoffice/chat/views/dashboard/skeleton'),
    ModalView = require('components/modals/confirmView'),
    ModalModel = require('components/modals/model'),
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
      app.skeleton = new SkeletonView();
      app.skeleton.live = new LiveSkeletonView({
        collection: app.users
      });
      app.skeleton.dashboard = new DashboardSkeletonView({
        collection: app.users
      });

      app.ws.call('operator/connect').then(

        function(result) {

          if (result.available) {
            app.skeleton.available = true;
            app.skeleton.setAvailable();
          } else {
            app.skeleton.available = false;
            app.skeleton.setUnavailable();
          }

          // Get diff between server time and user to sync timers
          timers.serverTime = result.time - new moment().unix();

          // Start routing
          if (Backbone.History.started) {
            Backbone.history.stop();
          }
          Backbone.history.start();

        },
        function(error) {
          $('.js-modal-connection-lost').modal('show')
        }
      );

      app.ws.subscribe('operator/' + g.licence, function(topic, records) {
        app.users.set(records);

        // TO DELETE
        console.log(records);
      });

    },

    live: function() {

      if (app.available) {
        this.toggleActiveTab("live");
      } else {

        this.navigate('dashboard', {
          trigger: true
        });

        var modalModel = new ModalModel();
        modalModel.set(globals.modalConfirm.chatUnavailable);

        var modalUnavailableView = new ModalView({
          model: modalModel,
          appendEl: ".js-skeleton-container"
        });

        /* Listen to modal that prompt when attempting to
        access live view when the operator is unavailable */
        $('.modal-unavailable .js-modal-action').click(function() {
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
