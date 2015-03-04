define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "app",
  "globals",
  "backoffice/redirection/views/skeletonView",
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  "bootstrap",
  "todoTpl",
], function($, _, Backbone, app, globals, SkeletonView, LiveChat) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView("/redirection");
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {
      
      if (globals.chat === 1 && globals.isChatOperator === 1) {
        app.liveChat = new LiveChat(result);
      }
    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
