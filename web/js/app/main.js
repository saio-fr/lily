
require.config({
  baseUrl: '/js',
  paths: {
    'jquery'		: 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone'	: 'bower_components/backbone/backbone',
    'autobahn'	: 'vendor/autobahn-v1',
    'isMobile'	: 'bower_components/isMobile/isMobile',
    'Snap'			: 'bower_components/snapjs/snap',
    'Modernizr' : 'app/libs/modernizr-custom',
    'when'			: 'vendor/when',
    'FastClick' : 'bower_components/fastclick/lib/fastclick',
    'jquery-placeholder': 'bower_components/jquery-placeholder/jquery.placeholder'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    'autobahn': {
    	deps: ['when'],
    	exports: 'ab'
    },
    'Modernizr': {
    	exports: 'Modernizr'
    },
    'jquery-placeholder': { deps: ['jquery'] }
  }
});

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
], function( $, _, Backbone, ab, when, isMobile, app, config, SkeletonView, utils ) {

  'use strict';

  app.init = function () {

	  $.ajaxPrefilter( function (options) {
	    options.url = config.root + options.url;
	  });
	  config.isMobile = isMobile;
    config.sid = document.cookie.match('PHPSESSID=([^;]*)')[1];


	  app.skeleton = new SkeletonView();
		Backbone.history.start();
	};

	// Connect to our ws serv
	app.sess = ab.connect(

		'ws://ws.saio.fr/' + config.licence + '/chat', // The host

	  function(session) {  // Once the connection has been established
			app.ws = session;
			app.ws.subscribe('visitor/' + config.licence + '/' + config.sid, function (topic, payload) {});
			app.ws.call('chat/connect', {
				'href': top.location.href,
				'pathname': top.location.pathname
			}).then(function(result) {
				app.chatting = result.chatting;
				app.chatContactForm = result.showContactForm;
				app.init();
			}, function (err) {
				console.warn(err);
				app.init();
			});

		},

	  function(code, reason, detail) { // When the connection is closed
    	console.warn(code + reason + detail);
	  },

    { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
			'skipSubprotocolCheck': true,
			'maxRetries': 60,
			'retryDelay': 2000
	  }
	);

});