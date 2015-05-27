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
    isMobile = require('isMobile'),
    when = require('when'),

    app = {

      // Global vars:
      showContactForm: false,
      isConnectionActive: false,
      showAviAnswerNotation: true,
      trackingQueue: [],
      isConversationClosed: true,
      isShown: false,
      hostHref: '',
      payload: {},
      hostPathName: '',
      hostDomain: '',

      connect: function() {
        var media = isMobile.phone ? 'phone' : (isMobile.tablet ? 'tablet' : 'pc');
        app.subscribe();
        return app.ws.call('visitor/connect', {
          // top.location.href can't be accessed from iframe
          // with a domain that differs from the host@
          'href': app.hostHref,
          'pathname': app.hostPathName,
          'media': media
        });
      },

      subscribe: function() {
        app.ws.subscribe('visitor/' + config.licence + '/' + config.sid,
          function(topic, payload) {
            app.processWsPayload(payload);
          }
        );
      },

      call: function() {
        var args = arguments;

        if (!app.isConnectionActive) {

          return app.wsConnect(function() {
            // brackets notation to avoid confusion with Javascript call method;
            return app.ws['call'].apply(app.ws, args);
          });

        } else {
          return app.ws['call'].apply(app.ws, args);
        }
      },

      publish: function() {
        var args = arguments;

        if (!app.isConnectionActive) {

          return app.wsConnect(function() {
            // brackets notation to avoid confusion with Javascript call method;
            return app.ws['publish'].apply(app.ws, args);
          });

        } else {
          return app.ws['publish'].apply(app.ws, args);
        }
      },

      onConnect: function(info) {

        app.isConnectionActive = true;

        if (config.chat.active && config.chatAvailable ||
          config.avi.active || app.chatting) {
          app.sendToHost({
            title: 'ws:connect:success',
            callback: 'showWidget'
          });
        }

        if (info.appDisplay === true) {
          app.sendToHost({
            title: 'app:appDisplay',
            callback: 'showIframe'
          });
        }
      },

      processWsPayload: function(payload) {
        var length = payload.length;
        _.each(payload, function(item, index) {
          switch (item.action) {
            case 'close':

              // If the close action is the last received message,
              // set conversation to close:
              if (index === length - 1) {
                app.setIsConversationClosed(true);
              }

              break;
            case 'inactivity':
              app.isConnectionActive = false;
              break;
            case 'transfered':
              break;
            case 'ban':
              break;
            case undefined:

              break;
          }
        });

        app.payload = payload;
        app.trigger('ws:subscribedToChat', payload);
      },

      ////////////////////
      //  Ws Events
      ////////////////////

      onConnectionHangup: function () {
        app.isConnectionActive = false;
        app.setIsConversationClosed(true);
      },

      ////////////////////
      //  Chat Events
      ////////////////////

      onChatStart: function() {
        return app.call('visitor/startChat');
      },

      onChatSend: function(message) {
        // If the chat is close we can send a msg
        if (app.getIsConversationClosed().toString() !== 'true') {
          app.publish('operator/' + config.licence, message);
          app.track('chat/send_message');
          return;
        }
        // Else, we need to start the chat
        // That will show a record in operator back office
        app.onChatStart().then(function () {
          app.setIsConversationClosed(false);
          app.onChatSend(message);
        });
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

        app.track('chat/click_satisfaction', {
          satisfied: satisfied
        });
      },

      onChatReconnect: function() {
        if (!app.isConnectionActive) {
          app.wsConnect(function () {
            app.track('chat/click_reconnect');
          });
        }
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

        app.track('welcomeScreen/submit_infos');
      },

      setIsConversationClosed: function(closed) {
        app.isConversationClosed = closed;
        window.localStorage.setItem('isConversationClosed', closed);
      },

      getIsConversationClosed: function() {
        var isConversationClosed = app.isConversationClosed ||
          window.localStorage.getItem('isConversationClosed') ||
          false;
        return isConversationClosed;
      },

      ////////////////////
      //      AVI
      ////////////////////

      onNewAviQuestion: function(question) {
        app.call('visitor/newAviQuestion', {
          sid: config.sid,
          question: question
        });
      },

      ////////////////////
      //  Global Notifs
      ////////////////////

      showInfo: function(type, info) {
        var typeClass = type + '-info';
        $('#lily-wrapper-page').append(
          '<div class="info-popup animated fadeInUp ' + typeClass + '">' + info + '</div>'
        );
        window.setTimeout(function() {
          $('.info-popup').fadeOut();
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

        // Only track if the iframe is actually shown to the user:
        if (_.isFunction(window.ga) && url) {
          window.ga('send', 'pageview', {
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

        function tostring(obj) {
          var str = '';
          for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
              str += p + '::' + obj[p] + '\n';
            }
          }
        }

        var category = config.licence,
          action = event,
          label = tostring(options);
        if (_.isFunction(window.ga)) {
          window.ga('send', 'event', category, action, label, value);
        }

        if (_.isFunction(window.mixpanel)) {
          window.mixpanel.track(event, options);
        }
      },

      ////////////////////
      //    Utils
      ////////////////////

      onAnimEnd: function(jqueryEl, callback, args, context) {
        var cont = context || window;
        if (config.support) { // Browser support for onEndAnim event
          jqueryEl.on(config.animEndEventName, function() {
            if (_.isFunction(callback)) {
              callback.call(cont, args);
            }

            jqueryEl.off(config.animEndEventName);
          });
        } else {
          if (_.isFunction(callback)) {
            callback.call(cont, args);
          }
        }
      },

      ////////////////////
      //    IO Iframe
      ////////////////////

      onLoadApp: function() {
        app.track('app::load');
      },

      onWidgetClick: function(visible) {
        visible = visible === 'true' ? true : false;
        app.call('visitor/appDisplay', {
          display: visible
        });

        app.track('widget::click');
      },

      onShowIframe: function(firstOpen) {
        app.isShown = true;
        app.trigger('app:isShown');

        app.track('appDisplayed', {
          fistOpen: firstOpen
        });

        if (!firstOpen) {
          return;
        }
      },

      onShowWidget: function() {
        app.track('widget::isShown');
        app.call('visitor/widgetDisplayed');
      },

      onReduceClick: function() {
        app.call('visitor/appDisplay', {
          display: false
        });
        app.sendToHost({
          title: 'app:hide',
          callback: 'hideIframe'
        });

        app.isShown = false;

        app.track('click_reduce_app');
      },

      receiveFromHost: function(message, response) {

        if (message.data && message.data.title) {
          console.log('saio:: ' + message.data.title);
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
      }

    };

  _.extend(app, Backbone.Events);

  app.on('ws:connectionHangup',  app.onConnectionHangup);
  app.on('chat:start',           app.onChatStart);
  app.on('chat:send',            app.onChatSend);
  app.on('app:isShown',          app.pageView);
  app.on('chat:writing',         app.onChatWriting);
  app.on('avi:newAviQuestion',   app.onNewAviQuestion);
  app.on('chat:reconnect',       app.onChatReconnect);
  app.on('chat:satisfaction',    app.onChatSatisfaction);
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  window.addEventListener('message', function() {
    app.receiveFromHost.apply(app, arguments);
  }, false);

  // get parent href and pathnames hack:
  var a = document.createElement('a');
  a.href = document.referrer;

  app.hostPathName = a.pathname + a.search;
  app.hostHref = a.href;

  return app;
});
