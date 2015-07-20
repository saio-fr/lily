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

    function bootstrap() {
      app.skeleton = new SkeletonView();
      Backbone.history.start();
      app.trackPageView('Dashboard page');

      if (globals.chat && globals.isChatOperator && !app.liveChat) {
        app.liveChat = new LiveChat();
      }
    }

    app.init(bootstrap);
  });
});
