/* ===========================
          APP
   ========================== */

/*
 ** Main module: serves as namespace and EventBus
 */
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _       = require('underscore'),
    ab        = require('autobahn'),
    Backbone  = require('backbone'),
    config    = require('front/config'),
    isMobile  = require('isMobile'),
    when      = require('when'),
    analytics = require('utils/analytics'),
    FrameBus  = require('front/FrameBus'),
    app;

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

    init: function() {
      config.sid = app.getSessionId();
      config.standaloneMode = !app.appInIframe();

      if (!config.sid) {
        // We were unable to store an uniqid
        // We won't show the widget
        // To do: track this event;
        return console.error('unable to generate uniqid for saio');
      }

      app.onAppLoad();

      if (config.standaloneMode) {
        app.wsConnect(function(result) {
          app.bootstrap();
        });
      } else {
        app.once('hostSiteReady', function() {
          app.wsConnect(function(result) {
            app.bootstrap();
          });
        });
      }

      app.registerVisitorProperties();
    },

    wsConnect: function(callback) {

      return when(ab.connect(

        // The host
        'ws://' + config.ws.host + '/chat/' + config.licence,

        function onconnect(session) { // Once the connection has been established

          // session stored and used in the "app" namespace;
          app.ws = session;

          app.connect().then(function(result) {

            // Successfully connected to ws server;
            // Show widget on host site:
            app.onConnect(result);
            app.trigger('ws:connected');

            app.isConnectionActive = true;
            app.showContactForm = result.showContactForm;
            app.setIsConversationClosed(result.isConversationClosed);

            callback(result);
          },

          function(err) {
            console.warn(err);
            app.trigger('status:connectionError');
            app.bootstrap();
          });

        },

        function onhangup(code, reason, detail) { // When the connection is closed
          console.warn(code + reason + detail);
          app.trigger('ws:connectionHangup');
        },

        { // Additional parameters, we're ignoring the WAMP sub-protocol for older browsers
          'skipSubprotocolCheck': true,
          'maxRetries': 0
        }
      ));
    },

    connect: function(apiOptions) {
      var media = isMobile.phone ? 'phone' : (isMobile.tablet ? 'tablet' : 'pc');
      app.subscribe();
      return app.ws.call('visitor/connect', {
        // top.location.href can't be accessed from iframe
        // with a domain that differs from the host@
        href: app.hostHref,
        pathname: app.hostPathName,
        media: media,
        apiOptions: config.apiOptions || {}
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

      // First connection to the ws server didn't happen yet
      // Delay calls to the ws server
      if (!app.ws) {
        return app.listenTo('ws:connected', function() {
          // Call again
          app.call.apply(app, args);
        });
      }

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

        var activeRoute = (config.chat.active &&
          config.home === 'chat' &&
          config.chatAvailable ||
          !app.isConversationClosed) ?
        'chat' : 'self-service';

        app.sendHostMessage('lily.ready', {
          displayApp: info.appDisplay,
          activeRoute: activeRoute,
        });
      }

      // App openned in standalone mode (most probably on mobile)
      if (config.standaloneMode) {
        app.onAppShown();
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

    registerVisitorProperties: function() {
      // Register unique user with session Id & ip
      app.registerUser(config.sid, {
        visitorIp: config.visitorIp
      });

      // Register session super properties
      app.registerProperties({
        client: config.licence,
        visitorIp: config.visitorIp,
        standalone: config.standaloneMode,
        app: 'frontApp'
      });
    },

    ////////////////////
    //  Ws Events
    ////////////////////

    onConnectionHangup: function() {
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
        app.sendHostMessage('lily.messageToOperator', message);
        return;
      }

      // Else, we need to start the chat
      // That will show a record in operator back office
      app.onChatStart().then(function() {
        app.setIsConversationClosed(false);
        app.onChatSend(message);
      });
    },

    onChatIsWriting: function(isWriting) {
      app.call('visitor/writing', {
        sid: config.sid,
        writing: isWriting
      });
    },

    onOperatorChange: function(operator) {
      app.sendHostMessage('lily.chatOperatorChange', operator);
    },

    onChatSatisfaction: function(satisfied) {
      app.call('visitor/satisfaction', {
        sid: config.sid,
        satisfaction: satisfied
      });

      app.track.click('Visitor was ' + (satisfied ? '' : 'not ') + 'satisfied by chat conversation');
    },

    onChatReconnect: function() {
      if (app.isConnectionActive) {
        return;
      }

      app.wsConnect(function() {
        app.track.click('Connection to chat server was resumed by Visitor');
      });
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

      app.track.submit('Successfully sent personal informations before chat');
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

      $('#wrapper-page').append(
        '<div class="info-popup animated fadeInUp ' + typeClass + '">' + info + '</div>'
      );

      window.setTimeout(function() {
        $('.info-popup').fadeOut();
      }, 3000);
    },

    ////////////////////
    //    Utils
    ////////////////////

    // Those theoretically have no business in app.js
    // Should be in a "mixins.js" or "helpers.js" , or "utils.js" file anyway
    // (that could extend underscore btw)
    // See https://trello.com/c/Okxuesk4/75-abstract-utils-helpers-mixins-in-a-separate-file-not-app-js
    onAnimEnd: function(jqueryEl, callback, args, context) {
      var cont = context || window;
      if (config.supportAnimations) { // Browser support for onEndAnim event
        jqueryEl.on(config.animEndEventName, function() {
          if (_.isFunction(callback)) {
            callback.call(cont, args);
          }

          jqueryEl.off(config.animEndEventName);
        });
      } else {
        if (_.isFunction(callback)) {
          setTimeout(function() {
            callback.call(cont, args);
          }, 300);

          // Arbitrary value... Shouldn't happen though,
          //cause saio compatible browsers all support css animations/transitions
        }
      }
    },

    onTransEnd: function(jqueryEl, callback, args, context) {
      var cont = context || window;
      if (config.supportTransitions) { // Browser support for onEndAnim event
        jqueryEl.on(config.transEndEventName, function() {
          if (_.isFunction(callback)) {
            callback.call(cont, args);
          }

          jqueryEl.off(config.transEndEventName);
        });
      } else {
        if (_.isFunction(callback)) {
          setTimeout(function() {
            callback.call(cont, args);
          }, 300);

          // Arbitrary value... Shouldn't happen though,
          //cause saio compatible browsers all support css animations/transitions
        }
      }
    },

    getSessionId: function() {
      var sid = document.cookie.match('PHPSESSID=([^;]*)');

      if (sid && sid.length) {
        return sid[1];
      } else {
        // Oops the browser doesnt allow cookie :'(
        // Fall back to local storage
        try {
          sid = window.localStorage.getItem('sid');
          var date = new Date().getTime() * 1000000,
              rand = Math.floor((Math.random() * 10000) + 1);

          // If it is the first visit, we generate a uniqid
          if (!sid) {
            sid = (date + rand).toString(16);
            window.localStorage.setItem('sid', sid);
          }

          return sid;

        } catch (error) {
          // Aie, no local storage eigher !!
          console.error(error);
          return null;
        }
      }
    },

    // App loading in an iframe (on the host website)
    appInIframe: function() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },

    ////////////////////
    //    IO Iframe
    ////////////////////

    // From host
    onHostSendsInfo: function(options) {
      config.hostOptions = _.isObject(options) ? options : {};

      if (options.apiOptions) {
        config.apiOptions = options.apiOptions;
      }

      app.trigger('hostSiteReady');
    },

    onIdentifyUser: function(infos) {
      app.call('visitor/identify', infos);
    },

    onWidgetClick: function(options) {
      var display = options ? options.expand : false;

      app.call('visitor/appDisplay', {
        display: display
      });

      app.track.click('Widget was clicked on client website', {
        expand: options.expand
      });
    },

    onAppShown: function(firstOpen) {
      config.isShown = true;
      app.trigger('app:isShown');

      app.track.funnel('Showed the iframe', {
        firstTime: firstOpen
      });

      app.trackPageView();
    },

    onWidgetShow: function() {
      app.track.funnel('Showed the widget on client website');
      app.call('visitor/widgetDisplayed');
    },

    sendMessageToVisitor: function(message) {
      app.trigger('chat:sendMessage', message);
    },

    addAviMessage: function(question) {
      app.trigger('avi:addMessage', question);
    },

    // To Host
    onAppLoad: function() {
      app.sendHostMessage('lily.load');
      app.track.funnel('Loaded the app on client website');
    },

    onReduceClick: function() {
      app.call('visitor/appDisplay', {
        display: false
      });

      app.sendHostMessage('lily.shrink');

      config.isShown = false;
      app.track.click('Closed the iframe by clicking the minus button');
    },

  };

  _.extend(app, Backbone.Events, analytics(config), FrameBus);

  app.on('ws:connectionHangup',  app.onConnectionHangup);
  app.on('chat:start',           app.onChatStart);
  app.on('chat:send',            app.onChatSend);
  app.on('chat:isWriting',       app.onChatIsWriting);
  app.on('chat.operatorChange',  app.onOperatorChange);
  app.on('avi:newAviQuestion',   app.onNewAviQuestion);
  app.on('chat:reconnect',       app.onChatReconnect);
  app.on('chat:satisfaction',    app.onChatSatisfaction);
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  // Events received from host website
  FrameBus.on('host.sendInfo', app.onHostSendsInfo);
  FrameBus.on('lily.shown', app.onAppShown);
  FrameBus.on('widget.click', app.onWidgetClick);
  FrameBus.on('widget.shown', app.onWidgetShow);
  FrameBus.on('lily.sendMessageToVisitor', app.sendMessageToVisitor);
  FrameBus.on('lily.addAviMessage', app.addAviMessage);
  FrameBus.on('user.indentify', app.onIdentifyUser);

  return app;
});
