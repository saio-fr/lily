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
      $ = require("jquery"),
      Backbone = require('backbone'),
      globals = require('globals'),
      config = require('globals'),
      Autobahn = require('autobahn'),
      createModal = require('components/modals/main'),
      timers = require('components/chat/utils/timers'),

    app = {
         
      ////////////////////
      // Modal component
      ////////////////////
      createModal: {},

      ////////////////////
      //  Ws Component
      ////////////////////
      wsConnect: function(callback) {
        return ab.connect(

          config.ws.protocol + config.ws.host + '/chat/' + config.licence, // The host

          function onconnect(session) { // Once the connection has been established
            app.ws = session;

            app.connect().then(function(result) {
              
              if (_.isFunction(callback)) {
                callback(result);
              }

              app.available = !!result.available;
              app.trigger('operator:setAvailability', app.available);
              
              // Get diff between server time and user to sync timers
              timers.serverTime = result.time - new moment().unix();

              app.isConnectionAlive();
              app.ping();
              
            }, function(err) {
              console.warn(err);

              window.setTimeout(function() {
                app.trigger("status:connectionError");
              }, 3000);
            });
          },

          function onhangup(code, reason, detail) { // When the connection is closed
            console.warn(code + reason + detail);
            // Todo put that somewhere else
            window.setTimeout(function() {
              app.trigger("status:connectionError");
            }, 3000);
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
          if (app.chatUsers && app.chatUsers instanceof Backbone.Collection) {
            app.chatUsers.set(records);
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
            console.warn(e);
          }
        }
        app.subscribe();
        return app.ws.call('operator/connect');
      },

      ping: function() {
        window.setInterval(function() {
          app.ws.call("operator/ping").then(app.isConnectionAlive);
          console.log("ping");
        }, 25000);
      },

      isConnectionAlive: function() {
        // Hide connection lost modal if present:
        if (!app.modalConnectionLost) return;
        app.modalConnectionLost.close();
      },

      showLiveChat: function(id) {

        if (app.available) {
          app.showLiveChatModal();

          if (id) {
            app.trigger('chat:showConversation', id);
          }
        } else {

          var modal = app.createModal.confirm(config.modalConfirm.chatUnavailable);
          modal.promise.then(function (res) {
            if (res) {
              app.trigger('operator:setAvailability', true);
              app.showLiveChatModal();
            }
          }.bind(this));
        }
      },

      showLiveChatModal: function() {
        app.trigger('chatWindow:open');
      },

      hideLiveChatModal: function() {
        app.trigger('chatWindow:close');
      },

      chatDestroy: function() {
        if (app.liveChat) {
          app.liveChat.remove();
        }
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

      onAvailabilityChange: function(available) {
        var callAction = available ? 'operator/available' :'operator/unavailable';
        // Set the operator availability on the server:
        app.ws.call(callAction).then(function () {
          if (available) {
            app.available = true;
            return;
          }

          app.available = false;
          app.hideLiveChatModal();
        });
      },

      onSetOperator: function(id) {
        return app.ws.call('operator/setOperator', {
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
        if (!app.modalConnectionLost) {
          app.modalConnectionLost = app.createModal.alert(globals.modalAlert.wsConnectionLost);
        }
        if (!app.modalConnectionLost.$el.is(':visible')) {
          app.modalConnectionLost.open();
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

      //////////////////////
      // DOM Event Handlers
      //////////////////////

      onSetAvailability: function(availability) {
        var status = _.isObject(availability) ? availability.data.status : availability;
        var statusButton = $('.app-main-header .status-selector');
        var nextClass = status ? 'available' : 'unavailable',
            prevClass = status ? 'unavailable' : 'available',
            // Abstract in Global / i18n class
            label = status ? 'Disponible' : 'Indisponible';

        if (!statusButton.hasClass('show')) {
          statusButton.addClass('show');
        }

        statusButton.find('.status-icon')
          .removeClass(prevClass)
          .addClass(nextClass);
        statusButton.find('.status-label').html(label);

        app.onAvailabilityChange(status);
      }

    };

  _.extend(app, Backbone.Events);
  _.extend(app.createModal, createModal);

  // Chat status events:
  app.on('chat:open',         app.onChatOpen);
  app.on('chat:send',         app.onChatSend);
  app.on('chat:writing',      app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  // Operator actions events:
  app.on('operator:ban',             app.onConversationBan);
  app.on('operator:close',           app.onConversationClose);
  app.on('operator:transfer',        app.onConversationTransfer);
  app.on('operator:updateInfos',     app.onUpdateInfos);
  app.on('operator:setAvailability', app.onSetAvailability);
  app.on('operator:changeName',      app.onChangeName);
  // Global app state events:
  app.on('status:connectionError', app.onConnectionError);
  // App wide DOM Event handlers:
  $('.app-main-header .status-selector a[data="available"]')
    .on('click', { status: true }, app.onSetAvailability);
  $('.app-main-header .status-selector a[data="unavailable"]')
    .on('click', { status: false }, app.onSetAvailability);

  return app;
});
