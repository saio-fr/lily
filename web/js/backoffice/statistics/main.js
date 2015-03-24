//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/statistics/router',
  'globals',
  'app',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',

], function($, _, Backbone, StatisticsRouter, globals, app, LiveChat) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.router = new StatisticsRouter();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {
      
      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat(result);
      }
    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
