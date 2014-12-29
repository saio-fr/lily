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

    };

  _.extend(app, Backbone.Events);

  app.on('chat:open', app.onChatOpen);
  app.on('chat:send', app.onChatSend);
  app.on('chat:writing', app.onChatWriting);
  app.on('chat:satisfaction', app.onChatSatisfaction);

  return app;
});
