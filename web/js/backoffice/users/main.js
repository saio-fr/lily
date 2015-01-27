//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'globals',
  'app',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap'

], function($, _, Backbone, UserRouter, g, app) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });

    app.init = function() {
      app.router = new UserRouter();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
