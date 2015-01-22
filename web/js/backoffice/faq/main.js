//Load common code that includes config, then load the app logic for this page.
require(['../common'], function(common) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "globals",
  "app",
  "backoffice/faq/router",

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
  "sortable",
  "wysihtml5",
  'wysihtml5-parser'

], function($, _, Backbone, globals, app, Router) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    // save method to take collection url instead of the model root's Url.
    // Hacky but works.
    app.router = new Router();
    // Start app router
    // Backbone.history.start() returns false if no route matches
    Backbone.history.start();
  });
});
