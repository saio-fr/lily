//Load common code that includes config, then load the app logic for this page.
require(['../common'], function(common) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/statistics/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',

], function($, _, Backbone, StatisticsRouter, g) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    var router = new StatisticsRouter();

    // Start app router
    Backbone.history.start();
  });
});
