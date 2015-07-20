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

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView('/redirection');

      if (globals.chat && globals.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.ajaxConfig();
    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});
