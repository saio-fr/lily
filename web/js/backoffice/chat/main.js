define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "autobahn",
  "when",
  "app",
  "backoffice/chat/data/collections",
  "backoffice/chat/router",
  'backoffice/chat/views/skeleton',
  "components/modals/confirmView",
  "components/modals/model",
  "backoffice/chat/views/connection/lost",
  'backoffice/chat/utils/timers',
  "moment",
  "globals",

  // Libraries required at bootstrap for the UI.
  "moment-fr",
  "Modernizr",
  "wysihtml5-parser",
  "wysihtml5",
  "todoTpl"
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, app, Collections, ChatRouter, SkeletonView, ModalView,
    ModalModel, ConnectionLostModal, timers, moment, globals) {

    // Set locale in moment JS
    moment.locale('fr');

    var connectionLostModal = new ConnectionLostModal();

    app.init = function() {
      // app.notifs = new Notifs();
      app.skeleton = new SkeletonView();
      app.users = new Collections.Users();
      app.router = new ChatRouter();

      // Start routing
      if (Backbone.History.started) {
        Backbone.history.stop();
      }
      Backbone.history.start();
    };

    app.createModal = function(content, callback, context) {
      var modalModel, modalView;

      modalModel = new ModalModel();
      modalModel.set(content);

      modalView = new ModalView({
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

  });
});
