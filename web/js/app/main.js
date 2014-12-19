
require.config({
  baseUrl: '/js',
  paths: {
    'jquery'		: 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone'	: 'bower_components/backbone/backbone',
    'autobahn'	: 'bower_components/autobahn/autobahn',
    'isMobile'	: 'bower_components/isMobile/isMobile',
    'snap'			: 'bower_components/snapjs/snap',
    'Modernizr' : 'app/libs/modernizr-custom'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "autobahn",
  "isMobile",
  "app/app",
  "app/globals",
  "app/views/skeleton",

  // Libraries required at bootstrap for the UI.
  "snap",
  "Modernizr"
], function( $, _, Backbone, ab, isMobile, app, config, SkeletonView ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = config.root + options.url;
  });

  app.skeleton = new SkeletonView();
	Backbone.history.start();

	// Connect to our ws serv
	var connection = new ab.Connection({
		url: 'ws://ws.saio.fr/' + config.licence + '/chat' // The host
	});

	connection.onOpen = function (session) {  // Once the connection has been established

			app.ws = session;
			app.ws.subscribe('visitor/' + config.licence + '/' + config.sid, function (topic, payload) {});
			app.ws.call('chat/connect', {
				'href': top.location.href,
				'pathname': top.location.pathname
			}).then(function(result) {
				app.chatting = result.chatting;
				app.chatContactForm = result.showContactForm;
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
	};

	// Snap is global on the window object
	var snapper = new Snap({
		element: document.getElementById('lily-wrapper-page'),
		disable: 'right',
		slideIntent: 30,
		minDragDistance: 50,
		touchToDrag: false
	});

	/***********************
		MENU (Snap.js)
	***********************/

	$(function() {
		$('.lily-bt-menu').each(function(){

			$(this).on('click', function(){
				if(snapper.state().state === "left"){
					snapper.close();
				} else {
					snapper.open('left');
				}
			});
		});

		$('.lily-menu-body li a').click(function() {
			snapper.close();
		});
	});

	// Event listener for mobile
	if (isMobile.phone) {
		$('#icon-iframe-close').click(function(){ open("/", '_self').close(); });
		$('#icon-iframe-fullscreen').css('display', 'none');
	}

});