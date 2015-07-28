/* jshint strict: false */
/* globals _, window, Events, sdk, saio */

/**
 * The saio object will be used as a global event bus by a frame app
 * like lily or widget, to communicate across apps without needing
 * knowledge of the internals of the others
 *
 * It also has utility methods attatched to it, to set/get a registered app
 * or manipulate urls.
 *
 */
var core = function() {

  var stylesUrl = '{{ licence|customerDir|raw }}/css/lily-float.css';
  var appsRegistry = {};

  return _.extend({
    hostDocument: window.document,
    hostWindow: window,
    hostBody: window.document.getElementsByTagName('body')[0],
    emptyLink: window.document.createElement('a'),

    origin: window.location.origin || this.getOrigin(), // IE 11+ only
    host: window.location.host,

    events: {
      // Comming from lily app
      'lily.onReady': 'onLilyReady',
      'lily.onExpand': 'onLilyExpand',

      // Comming from widget app
      'widget.click': 'onWidgetClick',

      // comming from sdk
      'config.setOperatorGroup': 'setOperatorGroup',

      // comming from third party frames
      'lily.messageToOperator': 'onMessageToOperator'
    },

    initialize: function() {

      // Register this unique id for the host window
      this.registerApp(this.hostWindow, 'host');

      // Load the external stylesheet used to style the widget
      // and the app wrapper
      this.loadStylesheet(stylesUrl);

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(this, this.events);

      // Listen for messages sent to the hostWindow using the postMessage API
      // (Messages we read this way can come from multiple third parties
      // and should not be trusted.)
      _.addEvent(this.hostWindow, 'message', _.bind(this.onTargetMessage, this));
    },

    /**
     * Methods called from calls to sdk config triggered events
     */

    // Follow the information to lily that the operator group
    // for this page should be groupId
    setOperatorGroup: function(groupId) {
      var lily = this.getRegisteredApp('lily');
      lily.sendMessage('config.setOperatorGroup', groupId);
    },

    /**
     * Methods called after a event from lilyEvents was fired
     */

    onLilyReady: function() {
      this.isLilyReady = true;
    },

    /**
     * Methods called after a event from widgetEvents was fired
     */

    onWidgetClick: function() {
      this.trigger('lily.expand');
    },

    /**
     * Methods called after a event from a third party app
     * (lily for now) was fired
     */

    onMessageToOperator: function(message) {
      // Comming from third party. Check param integrity
      if (!_.isString(message)) return;
      this.trigger('lily.onMessageToOperator', message);
    },

    /**
     * Utility methods accessible on the saio object
     */
    registerApp: function(frame, uid) {
      appsRegistry[uid] = frame;
    },

    getRegisteredApp: function(uid) {
      return appsRegistry[uid] || undefined;
    },

    getHost: function(href) {
      this.emptyLink.href = href;
      return this.emptyLink.hostname;
    },

    getOrigin: function(url) {
      // Use the anchor tag to guarantee a fully formed URL.
      this.emptyLink.href = url;
      var parts = this.emptyLink.href.split('/');
      return parts[0] + '//' + parts[2];
    },

    onTargetMessage: function(event) {
      var message;

      try {
        message = JSON.parse(event.data);
      } catch (err) {
        return;
      }

      var sender = message.sender,
          hostLocation;

      // Check that the message comes from a known origin
      // (an app we previously defined and registered in appRegistry)
      if (sender && appsRegistry[sender]) {
        hostLocation = appsRegistry[sender];
      }

      if (hostLocation && this.getHost(event.origin) === hostLocation.host) {
        // Scope should be saio (only scope for message comming from a saio iframe)
        if (event.origin === hostLocation.origin && message.scope === 'saio') {
          // Do something with received message
          console.log(message.scope + ': ' + message.name);
          saio.trigger(message.name, message.data);
        }
      }

    },

    loadStylesheet: function(url) {
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

  }, Events);

};
