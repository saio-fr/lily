//Load common code that includes config, then load the app logic for this page.
require(['../common'], function(common) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/profile/router',
  'globals',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',
  'statistics'

], function($, _, Backbone, ProfileRouter, g) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    var router = new ProfileRouter();

    // Start app router
    Backbone.history.start();
  });
});
