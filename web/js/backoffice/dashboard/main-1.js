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

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap',
  'moment',
  'moment-fr',

], function($, _, Backbone, app, SkeletonView, LiveChat, globals) {

    $.ajaxPrefilter(function(options) {
      if (options.external) {
        options.url = globals.appRoot + options.url;
      } else if (options.url.match(/^(http|www)/)) {
        options.url = options.url;
      } else  {
        options.url = globals.root + options.url;
      }
    });

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView("/dashboard");

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    };

    app.init();
    app.wsConnect();
    Backbone.history.start();
  });
});
