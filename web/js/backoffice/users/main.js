//Load common code that includes config, then load the app logic for this page.
define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'config',
  'backoffice/app',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'jquery-placeholder'
], function($, _, Backbone, UserRouter, config, app, LiveChat) {

    function bootstrap() {
      app.router = new UserRouter();
      Backbone.history.start();

      if (config.chat && config.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});
