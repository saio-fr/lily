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
  'moment',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment-fr',

], function($, _, Backbone, StatisticsRouter, globals, app, LiveChat, moment) {

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.router = new StatisticsRouter();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.ajaxConfig();
    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});
