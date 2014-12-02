require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'todoTpl': 'todo',
    'app': 'backoffice/config/app',
    'globals': 'backoffice/globals'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ["underscore", "jquery"],
      exports: 'Backbone'
    },
    "bootstrap" : {
      "deps": ['jquery']
    },
    "todoTpl" : {
      "deps": ['jquery', 'bootstrap']
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "backoffice/config/router",
  "globals",

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl"
], function( $, _, Backbone, ConfigRouter, globals ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = globals.root + options.url;
  });

  var router = new ConfigRouter();

  // Start app router
  Backbone.history.start();
});
