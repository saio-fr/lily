require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'backbone-nested': 'bower_components/backbone-nested-model/backbone-nested',
    'backbone-validation': 'bower_components/backbone-validation/index',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'moment': 'bower_components/moment/moment',
    'moment-fr': 'bower_components/moment/locale/fr',
    'statistics': 'utils/statistics',
    'flot': 'bower_components/flot.tooltip/js/jquery.flot',
    'flot-resize': 'bower_components/flot/jquery.flot.resize',
    'flot-tooltip': 'bower_components/flot.tooltip/js/jquery.flot.tooltip',
    'flot-time': 'bower_components/flot/jquery.flot.time',
    'daterangepicker': 'bower_components/bootstrap-daterangepicker/daterangepicker',
    'todoTpl': 'todo',
    'app': 'backoffice/app',
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
      exports: 'Backbone.NestedModel'
    },
    'backbone-validation': ['backbone'],
    'bootstrap' : ['jquery'],
    'daterangepicker' : ['jquery', 'bootstrap', 'moment'],
    'flot' : ['jquery'],
    'flot-time' : ['flot'],
    'flot-tooltip' : ['flot'],
    'flot-resize' : ['flot'],
    'todoTpl' : ['jquery', 'bootstrap']
  }
});

require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/statistics/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',
  'statistics'
  
], function( $, _, Backbone, StatisticsRouter, g ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = g.root + options.url;
  });
  
  // Set locale in moment JS
  moment.locale('fr');
  
  var router = new StatisticsRouter();

  // Start app router
  Backbone.history.start();
});
