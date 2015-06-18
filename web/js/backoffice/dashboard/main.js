define(['require', '../../common'], function(require) {

  'use strict';

  require([
    'jquery',
    'underscore',
    'backbone',
    'globals',
    'backoffice/app',
    'moment',
    'backoffice/dashboard/views/skeletonView',
    'components/chat/main',

    'bootstrap',
    'todoTpl',
    'moment-fr'
  ], function($, _, Backbone, globals, app, moment, SkeletonView, LiveChat) {

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.skeleton = new SkeletonView();
      app.pageView('/dashboard');

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
