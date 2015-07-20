/* ===========================
          APP
   ========================== */

/*
 * Main module: serves as namespace and EventBus
 */
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _           = require('underscore'),
      $           = require('jquery'),
      Backbone    = require('backbone'),
      Moment      = require('moment'),
      config      = require('globals'),
      analytics   = require('utils/analytics'),
      ab          = require('autobahn'),
      createModal = require('components/modals/main'),
      timers      = require('components/chat/utils/timers'),

    app = {

      init: function(callback) {
        app.setAjaxConfig();

        // Register unique user with session Id & ip
        app.registerUser(config.userId, {
          visitorIp: config.visitorIp,
        });

        // Register session super properties
        app.registerProperties({
          client: config.licence,
          visitorIp: config.visitorIp,
          app: 'backofficeApp'
        });

        // Connect to the real time server
        app.wsConnect();

        // Call the callback method (bootstrap the page)
        if (_.isFunction(callback)) {
          callback();
        }
      },

      ////////////////////
      // Modal component
      ////////////////////

      createModal: {},

      ////////////////////
      // Ws component
      ////////////////////

      wsConnect: function(callback) {
        return ab.connect(

          config.ws.protocol + config.ws.host + '/chat/' + config.licence, // The host

          function onconnect(session) { // Once the connection has been established
            app.ws = session;

            app.connect().then(function(config) {
              app.onWsConnect(config, callback);
            }, app.onWsError);
          },

          function onhangup(code, reason, detail) { // When the connection is closed
            var err = code + reason + detail;
            app.onWsError(err);
          },

          { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
            'skipSubprotocolCheck': true,
            'maxRetries': 10000,
            'retryDelay': 1000
          }
        );
      },

      onWsConnect: function(config, callback) {
        if (_.isFunction(callback)) {
          callback(config);
        }

        app.available = !!config.available;
        app.trigger('operator:setAvailability', app.available);

        // Get diff between server time and user to sync timers
        timers.serverTime = config.time - new Moment().unix();

        app.isConnectionAlive();
        app.ping();
      },

      onWsError: function(err) {
        console.warn(err);

        setTimeout(function() {
          app.trigger('status:connectionError');
        }, 3000);
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

      setAjaxConfig: function() {
        $.ajaxPrefilter(function(options) {
          if (options.external) {
            options.url = config.appRoot + options.url;
          } else if (options.url.match(/^(http|www)/)) {
            options.url = options.url;
          } else  {
            options.url = config.root + options.url;
          }
        });

        // Log ajax errors in Bugsnag
        $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
          if (window.Bugsnag) {
            window.Bugsnag.notify('AjaxError', thrownError);
          }
        });
      },

      ping: function() {
        window.setInterval(function() {
          app.ws.call('operator/ping').then(app.isConnectionAlive);
          console.log('ping');
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
        app.track.funnel('Show operator chat modal');
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

      onConversationClose: function(id) {
        app.ws.call('operator/close', { sid: id });
      },

      onConversationBan: function(id) {
        app.ws.call('operator/ban', { sid: id });
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
        return app.ws.call('operator/setOperator', { sid: id });
      },

      setOperator: function(id) {
        return app.onSetOperator(id);
      },

      onUpdateInfos: function(infos) {
        app.ws.call('operator/updateInformations', infos);
      },

      onConnectionError: function() {
        if (!app.modalConnectionLost) {
          app.modalConnectionLost = app.createModal.alert(config.modalAlert.wsConnectionLost);
        }

        if (!app.modalConnectionLost.$el.is(':visible')) {
          app.modalConnectionLost.open();
          app.track.error('Connection was lost with the real time server');
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

  _.extend(app, Backbone.Events, analytics(config));
  _.extend(app.createModal, createModal);

  // Chat status events:
  app.on('chat:open',         app.onChatOpen);
  app.on('chat:send',         app.onChatSend);
  app.on('chat:isWriting',    app.onChatIsWriting);
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
