//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "globals",
  "app",
  "backoffice/faq/router",
  // "components/notifications/notifsView",

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

    app.init = function() {
      app.router = new Router();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {
      // app.skeleton.notifsView = new NotifsView();
    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
