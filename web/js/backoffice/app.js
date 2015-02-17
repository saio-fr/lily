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
    Autobahn = require('autobahn'),

    app = {

      wsConnect: function(callback) {
        return ab.connect(

          config.wsserver + '/chat/' + config.licence, // The host

          function onconnect(session) { // Once the connection has been established
            app.ws = session;

            app.connect().then(function(result) {
              if (_.isFunction(callback)) {
                callback(result);
              }
              app.onConnect(result);
              app.ping();
            }, function(err) {
              console.warn(err);
              app.trigger("status:connectionError");
            });
          },

          function onhangup(code, reason, detail) { // When the connection is closed
            console.warn(code + reason + detail);
            // Todo put that somewhere else
            app.trigger("status:connectionError");
          },

          { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
            'skipSubprotocolCheck': true,
            'maxRetries': 10000,
            'retryDelay': 1000
          }
        );
      },

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
          try {
            app.unsubscribe();
          } catch (e) {
            // An error ca occur in case of connection timeout,
            console.log(e);
          }
        }
        app.subscribe();
        return app.ws.call('operator/connect');
      },

      ping: function() {
        window.setInterval(function() {
          app.ws.call("operator/ping");
          console.log("ping");
        }, 25000);
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

      onConversationClose: function(id) {
        app.ws.call('operator/close', {
          sid: id
        });
        app.trigger('conversation:closed', id);
      },

      onConversationBan: function(id) {
        app.ws.call('operator/ban', {
          sid: id
        });
        app.trigger('conversation:banned', id);
      },

      onConversationTransfer: function(sid, id) {
        app.ws.call('operator/transfer', {
          sid: sid,
          operator: id
        });
        app.trigger('conversation:transfered', sid);
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
        if (app.router) {
          app.router.navigate('dashboard', {
            trigger: true,
            replace: true
          });
        }
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

      ////////////////////
      //    GA Utils
      ////////////////////

      pageView: function(page) {
        var url = page || Backbone.history.fragment;
        if (_.isFunction(window.ga)) {
          ga('send', 'pageview', {
            'page': url,
            'title': config.licence
          });
        }
      },

      track: function(event, options, value) {
        var category = config.licence,
          action = event,
          label = tostring(options);
        if (_.isFunction(window.ga)) {
          ga('send', 'event', category, action, label, value);
        }

        function tostring(obj) {
          var str = '';
          for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
              str += p + '::' + obj[p] + '\n';
            }
          }
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
