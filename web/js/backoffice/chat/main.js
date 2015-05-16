define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'autobahn',
  'when',
  'app',
  'backoffice/chat/router',
  'components/modals/confirmView',
  'components/modals/model',
  'components/chat/main',
  'moment',
  'globals',

  // Libraries required at bootstrap for the UI.
  'moment-fr',
  'Modernizr',
  'todoTpl',
  'polyfils',
  // Autobahn V1 AMD broken.
], function($, _, Backbone, ab, when, app, ChatRouter, ModalConfirmationView,
    ModalModel, LiveChat, moment, globals) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.createModal = function(content, callback, context) {
      var modalModel, modalView;

      modalModel = new ModalModel();
      modalModel.set(content);

      // Todo: chack that (undefined ModalView :/ what is that ???)
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

    // Set locale in moment JS
    moment.locale('fr');

    app.init = function() {

      app.router = new ChatRouter();

      // Start routing
      if (Backbone.History.started) {
        Backbone.history.stop();
      }

      Backbone.history.start();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

      if (globals.chat === 1 && globals.isChatOperator === 1 && !app.liveChat) {
        app.liveChat = new LiveChat(result);
      }

      // Get diff between server time and user to sync timers
      timers.serverTime = result.time - new moment().unix();
    };

    app.init();

    app.wsConnect();

  });
});
