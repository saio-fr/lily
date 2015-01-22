//Load common code that includes config, then load the app logic for this page.
require(['../common'], function(common) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap'

], function($, _, Backbone, UserRouter, g) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });
    var router = new UserRouter();

    // Start app router
    Backbone.history.start();
  });
});
