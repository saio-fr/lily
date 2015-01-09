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

    app = {

      onConnect: function(info) {
        app.sendToHost({
          title: "ws:connect:success",
          callback: "showWidget"
        });

        if (info.display == true) {
          app.sendToHost({
            title: "app:display",
            callback: "showIframe"
          });
        }
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

      onChatSatisfaction: function(satisfied) {
        app.ws.call('visitor/satisfaction', {
          sid: config.sid,
          satisfaction: satisfied
        });
      },

      onSubmitInfos: function(infos) {
        this.sawContactForm = true;

        if (infos && infos.firstName && infos.lastName && infos.email) {
          app.ws.call('visitor/contactForm', {
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

      onWidgetClick: function() {
        app.ws.call('visitor/displayed');
      },

      showInfo: function(type, info) {
        var typeClass = type + "-info";
        $("#lily-wrapper-page").append(
          '<div class="info-popup animated fadeInUp ' + typeClass + '">' + info + '</div>'
        );
        window.setTimeout(function() {
          $(".info-popup").fadeOut();
        }, 3000);
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
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  window.addEventListener("message", function() {
    app.receiveFromHost.apply(app, arguments);
  }, false);

  return app;
});
