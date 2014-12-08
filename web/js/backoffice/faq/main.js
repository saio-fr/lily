
require.config({
  baseUrl: '/js',
  paths: {
    'jquery': 'bower_components/jquery/dist/jquery',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
    'dateRangePicker': 'bower_components/bootstrap-daterangepicker/daterangepicker',
    'sortable': 'bower_components/jquery-sortable/source/js/jquery-sortable-min',
    'wysihtml5': 'bower_components/wysihtml5/dist/wysihtml5-0.3.0.min',
    'bootstrap-wysihtml5': 'bower_components/bootstrap-wysihtml5/dist/bootstrap-wysihtml5-0.0.2',
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
    "sortable" : {
      "deps": ['jquery']
    },
    "bootstrap-wysihtml5" : {
      "deps": ['wysihtml5', 'bootstrap']
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
  "backoffice/globals",
  "app",
  "backoffice/faq/router",

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
  "validator",
  "sortable",
  "wysihtml5",
  "bootstrap-wysihtml5"
], function( $, _, Backbone, globals, app, Router ) {

  'use strict';

  $.ajaxPrefilter( function (options) {
    options.url = globals.root + options.url;
  });

  // save method to take collection url instead of the model root's Url.
  // Hacky but works.
  Backbone.Model.prototype.saveFaq = function(key, value, options) {

    options = options || {};
    var attributes;

    if (_.isObject(key) || key == null) {
        attributes = key;
    } else {
        attributes = {};
        attributes[key] = value;
    }

    var model = this;

    if (model.collection && model.collection.url) {
      options.url = model.collection.url;
    }

    return Backbone.Model.prototype.save.call(model, attributes, options);
  };

  app.router = new Router();
  // Start app router
  Backbone.history.start();
});
