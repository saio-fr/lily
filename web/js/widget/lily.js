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

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency.
    events: {
      'lily.load': 'onLoad',
      'lily.ready': 'onReady',
      'lily.expand': 'showApp',
      'lily.shrink': 'shrink',
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
      // (Waiting for iframe message triggering showWidget method;)
      // Handshake to give iframe the host domain url and trigger a ga event in the iframe:
      this.sendMessage('host.sendInfo', {
        host: window.location.host || null,
        path: window.location.pathname || null,
        href: window.location.href || null,
        protocol: window.location.protocol || null,
        referrer: document.referrer || null
      });
    },

    onReady: function(options) {
      if (options && options.displayApp) {
        saio.trigger('lily.expand');
      } else {
        saio.trigger('widget.show');
      }

      saio.trigger('lily.onReady');
    },

    shrink: function() {
      this.hide();
      if (saio.shouldOpenStandalone()) return;
      saio.trigger('lily.onShrink');
      saio.trigger('widget.show');
    },

    showApp: function() {
      var firstOpen = this.firstOpen;

      if (saio.shouldOpenStandalone()) {
        return this.standaloneOpen();
      }

      this.show();

      this.sendMessage('lily.shown', {
        firstOpen: firstOpen
      });

      saio.trigger('lily.onExpand');

      this.firstOpen = false;
    },

    standaloneOpen: function() {
      var win = window.open(this.target, '_blank');
      win.focus();
    },

  }, Iframe);

};
