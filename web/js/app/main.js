//Load common code that includes config, then load the app logic for this page.
require(['../common'], function(common) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "autobahn",
  "when",
  "isMobile",
  "app/app",
  "app/globals",
  "app/views/skeleton",
  "utils/pages",

  // Libraries required at bootstrap for the UI.
  "Snap",
  "Modernizr",
  'jquery-placeholder'
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, isMobile, app, config, SkeletonView,
    utils) {

    app.init = function() {

      $.ajaxPrefilter(function(options) {
        options.url = config.root + options.url;
      });
      config.isMobile = isMobile;

      app.skeleton = new SkeletonView();
      Backbone.history.start();
    };

    // Connect to our ws serv
    app.wsConnect = function(callback) {
      return ab.connect(

        config.wsserver + '/chat/' + config.licence, // The host

        function onconnect(session) { // Once the connection has been established

          // session stored and used in the "app" namespace;
          app.ws = session;

          app.connect().then(function(result) {
            callback(result);
            // Successfuly connected to ws server;
            // Show widget on host site:
            app.onConnect(result);
          }, function(err) {
            console.warn(err);
            app.trigger("status:connectionError");
            app.init();
          });

        },

        function onhangup(code, reason, detail) { // When the connection is closed
          console.warn(code + reason + detail);
          app.trigger('ws:connectionHangup');
        },

        { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
          'skipSubprotocolCheck': true,
          'maxRetries': 60,
          'retryDelay': 2000
        }
      );
    };

    function getSessionId() {
      var id = document.cookie.match('PHPSESSID=([^;]*)');
      if (id !== null && id.length) {
        id = id[1];
      } else {
        return '';
      }
      return id;
    }

    config.sid = getSessionId();

    app.wsConnect(function(result) {
      app.isUserInactive = false;
      app.chatting = result.chatting;
      app.chatContactForm = result.showContactForm;
      app.init();
    });

  });

});
