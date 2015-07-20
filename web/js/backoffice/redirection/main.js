define(['require', '../../common'], function(require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/app',
  'globals',
  'backoffice/redirection/views/skeletonView',
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'bootstrap',
  'todoTpl',
], function($, _, Backbone, app, globals, SkeletonView, LiveChat) {

    function bootstrap() {
      app.skeleton = new SkeletonView();
      Backbone.history.start();
      app.trackPageView('Redirection page');

      if (globals.chat && globals.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});
