//Load common code that includes config, then load the app logic for this page.
define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  'jquery',
  'underscore',
  'backbone',
  'backoffice/users/router',
  'globals',
  'app',
  "components/modals/confirmView",
  "components/modals/model",
  'components/chat/main',

  // Libraries required at bootstrap for the UI.
  'todoTpl',
  'bootstrap'

], function($, _, Backbone, UserRouter, globals, app, ModalView, ModalModel, LiveChat) {

    $.ajaxPrefilter(function(options) {
      options.url = g.root + options.url;
    });
    
    app.createModal = function(content, callback, context) {
      var modalModel, modalView;

      modalModel = new ModalModel();
      modalModel.set(content);

      modalView = new ModalView({
        model: modalModel,
        appendEl: "body"
      });

      $('.js-modal-action').on('click', function() {
        if (_.isFunction(callback)) {
          callback.apply(context, arguments);
          $('.js-modal-action').off('click');
        }
      });
    };

    app.init = function() {
      app.router = new UserRouter();
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {
      
      if (globals.chat === 1 && globals.isChatOperator === 1) {
        app.liveChat = new LiveChat(result);
      }
    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
