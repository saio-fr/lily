require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'backbone-nested': 'bower_components/backbone-nested-model/backbone-nested',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'dropzone': 'bower_components/dropzone/downloads/dropzone',
    'moment': 'bower_components/moment/moment',
    'todoTpl': 'todo',
    'app': 'backoffice/users/app',
    'globals': 'backoffice/globals'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone-nested': {
      deps: ['backbone'],
      exports: ['Backbone.NestedModel']
    },
    'bootstrap' : {
      deps: ['jquery']
    },
    'todoTpl' : {
      deps: ['jquery', 'bootstrap']
    }
  }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl'
], function( $, _, Backbone, UserRouter, g ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = g.root + options.url;
  });
  var router = new UserRouter();

  // Start app router
  Backbone.history.start();
});
