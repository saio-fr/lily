//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/profile/router',
  'globals',
  'app',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',
  'statistics'

], function($, _, Backbone, ProfileRouter, g, app) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.router = new ProfileRouter();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
