
require.config({
  baseUrl: '/js',
  paths: {
    'jquery'		       : 'bower_components/jquery/dist/jquery',
    'underscore'       : 'bower_components/underscore/underscore',
    'backbone'	       : 'bower_components/backbone/backbone',
    'backbone-nested'  : 'bower_components/backbone-nested-model/backbone-nested',
    'wysihtml5'        : 'bower_components/wysihtml5/dist/wysihtml5-0.3.0',
    'wysihtml5-parser' : 'utils/wysihtml5-parser',
    'bootstrap'        : 'bower_components/bootstrap/dist/js/bootstrap',
    'moment'           : 'bower_components/moment/moment',
    'moment-fr'        : 'bower_components/moment/locale/fr',
    'easypiechart'     : 'bower_components/easypie/dist/jquery.easypiechart',
    'autobahn'	       : 'vendor/autobahn-v1',
    'Modernizr'        : 'app/libs/modernizr-custom',
    'when'			       : 'vendor/when',
    'app'              : 'backoffice/app',
    'globals'          : 'backoffice/globals',
    'todoTpl'          : 'todo',
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    'wysihtml5': {
    	deps: ['wysihtml5-parser'],
    	exports: 'wysihtml5'
    },
    'moment-fr': {
      deps: ["moment"],
    },
    'easypiechart': {
      deps: ["jquery"],
    },
    'autobahn': {
    	deps: ['when'],
    	exports: 'ab'
    },
    'bootstrap' : {
      deps: ['jquery']
    },
    'Modernizr': {
    	exports: 'Modernizr'
    },
    'globals' : {
      exports: 'globals'
    },
    'todoTpl' : {
      deps: ['jquery', 'bootstrap']
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "autobahn",
  "when",
  "app",
  "backoffice/chat/router",
  "backoffice/chat/views/connection/lost",
  "moment",
  "globals",

  // Libraries required at bootstrap for the UI.
  "Modernizr",
  "wysihtml5-parser",
  "wysihtml5",
  "todoTpl"
  // Autobahn V1 AMD broken.
], function( $, _, Backbone, ab, when, app, ChatRouter, ConnectionLostModal, moment, globals) {

  'use strict';

  // Set locale in moment JS
  moment.locale('fr');
  
  var connectionLostModal = new ConnectionLostModal();

  app.init = function () {
    app.router = new ChatRouter();
	};

	// Connect to our ws serv
	var sess = new ab.connect(
  	
		globals.wsserver + '/chat/' + globals.licence, // The host

	  function(session) {  // Once the connection has been established
			app.ws = session;
      app.init();	
		},

	  function(code, reason, detail) { // When the connection is closed
    	$('.js-modal-connection-lost').modal('show');
	  },

    { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
			'skipSubprotocolCheck': true,
			'maxRetries': 1000000,
			'retryDelay': 20
	  }
	);

});