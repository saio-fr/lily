'use strict';

require([
  'jquery',
  'underscore',
  'backbone',
  'autobahn',
  'when',
  'isMobile',
  'app/app',
  'app/globals',
  'app/views/skeleton',

  // Libraries required at bootstrap for the UI.
  'Snap',
  'Modernizr',
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, isMobile, app, config, SkeletonView, Snap, Modernizr) {

  app.init = function() {

    config.isMobile = isMobile;

    app.skeleton = new SkeletonView();

    if (config.isMobile) {
      app.onShowIframe();
    }

    // Backbone.history.start();
  };

  // Connect to our ws serv
  app.wsConnect = function(callback) {

    return when(ab.connect(

      // The host
      'ws://' + config.ws.host + '/chat/' + config.licence,

      function onconnect(session) { // Once the connection has been established

        // session stored and used in the "app" namespace;
        app.ws = session;

        app.connect().then(function(result) {
          callback(result);

          // Successfuly connected to ws server;
          // Show widget on host site:
          app.onConnect(result);
          app.trigger('chat:connected');
        },

        function(err) {
          console.warn(err);
          app.trigger('status:connectionError');
          app.init();
        });

      },

      function onhangup(code, reason, detail) { // When the connection is closed
        console.warn(code + reason + detail);
        app.trigger('ws:connectionHangup');
      },

      { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
        'skipSubprotocolCheck': true,
        'maxRetries': 0
      }
    ));
  };

  function getSessionId() {
    var sid = document.cookie.match('PHPSESSID=([^;]*)');

    if (sid && sid.length) {
      return sid[1];
    } else {
      // Oops the browser doesnt allow cookie :'(
      // Fall back to local storage
      try {
        sid = window.localStorage.getItem('sid');
        var date = new Date().getTime() * 1000000,
            rand = Math.floor((Math.random() * 10000) + 1);


        // IF it is the first visit, we generate a uniqid
        if (!sid) {
          sid = (date + rand).toString(16);
          window.localStorage.setItem('sid', sid);
        }
        return sid;

      } catch(error) {
        // Aie, no local storage eigher !!
        console.error(error);
        return null;
      }
    }
  }

  config.sid = getSessionId();
  if (!config.sid) {
    // We were unable to store an uniqid
    // We won't show the widget
    // To do: track this event;
    console.log('unable to generate uniqid');
    return;
  }

  app.wsConnect(function(result) {
    app.isConnectionActive = true;
    app.showContactForm = result.showContactForm;
    app.setIsConversationClosed(result.isConversationClosed);
    app.init();
  });

  app.onLoadApp();

  // On Dom loaded
  $(function() {

    // App loading in an iframe (on the host website)
    function appInIframe () {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }

    if (appInIframe()) {
      // Remove reduce icon
      $('body').addClass('embedded');
    }

    // Ugly, uuuuuugly hack to allow a div with contenteditable set to "true"
    // to work with typeahead:
    $.valHooks['contenteditable'] = {
      get: function(el) {
        return $(el).text();
      },

      set: function(el, val) {
        $(el).text(val);
      }
    };

    $.fn.myedit = function() {
      this.each(function() {
        this.type = 'contenteditable';
      });

      return this;
    };

    // Placeholder hack for contenteditable
    $(document).on('change keydown keypress input', '*[data-placeholder]', function() {
      if (this.textContent) {
        this.setAttribute('data-div-placeholder-content', 'true');
      } else {
        this.removeAttribute('data-div-placeholder-content');
      }
    });
  });

});
