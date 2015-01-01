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

      showInfo: function(type, info) {
        var typeClass = type + "-info";
        $("#lily-wrapper-page").append(
          '<div class="info-popup animated fadeInUp ' + typeClass + '">' + info + '</div>'
        );
        window.setTimeout(function() {
          $(".info-popup").fadeOut();
        }, 3000);
      }

    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);
  app.on('welcomeScreen:submit', app.onSubmitInfos, this);

  return app;
});
