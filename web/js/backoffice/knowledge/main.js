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

  // Libraries required at bootstrap for the UI.
  "moment",
  "bootstrap",
  "todoTpl"
  
], function($, _, Backbone, app, globals, Router, ModalView, ModalModel) {

    $.ajaxPrefilter(function(options) {
      options.url = globals.root + options.url;
    });

    app.init = function() {
      app.router = new Router();
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
    
    app.counters = counters;
    app.changeCounters = function () {
      $('.questions-nav span').html(app.counters.questions);
    };

    // Will get called if ws connection is successful
    app.onConnect = function(result) {

    };

    app.wsConnect();
    app.init();
    Backbone.history.start();
  });
});
