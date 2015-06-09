define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      moment = require('moment'),
      moment_fr = require('moment-fr'),
      globals = require('globals'),
      SkeletonView = require('components/chat/views/skeletonView'),
      Collections = require('components/chat/data/collections'),
      Notifs = require('components/notifications/notifsCollectionView'),
      app = require('app');

  var chat = function() {
    // Set locale in moment JS
    moment.locale('fr');

    var init = function() {

      app.chatUsers = new Collections.Users();
      app.chatShortcuts = new Collections.Shortcuts();

      app.liveChatSkeleton = new SkeletonView();
      app.isLiveChatInit = true;

      app.notifs = new Notifs();

      $('.app-main-header .header-widget.notifications-menu')
        .on('click', app.showLiveChat);
    };

    init();

  };

  return chat;

});