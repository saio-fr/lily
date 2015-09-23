
var mediator = require('./mediator.js');
var _        = require('./utils.js');

module.exports = function() {

  var stylesUrl = '{{ licence|customerDir|raw }}/css/lily-float.css';

  var host = {

    // Origin part of the host location
    origin: window.location.origin || _.getOrigin(window.location.href), // IE 11+ only

    // Host part of the host location
    host: window.location.host || _.getHost(window.location.href),

    initialize: function() {

      // Load the external stylesheet used to style the widget
      // and the app wrapper
      this.loadExtStyles(stylesUrl);

      // Listen for messages sent to the host window using the postMessage API
      // (Messages we read this way can come from multiple third parties
      // and should not be trusted.)
      _.addEvent(window, 'message', _.bind(this.onTargetMessage, this));

      return this;
    },

    loadExtStyles: function(url) {
      var link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.type = 'text/css';
      link.href = url;

      // There is at least 1 script tag on the page
      // (the one that loaded the saio widget script)
      // Insert before that tag.
      var entry = document.getElementsByTagName('script')[0];
      entry.parentNode.insertBefore(link, entry);
    },

    /**
     * Listen to the messages sent wia postMessage,
     * comming from the different iframes
     */
    onTargetMessage: function(event) {
      var message;

      try {
        message = JSON.parse(event.data);
      } catch (err) {
        return;
      }

      var sender = message.sender;
      var hostLocation;

      // Check that the message comes from a known origin
      // (an app we previously defined and registered in appRegistry)
      if (sender && mediator.getRegisteredApp(sender)) {
        hostLocation = mediator.getRegisteredApp(sender);
      }

      if (hostLocation && _.getHost(event.origin) === hostLocation.host) {
        // Scope should be saio (only scope for message comming from a saio iframe)
        if (event.origin === hostLocation.origin && message.scope === 'saio') {
          // Do something with received message
          mediator.trigger(message.name, message.data);
        }
      }
    },

  };

  return host;
};
