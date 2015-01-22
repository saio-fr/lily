require(['../common'], function(common) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/config/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl'
], function($, _, Backbone, ConfigRouter, globals) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    var router = new ConfigRouter();

    // Start app router
    Backbone.history.start();

  });
});
