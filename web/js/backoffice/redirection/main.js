require(['../common'], function(common) {

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

    app.skeleton = new SkeletonView();

  });
});
