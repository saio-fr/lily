define(['../common', 'require'], function(common, require) {

  'use strict';

  require([
  "jquery",
  "underscore",
  "backbone",
  "app",
  "globals",
  "backoffice/knowledge/router",
  "components/modals/confirmView",
  "components/modals/model",
  "backoffice/knowledge/utils/counters",
  "utils/interact",

  // Libraries required at bootstrap for the UI.
  "moment",
  "bootstrap",
  "todoTpl"
  
], function($, _, Backbone, app, globals, Router, ModalView, ModalModel, Counters, Interact) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.router = new Router();
      Interact.resizeNavigator();
      Counters.set(config);
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
    
    app.post = function () {
      $('.icon-spinner').removeClass('hide');
      $.post(app.postUrl, JSON.stringify(app.sortRequest), function (data) {
        app.postCallback(data);
        $('.icon-spinner').addClass('hide');
      });
    },

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
