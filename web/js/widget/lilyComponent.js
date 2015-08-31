
var component = require('./component.js');
var mediator  = require('./mediator.js');
var xdm       = require('./xdm.js');
var _         = require('./utils.js');

var iframeSrc = '{{ url("lily_app_index", { licence: licence }) }}';

var elOptions = {
  tagName: 'iframe',
  attrs: {
    id: 'lilyApp',
    allowTransparency: 'true',
    frameBorder: '0',
    scrolling: 'yes',
    name: 'saio_lily_app',
    role: 'dialog',
    src: iframeSrc
  },

  container: {
    tagName: 'div',
    attrs: {
      id: 'lilyAppContainer',
    },
    styles: {
      display: 'none',
    }
  },
};

module.exports = function() {

  var lilyComponent = _.extend(component(), {

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'lily',

    // Will be used as src for the iframe
    target: iframeSrc,

    // Origin part of the target url
    origin: _.getOrigin(iframeSrc),

    // Host part of the target url
    host: _.getHost(iframeSrc),

    // Component frame will be given the iframe window when inserted in the dom
    frame: undefined,

    // Will be set when creating the dom element
    el: undefined,

    elOptions: elOptions,

    // Html id for the element
    id: elOptions.container.attrs.id,

    // HTML id for the iframe
    frameId: elOptions.attrs.id,

    // Internal flags and config variables
    shouldOpenStandalone: false,

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency.
    events: {
      'lily.load': 'onLoad',
      'lily.ready': 'onReady',
      'lily.expand': 'onExpand',
      'lily.shrink': 'onShrink',
      'lily.onWidgetShow': 'onWidgetShow',

      // Triggered by api
      'lily.sendMessageToVisitor': 'sendMessageToVisitor',
      'lily.setOperatorGroup': 'setOperatorGroup',
      'lily.messageToOperator': 'onMessageToOperator',
    },

    // A map of states for the component.
    // Should not be modified or accessed directly (e.g: `this.state['ready']`)
    // Use getter/setters instead (e.g: `this.getState('ready')`)
    //
    // Note: setState should not be called from another component. State changes
    // have to be made internally.
    state: {
      load: false,
      ready: false,
      shown: false,
      firstOpen: true,
    },

    initialize: function() {
      this.el = this.render(this.elOptions);

      // Keep a reference to the iframe window object.
      // Will be used later to send messages using postMessage.
      // Child iframe window object can also be found in the "frame" array
      this.frame = document.getElementById(this.frameId).contentWindow;

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(mediator, this.events, this);

      // Forward change events triggered on state change to the event bus
      this.forwardStateChangeEvents(mediator, this.state, this);

      return this;
    },

    render: function(options) {
      if (!options) return;

      // Create dom elements
      var $lilyContainer = options.container ? this.createEl(options.container) : null;
      var $lilyIframe    = options ? this.createEl(options) : null;

      // Insert dom elements in the host site dom
      var body = document.body;
      this.insertInContainer($lilyContainer, body);
      this.insertInContainer($lilyIframe, $lilyContainer);

      return $lilyContainer;
    },

    onLoad: function(options) {
      if (options.shouldOpenStandalone) {
        this.shouldOpenStandalone = true;
      }

      this.setState('load', true);

      // Send informations about the host to lily iframe
      // for tracking purposes
      this.sendMessage('host.sendInfo', {
        host: window.location.host || null,
        path: window.location.pathname || null,
        href: window.location.href || null,
        protocol: window.location.protocol || null,
        referrer: document.referrer || null,
      });
    },

    onReady: function(options) {
      this.setState('ready', true);

      if (options && options.displayApp) {
        this.onExpand();
      } else {
        mediator.trigger('widget.show');
      }
    },

    onWidgetShow: function() {
      // Notify the lily app that the widget was shown
      // on the host website
      this.sendMessage('widget.shown', {
        firstShow: this.getState('firstShow')
      });
    },

    onMessageToOperator: function(message) {
      // Comming from third party. Check param integrity
      if (!_.isString(message)) return;
      this.trigger('lily.onMessageToOperator', message);
    },

    // Follow the information to lily that the operator group
    // for this page should be groupId
    setOperatorGroup: function(groupId) {
      this.sendMessage('config.setOperatorGroup', groupId);
    },

    onExpand: function() {
      var firstOpen = this.getState('firstOpen');

      // If the app should be opened in standalone mode (new tab,
      // currently only for mobile devices), do so and return here.
      // Widget should remain visible.
      if (this.shouldOpenStandalone) {
        return this.standaloneOpen();
      }

      if (this.getState('ready')) {
        this.show();
      } else {
        return mediator.once('lily.onReady', this.onExpand, this);
      }

      this.setState('shown', true);

      // Widget should hide before the app is shown
      mediator.trigger('widget.hide');

      // Show \o/
      this.show();

      // Notify the lily app that it's been shown
      this.sendMessage('lily.shown', {
        firstOpen: firstOpen
      });

      this.setState('firstOpen', false);

      // Will be used for the api to add behaviour onExpand
      mediator.trigger('lily.onExpand');
    },

    onShrink: function() {
      // Go no further if app is in standalone mode.
      if (this.shouldOpenStandalone) return;

      // Hide \o/
      this.hide();

      this.setState('shown', false);

      // Widget should be shown after the app was hidden
      mediator.trigger('widget.show');

      // Will be used for the api to add behaviour onShrink
      mediator.trigger('lily.onShrink');
    },

    sendMessageToVisitor: function(message) {
      this.sendMessage('lily.sendMessageToVisitor', message);
    },

    standaloneOpen: function() {
      var win = window.open(this.target, '_blank');
      win.focus();
    },

  }, xdm);

  return lilyComponent;
};