define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "app",
  "globals",
  "backoffice/redirection/views/skeletonView",

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
], function($, _, Backbone, app, globals, SkeletonView) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView("/redirection");
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
