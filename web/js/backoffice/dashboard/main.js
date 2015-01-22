require(['../common'], function(common) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'backoffice/dashboard/views/skeletonView',
  'globals',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',

], function($, _, Backbone, app, SkeletonView, g) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    app.skeleton = new SkeletonView();

    // Start app router
    Backbone.history.start();
  });
});
