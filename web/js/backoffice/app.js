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
        app.ws.subscribe('operator/' + config.licence, function(topic, records) {
          if (app.users) {
            app.users.set(records);
            console.log(records);
          }
        });
      },

      unsubscribe: function() {
        app.ws.unsubscribe('operator/' + config.licence);
        app.hasSubscribed = false;
      },

      connect: function() {
        if (app.hasSubscribed) {
          app.unsubscribe();
        }
        app.subscribe();
        return app.ws.call('operator/connect');
      },

      onConnect: function(info) {

      },

      onChatOpen: function() {
        app.ws.call('visitor/open');
      },

      onChatSend: function(msg) {
        app.ws.publish('visitor/' + config.licence + '/' + msg.id, msg.message);
      },

      // onChatWriting: function(writing) {
      //   app.ws.call('operator/writing', {
      //     writing: writing
      //   });
      // },

      onConversationClose: function(sid) {
        app.ws.call('operator/close', {
          sid: sid
        });
      },

      onConversationBan: function(sid) {
        app.ws.call('operator/ban', {
          sid: sid
        });
      },

      onConversationTransfer: function(sid, id) {
        app.ws.call('operator/transfer', {
          sid: sid,
          operator: id
        });
      },

      onChangeName: function(sid, name) {
        app.ws.call('operator/changeName', {
          sid: sid,
          name: name
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

      onSetOperator: function(id) {
        return app.ws.call('operator/set_operator', {
          sid: id
        });
      },

      setOperator: function(id) {
        return app.onSetOperator(id);
      },

      onUpdateInfos: function(infos) {
        app.ws.call('operator/updateInformations', infos);
      },

      onConnectionError: function() {
        if ($('.js-modal-connection-lost').get(0)) {
          $('.js-modal-connection-lost').modal('show');
        }
      },

      ///////////////////
      //
      ///////////////////

    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  app.on('operator:unavailable', app.onSetUnAvailable);
  app.on('operator:available', app.onSetAvailable);
  app.on('operator:close', app.onConversationClose);
  app.on('operator:transfer', app.onConversationTransfer);
  app.on('operator:ban', app.onConversationBan);
  app.on('operator:updateInformations', app.onUpdateInfos);
  app.on('status:connectionError', app.onConnectionError);

  return app;
});
