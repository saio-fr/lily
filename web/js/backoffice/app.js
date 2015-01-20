/* ===========================
          APP
   ========================== */

/*
 ** Main module: serves as namespace and EventBus
 */
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    config = require('globals'),
    app = {

      subscribe: function() {
        app.ws.subscribe('visitor/' + config.licence + '/' + config.sid,
          function(topic, payload) {
            app.processWsPayload(payload);
          });
        app.hasSubscribed = true;
      },

      unsubscribe: function() {
        app.ws.unsubscribe('visitor/' + config.licence + '/' + config.sid);
        app.hasSubscribed = false;
      },

      onConnect: function(info) {

      },

      onChatOpen: function() {
        app.ws.call('visitor/open');
      },

      onChatSend: function(message) {
        app.ws.publish('operator/' + config.licence, message);
      },

      onChatWriting: function(writing) {
        app.ws.call('visitor/writing', {
          sid: config.sid,
          writing: writing
        });
      },

      onSetAvailable: function() {
        app.ws.call('operator/available');
        app.available = true;
      },

      onSetUnAvailable: function() {
        app.ws.call('operator/unavailable');
        app.available = false;
        app.router.navigate('dashboard', {
          trigger: true,
          replace: true
        });
      },

      onUpdateInfos: function(infos) {
        app.ws.call('operator/updateInformations', infos);
      },

      onConnectionError: function() {
        $('.js-modal-connection-lost').modal('show');
      },
    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  app.on('operator:unavailable', app.onSetUnAvailable);
  app.on('operator:available', app.onSetAvailable);
  app.on('operator:updateInformations', app.onUpdateInfos);
  app.on('status:connectionError', app.onConnectionError);

  return app;
});
