//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/statistics/router',
  'globals',
  'backoffice/app',
  'components/chat/main',
  'moment',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment-fr',

], function($, _, Backbone, StatisticsRouter, globals, app, LiveChat, moment) {

    // Set locale in moment JS
    moment.locale('fr');

    function bootstrap() {
      app.router = new StatisticsRouter();
      Backbone.history.start();

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});
