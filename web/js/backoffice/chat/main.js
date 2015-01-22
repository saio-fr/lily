require(['../common'], function(common) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "autobahn",
  "when",
  "app",
  "backoffice/chat/data/collections",
  "backoffice/chat/router",
  'backoffice/chat/views/skeleton',
  "components/modals/confirmView",
  "components/modals/model",
  "backoffice/chat/views/connection/lost",
  'backoffice/chat/utils/timers',
  "moment",
  "globals",

  // Libraries required at bootstrap for the UI.
  "Modernizr",
  "wysihtml5-parser",
  "wysihtml5",
  "todoTpl"
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, app, Collections, ChatRouter, SkeletonView, ModalView,
    ModalModel, ConnectionLostModal, timers, moment, globals) {

    // Set locale in moment JS
    moment.locale('fr');

    var connectionLostModal = new ConnectionLostModal();

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.users = new Collections.Users();
      app.router = new ChatRouter();
    };

    // Connect to our ws serv
    app.wsConnect = function(callback) {
      return ab.connect(

        globals.wsserver + '/chat/' + globals.licence, // The host

        function onconnect(session) { // Once the connection has been established
          app.ws = session;

          app.connect().then(function(result) {
            callback(result);
            app.onConnect(result);
          }, function(err) {
            console.warn(err);
            app.trigger("status:connectionError");
          });
        },

        function onhangup(code, reason, detail) { // When the connection is closed
          console.warn(code + reason + detail);
          // Todo put that somewhere else
          app.trigger("status:connectionError");
        },

        { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
          'skipSubprotocolCheck': true,
          'maxRetries': 10000,
          'retryDelay': 1000
        }
      );
    };

    app.createModal = function(content, callback, context) {
      var modalModel, modalView;

      modalModel = new ModalModel();
      modalModel.set(content);

      modalView = new ModalView({
        model: modalModel,
        appendEl: ".js-skeleton-container"
      });

      $('.js-modal-action').on('click', function() {
        if (_.isFunction(callback)) {
          callback.apply(context, arguments);
          $('.js-modal-action').off('click');
        }
      });
    };

    app.wsConnect(function(result) {
      app.init();

      if (result.available) {
        app.skeleton.setAvailable();
      } else {
        app.skeleton.setUnavailable();
      }

      // Get diff between server time and user to sync timers
      timers.serverTime = result.time - new moment().unix();

      // Start routing
      if (Backbone.History.started) {
        Backbone.history.stop();
      }
      Backbone.history.start();
    });

  });
});
