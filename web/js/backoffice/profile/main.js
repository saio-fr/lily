//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common.js'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/profile/router',
  'config',
  'backoffice/app',
  'components/chat/main',
  'moment',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment-fr',
  'statistics'
], function($, _, Backbone, Router, config, app, LiveChat, moment) {

    // Set locale in moment JS
    moment.locale('fr');

    function bootstrap() {
      app.router = new Router();
      Backbone.history.start();

      if (config.chat && config.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});
