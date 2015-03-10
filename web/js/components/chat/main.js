define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      moment = require('moment'),
      moment_fr = require('moment-fr'),
      timers = require('components/chat/utils/timers'),
      SkeletonView = require('components/chat/views/skeleton'),
      Collections = require('components/chat/data/collections'),
      ModalConfirmationView = require('components/modals/confirmView'),
      ModalConnectionLost = require('components/modals/connectionLost'),
      ModalModel= require('components/modals/model'),
      Notifs = require('components/notifications/notifsCollectionView'),
      app = require('app');

  var chat = function (config) {
    // Set locale in moment JS
    moment.locale('fr');

    app.modalConnectionLost = new ModalConnectionLost();

    var init = function() {
      app.available = !!config.available;
      app.trigger('operator:setAvailability', app.available);

      app.chatUsers = new Collections.Users();

      app.liveChatSkeleton = new SkeletonView();
      app.isLiveChatInit = true;

      // Get diff between server time and user to sync timers
      timers.serverTime = config.time - new moment().unix();

      app.notifs = new Notifs();

      $('.app-main-header .header-widget.notifications-menu')
        .on('click', app.showLiveChat);

      $('#chatModal').on('hidden.bs.modal', function (e) {
        window.sessionStorage.setItem("chatModalVisible", false);
        // app.chatDestroy();
      });

      var chatModalVisible = window.sessionStorage.getItem("chatModalVisible");
      if (chatModalVisible === "true") { app.showLiveChat(); }
    };

    // TODO: Move logic to a more suitable location 
    // (like a mixin/helper/components file)
    app.createModal = function(content, callback, context) {
      var modalModel, modalView;

      modalModel = new ModalModel();
      modalModel.set(content);

      modalView = new ModalConfirmationView({
        model: modalModel,
        appendEl: ".js-skeleton-container"
      });

      $('.js-modal-action').on('click', function() {
        if (_.isFunction(callback)) {
          callback.apply(context, arguments);
          $('.js-modal-action').off('click');
        }
      });
    };

    init();

  };

  _.extend(chat, function remove() {
    if (app.liveChatSkeleton) {
      app.liveChatSkeleton.remove();
    }
  });

  return chat;

});
