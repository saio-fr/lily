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

      // Global vars:
      showContactForm: false,
      isUserInactive: false,
      hasChatConnected: false,
      hasSubscribed: false,
      trackingQueue: [],
      chatting: false,
      isShown: false,
      hostHref: '',
      payload: {},
      hostPathName: '',
      hostDomain: '',

      connect: function() {
        // var deferred = when.defer();
        if (app.hasSubscribed) {
          try {
            app.unsubscribe();
          } catch (e) {
            // An error ca occur in case of connection timeout,
            console.log(e);
          }
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

        app.conversationClosed(false);

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

        if (config.chat.active && config.chatAvailable ||
          config.avi.active || app.chatting) {
          app.sendToHost({
            title: "ws:connect:success",
            callback: "showWidget"
          });
        }

        if (info.display === true) {
          app.sendToHost({
            title: "app:display",
            callback: "showIframe"
          });
        }
      },

      processWsPayload: function(payload) {
        var length = payload.length;
        _.each(payload, function(item, index) {
          switch (item.action) {
            case "close":
              // If the close action is the last received message,
              // set conversation to close:
              if (index === length - 1) {
                app.conversationClosed(true);
              }
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
        app.payload = payload;
        app.trigger('ws:subscribedToChat', payload);
      },

      ////////////////////
      //  Chat Events
      ////////////////////

      onChatOpen: function() {
        var deferred = when.defer();

        if (app.hasSubscribed && !app.hasChatConnected) {
          app.hasChatConnected = true;

          return app.call('visitor/open');
        } else {
          deferred.resolve();
          return deferred.promise;
        }
      },

      onChatSend: function(message) {
        app.ws.publish('operator/' + config.licence, message);
        app.track("chat/send_message");
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

        app.track("chat/click_satisfaction", {
          satisfied: satisfied
        });
      },

      onChatReconnect: function() {
        app.trigger("chat:resetConversation");
        app.onChatOpen().then(function() {
          app.trigger("chat:reconnected");
        }, function(err) {
          // TODO: process error;
        });

        app.track("chat/click_reconnect");
      },

      onSubmitInfos: function(infos) {

        app.showContactForm = false;

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

        app.track("welcomeScreen/submit_infos");
      },

      conversationClosed: function(isClosed) {
        var closed = isClosed ? true : false;
        app.isClosed = closed;
        window.sessionStorage.setItem("isConversationClosed", closed);
      },

      isConversationClosed: function() {
        var isClosed = app.isClosed ||
          window.sessionStorage.getItem("isConversationClosed") ||
          false;
        return isClosed;
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
      //    GA Utils
      ////////////////////

      pageView: function(page) {
        var url = page;

        if (!app.isShown) {
          app.trackingQueue.push(page);
          return;
        }

        // Only track if hte iframe is actually shown to the user:
        if (_.isFunction(window.ga) && url) {
          ga('send', 'pageview', {
            'page': url,
            'title': config.licence
          });
        }

        for (var i = 0; i < app.trackingQueue.length; i++) {
          url = app.trackingQueue[i];
          app.trackingQueue.shift();
          app.pageView(url);
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

      ////////////////////
      //    IO Iframe
      ////////////////////

      onLoadApp: function() {
        app.track("app::load");
      },

      onWidgetClick: function(visible) {
        visible = visible === "true" ? true : false;
        app.call('visitor/display', {
          display: visible
        });

        app.track("widget::click");
      },

      onShowIframe: function(firstOpen) {
        app.isShown = true;
        app.trigger('app:isShown');

        app.track("displayed", {
          fistOpen: firstOpen
        });

        if (!firstOpen) {
          return;
        }
      },

      onReduceClick: function() {
        app.call('visitor/display', {
          display: false
        });
        app.sendToHost({
          title: "app:hide",
          callback: "hideIframe"
        });

        app.isShown = false;

        app.track("click_reduce_app");
      },

      receiveFromHost: function(message, response) {

        if (message.data && message.data.title) {
          console.log("saio:: " + message.data.title);
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
        if (window.parent && document.referrer) {
          window.parent.postMessage(message, document.referrer || app.hostDomain);
        }
      },

    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('app:isShown', app.pageView);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:reconnect', app.onChatReconnect);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  window.addEventListener("message", function() {
    app.receiveFromHost.apply(app, arguments);
  }, false);

  // get parent href and pathnames hack:
  var a = document.createElement('a');
  a.href = document.referrer;

  app.hostPathName = a.pathname + a.search;
  app.hostHref = a.href;

  return app;
});
