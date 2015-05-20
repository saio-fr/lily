require.config({
  baseUrl: '/js',
  urlArgs: 'v=1.2',
  paths: {
    'jquery':             'bower_components/jquery/dist/jquery',
    'underscore':         'bower_components/underscore/underscore-min',
    'backbone':           'bower_components/backbone/backbone',
    'autobahn':           'vendor/autobahn-v1',
    'isMobile':           'bower_components/isMobile/isMobile.min',
    'Snap':               'bower_components/snapjs/snap.min',
    'Modernizr':          'app/libs/modernizr-custom',
    'when':               'vendor/when',
    'FastClick':          'bower_components/fastclick/lib/fastclick',
    'synapse':            'app/libs/synapse-suggest',
    'bloodhound':         'app/libs/bloodhound',
    'typeahead':          'app/libs/typeahead'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'autobahn': {
      deps: ['when'],
      exports: 'ab'
    },
    'Modernizr': {
      exports: 'Modernizr'
    },
    'synapse_suggest': {
      deps: ['jquery', 'typeahead', 'bloodhound'],
      exports: 'synapse_suggest'
    },
    'typeahead': {
      deps: ['jquery'],
      exports: 'Typeahead'
    },
    'bloodhound': {
      deps: ['jquery'],
      exports: 'Bloodhound'
    }
  }
});

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
  'utils/pages',

  // Libraries required at bootstrap for the UI.
  'Snap',
  'Modernizr',

  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, isMobile, app, config, SkeletonView,
  utils) {

  'use strict';

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
    return ab.connect(

      'ws://' + config.ws.host + '/chat/' + config.licence,

 // The host

      function onconnect(session) { // Once the connection has been established

        // session stored and used in the "app" namespace;
        app.ws = session;

        app.connect().then(function(result) {
          callback(result);

          // Successfuly connected to ws server;
          // Show widget on host site:
          app.onConnect(result);
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
        'maxRetries': 10000,
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
    app.showContactForm = result.showContactForm;
    app.init();
  });

  app.onLoadApp();

  $(function() {
    // Ugly, uuuuuugly hack to allow a div with contenteditable set to "true"
    // to work with typeahead:
    $.valHooks['contenteditable'] = {
      get: function(el) {
        return $(el).html();
      },

      set: function(el, val) {
        $(el).html(val);
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
