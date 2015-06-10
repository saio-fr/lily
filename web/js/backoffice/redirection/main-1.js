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
      if (options.external) {
        options.url = globals.appRoot + options.url;
      } else if (options.url.match(/^(http|www)/)) {
        options.url = options.url;
      } else  {
        options.url = globals.root + options.url;
      }
    });

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView("/redirection");

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});