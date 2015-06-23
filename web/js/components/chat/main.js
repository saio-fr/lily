define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var moment       = require('moment'),
      SkeletonView = require('components/chat/views/skeletonView'),
      Collections  = require('components/chat/data/collections'),
      Notifs       = require('components/notifications/notifsCollectionView'),
      app          = require('backoffice/app');

  var Chat = function() {
    // Set locale in moment JS
    moment.locale('fr');

    var init = function() {
      app.chatUsers = new Collections.Users();
      app.chatShortcuts = new Collections.Shortcuts();
      app.liveChatSkeleton = new SkeletonView();
      app.notifs = new Notifs();

      $('.app-main-header .header-widget.notifications-menu')
        .on('click', app.showLiveChat);
    };

    init();
  };

  return Chat;
});
