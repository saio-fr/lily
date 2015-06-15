define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'app',
  'backoffice/dashboard/views/skeletonView',
  'components/chat/main',
  'globals',
  'moment',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment-fr',
], function($, _, Backbone, app, SkeletonView, LiveChat, globals, moment) {

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView("/dashboard");

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
