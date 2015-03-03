define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      moment = require('moment'),
      moment_fr = require('moment-fr'),
      timers = require('components/chat/utils/timers'),
      SkeletonView = require('components/chat/views/skeleton'),
      Collections = require('components/chat/data/collections'),
      ModalConfirmationView = require('components/modals/confirmView'),
      ModalModel= require('components/modals/model'),
      app = require('app');

  return function () {
    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {
      app.chatUsers = new Collections.Users();
      app.liveChatSkeleton = new SkeletonView();
      app.isLiveChatInit = true;
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

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

      app.available = !!result.available;
      app.init();

      // Get diff between server time and user to sync timers
      timers.serverTime = result.time - new moment().unix();
    };

    app.wsConnect();

  };
});
