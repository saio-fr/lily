
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
    'flot': 'charts/flot/jquery.flot.all',
    'validator': '../bundles/fpjsformvalidator/js/fp_js_validator'
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
    "todo" : {
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