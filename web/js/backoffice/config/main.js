define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/config/router',
  'globals',
  'app',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl'

], function($, _, Backbone, ConfigRouter, globals, app) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.router = new ConfigRouter();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {
      // create chat notifsView
    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
