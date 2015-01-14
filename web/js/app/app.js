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
    config = require('app/globals'),
    when = require('when'),

    app = {

      connect: function() {
        // var deferred = when.defer();
        if (app.hasSubscribed) {
          app.unsubscribe();
        }
        app.subscribe();
        return app.ws.call('visitor/connect', {
          // top.location.href can't be accessed from iframe
          // with a domain that differs from the host
          'href': app.hostHref,
          'pathname': app.hostPathName
        });
      },

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

      call: function() {
        var args = arguments;

        if (app.isUserInactive) {
          var deferred = when.defer();

          app.connect().then(function() {
            // brackets notation to avoid confusion with Javascript call method;
            app.isUserInactive = false;
            app.ws["call"].apply(app.ws, args).then(function(data) {
              deferred.resolve(data);
            }, function(err) {
              deferred.reject(err);
            });
          }, function(err) {
            app.showInfo("error", config.unableToConnectError);
            deferred.reject(err);
          });

          return deferred.promise;

        } else {
          return app.ws["call"].apply(app.ws, args);
        }

      },

      onConnect: function(info) {
        app.sendToHost({
          title: "ws:connect:success",
          callback: "showWidget"
        });

        if (info.display === true) {
          app.sendToHost({
            title: "app:display",
            callback: "showIframe"
          });
        }
      },

      processWsPayload: function(payload) {
        _.each(payload, function(item) {
          switch (item.action) {
            case "close":
              break;
            case "inactivity":
              app.isUserInactive = true;
              break;
            case "transfered":
              break;
            case "ban":
              break;
            case undefined:

              break;
          }
        });
        app.trigger('ws:subscribedToChat', payload);
      },

      ////////////////////
      //  Chat Events
      ////////////////////

      onChatOpen: function() {
        return app.call('visitor/open');
      },

      onChatSend: function(message) {
        app.ws.publish('operator/' + config.licence, message);
      },

      onChatWriting: function(writing) {
        app.call('visitor/writing', {
          sid: config.sid,
          writing: writing
        });
      },

      onChatSatisfaction: function(satisfied) {
        app.call('visitor/satisfaction', {
          sid: config.sid,
          satisfaction: satisfied
        });
      },

      onChatReconnect: function() {
        app.trigger("chat:resetConversation");
        app.onChatOpen().then(function() {
          app.trigger("chat:reconnected");
        }, function(err) {
          // TODO: process error;
        });
      },

      onSubmitInfos: function(infos) {
        this.sawContactForm = true;

        if (infos && infos.firstName && infos.lastName && infos.email) {
          app.call('visitor/contactForm', {
            'firstname': infos.firstName || '',
            'lastname': infos.lastName || '',
            'email': infos.email || ''
          }).then(function() {
            app.router.navigate('chat', {
              trigger: true
            });
          }, function(err) {
            // Handle error (chat indisponible atm, you can leave us an email)
            app.router.navigate('mail', {
              trigger: true
            });
          });
        } else {
          app.router.navigate('chat', {
            trigger: true
          });
        }
      },

      ////////////////////
      //  Global Notifs
      ////////////////////

      showInfo: function(type, info) {
        var typeClass = type + "-info";
        $("#lily-wrapper-page").append(
          '<div class="info-popup animated fadeInUp ' + typeClass + '">' + info + '</div>'
        );
        window.setTimeout(function() {
          $(".info-popup").fadeOut();
        }, 3000);
      },

      ////////////////////
      //    IO Iframe
      ////////////////////

      onWidgetClick: function(visible) {
        visible = visible === "true" ? true : false;
        app.call('visitor/display', {
          display: visible
        });
      },

      onReduceClick: function() {
        app.call('visitor/display', {
          display: false
        });
        app.sendToHost({
          title: "app:hide",
          callback: "hideIframe"
        });
      },

      receiveFromHost: function(message, response) {
        if (message.data && message.data.title) {
          console.log("iframe:: " + message.data.title + " processed");
        }
        // Call callback if exists, and apply eventual arguments:
        if (message.data.callback) {
          var callbackName = message.data.callback.toString(),
            callbackArgs = message.data.args;
          if (_.isFunction(this[callbackName])) {
            this[callbackName].apply(this, callbackArgs);
          }
        }
        // Assuming you've verified the origin of the received message (which
        // you must do in any case), a convenient idiom for replying to a
        // message is to call postMessage on message.source and provide
        // message.origin as the targetOrigin.
        if (response) {
          message.source.postMessage(response, message.origin);
        }
        // On first handshake, we store the host domain url:
        if (!app.hostDomain) {
          app.hostDomain = message.origin;
        }
      },

      sendToHost: function(message) {
        window.parent.postMessage(message, document.referrer || app.hostDomain);
      },

    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  app.on('chat:reconnect', app.onChatReconnect);
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  window.addEventListener("message", function() {
    app.receiveFromHost.apply(app, arguments);
  }, false);

  // get parent href and pathnames:
  var a = document.createElement('a');
  a.href = document.referrer;

  app.hostPathName = a.pathname + a.search;
  app.hostHref = a.href;

  return app;
});
