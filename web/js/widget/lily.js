/* jshint strict: false */
/* global _, saio, Iframe */

var LilyIframe = function() {

  return _.extend({

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'lily',

    target: '{{ url("lily_app_index", { licence: licence }) }}',
    origin: saio.getOrigin('{{ url("lily_app_index", { licence: licence }) }}'),
    host: saio.getHost(this.origin),
    window: undefined,

    // Will be set when creating the dom element
    el: undefined,

    // Html id for the element
    frameId: 'lilyApp',

    // Internal flags and config variables
    shouldOpenStandalone: false,

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency.
    events: {
      'lily.load': 'onLoad',
      'lily.ready': 'onReady',
      'lily.expand': 'showApp',
      'lily.shrink': 'hideApp',
    },

    load: function() {

      this.el = this.createLily(this.getElOptions());

      // Keep a reference to the iframe window object.
      // Will be used later to send messages using postMessage.
      // Child iframe window object can also be found in the "frame" array
      this.window = saio.hostDocument.getElementById(this.frameId).contentWindow;

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(saio, this.events);

      // Register this unique id for the lily App iframe
      saio.registerApp(this, this.uid);
    },

    getElOptions: function() {
      return {
        iframe: {
          'id': this.frameId,
          'allowTransparency': 'true',
          'frameBorder': '0',
          'scrolling': 'yes',
          'name': 'saio_lily_app',
          'role': 'dialog',
          'src': this.target
        },

        container: {
          containerId: 'lilyAppContainer',
          styles: {
            'display': 'none',
          }
        },
      };
    },

    createLily: function(options) {
      if (!options) return;

      // Create dom elements
      var $lilyContainer = options.container ? this.createContainer(options.container) : null,
          $lilyIframe    = options.iframe ? this.createIframe(options.iframe) : null;

      // Insert dom elements in the host site dom
      this.insertInBody($lilyContainer);
      this.insertIframe($lilyIframe, options.container);

      return $lilyContainer;
    },

    onLoad: function(options) {
      if (options.shouldOpenStandalone) {
        this.shouldOpenStandalone = true;
      }

      // Send informations about the host to lily iframe
      // for tracking purposes
      this.sendMessage('host.sendInfo', {
        host: window.location.host || null,
        path: window.location.pathname || null,
        href: window.location.href || null,
        protocol: window.location.protocol || null,
        referrer: document.referrer || null,
        snippetVersion: snippetVersion
      });
    },

    onReady: function(options) {
      // Notify the mediator that the lily app is ready
      saio.trigger('lily.onReady');

      if (options && options.displayApp) {
        this.showApp();
      } else {
        saio.trigger('widget.show');
      }
    },

    hideApp: function() {
      // Go no further if app is in standalone mode.
      if (saio.shouldOpenStandalone) return;

      // Hide \o/
      this.hide();

      // Global flag for the state of the app
      //
      // NOTE: It would probably make more sence and be less messy
      // to have a `state` associated with each app and getter/setters
      // to access/modify this state
      saio.lilyIsShown = false;

      // Widget should be shown after the app was hidden
      saio.trigger('widget.show');

      // Will be used for the api to add behaviour onShrink
      saio.trigger('lily.onShrink');
    },

    showApp: function() {
      var firstOpen = this.firstOpen;

      // If the app should be opened in standalone mode (new tab,
      // currently only for mobile devices), do so and return here.
      // Widget should remain visible.
      if (this.shouldOpenStandalone) {
        return this.standaloneOpen();
      }

      saio.lilyIsShown = true;

      // Widget should hide before the app is shown
      saio.trigger('widget.hide');

      // Show \o/
      this.show();

      // Notify the lily app that it's been shown
      this.sendMessage('lily.shown', {
        firstOpen: firstOpen
      });

      this.firstOpen = false;

      // Will be used for the api to add behaviour onExpand
      saio.trigger('lily.onExpand');
    },

    standaloneOpen: function() {
      var win = window.open(this.target, '_blank');
      win.focus();
    },

  }, Iframe);

};
