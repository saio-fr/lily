
/**
 * This module is used to send/receive events from the host website
 * and other saio iframes using the postMessage API
 */
define(function (require) {

  'use strict';

  var _        = require('underscore');
  var $        = require('jquery');
  var Backbone = require('backbone');

  function getOrigin(url) {
    return url.replace(/([^:]+:\/\/[^\/]+).*/, '$1');
  }

  // `channel is the host's global object window
  var channel = window.opener || window.parent;

  // `document.referrer`should be the host website location.
  // Not 100% trustWorthy but sufficient for our purposes
  var referrer = document.referrer;

  // TODO: Cannot rely on referrer
  var origins = {};
  origins.client = getOrigin(referrer);

  var FrameBus = {

    origins: origins,

    messageHandler: function (event) {
      // jQuery wraps the originalEvent and puts it in, yes, originalEvent
      event = event.originalEvent;

      var message;
      try {
        message = JSON.parse(event.data);
      } catch (err) {
        // Message was not parsable - bail out
        return;
      }

      // reject any event that comes from a different origin
      if (event.origin !== origins.client)
        return;

      // Message scope should be 'client'
      if (message.scope === 'client') {
        FrameBus.trigger(message.name, message.data);
      }

      return;
    },

    postMessage: function (message) {
      // NOTE: Target origin is wildcard (*), which means any JavaScript code
      //       (i.e. publishers) with a reference to the target window can listen
      //       and receive these messages. Assume that any messages sent this way
      //       can and will be readable by third-parties, and do not send any
      //       private session-identifying data.
      message.sender = 'lily';
      message = JSON.stringify(message);
      channel.postMessage(message, '*');
    },

    // Sends a message strictly to this frame's host object
    sendHostMessage: function (name, params) {
      params = params || [];

      FrameBus.postMessage({
        scope: 'saio',
        name: name,
        data: params
      });
    }
  };

  _.extend(FrameBus, Backbone.Events);

  $(window).on('message onmessage', FrameBus.messageHandler);
  $(window).on('unload', function () { FrameBus.sendHostMessage('die'); });

  return FrameBus;
});

