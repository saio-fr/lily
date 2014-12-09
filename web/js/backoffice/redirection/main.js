
require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'dateRangePicker': 'bower_components/bootstrap-daterangepicker/daterangepicker',
    'moment': 'bower_components/moment/moment',
    'todoTpl': 'todo',
    'flot': 'charts/flot/jquery.flot.min',
    'validator': '../bundles/fpjsformvalidator/js/fp_js_validator',
    'app': 'backoffice/app'
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
    },
    "dateRangePicker" : {
      "deps": ['jquery', 'bootstrap']
    },
    "flot" : {
      "deps": ['jquery']
    },
    "validator" : {
      "deps": ['jquery']
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "app",
  "backoffice/globals",
  "backoffice/redirection/views/skeletonView",

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
  "flot",
  "validator"
], function( $, _, Backbone, app, globals, SkeletonView ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = globals.root + options.url;
  });

  app.skeletonView = new SkeletonView();

});
