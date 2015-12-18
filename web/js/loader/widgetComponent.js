var mediator  = require('./mediator.js');
var component = require('./component.js');
var xdm       = require('./xdm.js');
var _         = require('./utils.js');

var iframeSrc = '{{ url("lily_widget_index", { licence: licence }) }}';

var elOptions = {
  tagName: 'iframe',

  attrs: {
    id: 'widget-app',
    allowTransparency: 'true',
    frameBorder: '0',
    scrolling: 'yes',
    name: 'saio_widget_app',
    role: 'dialog',
    src: iframeSrc
  },

  container: {
    tagName: 'div',
    attrs: {
      id: 'lily-widget-container',
      class: 'hidden-animation-state',
    },
    styles: {
      display: 'none',
    }
  },
};

module.exports = function() {

  var _widgetComponent = _.extend(component(), {

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'widget',

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

    // Custom option object
    options: {},

    // Html id for the element
    id: elOptions.container.attrs.id,

    // HTML id for the iframe
    frameId: elOptions.attrs.id,

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency and readability.
    events: {
      'widget.click': 'onWidgetClick',
      'widget.show': 'showWidget',
      'widget.hide': 'hideWidget',
      'widget.load': 'onLoad',
      'widget.ready': 'onReady',
      'widget.changeDimensions': 'onChangeDimensions',

      'widget.attentionGrabberEnabled': 'onAttentionGraberEnable',
      'app.position': 'onSetPosition',

      'lily.onExpand': 'onLilyExpand',
      'lily.sendOptions': 'onSendOptions',
      'lily.chatOperatorChange': 'onOperatorChange',
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
      firstShow: true,
    },

    initialize: function() {
      this.el = this.render(elOptions);

      // Keep a reference to the iframe window object.
      // Will be used later to send messages using postMessage.
      // Child iframe window object can also be found in the "frame" array
      this.frame = document.getElementById(this.frameId).contentWindow;

      // Create listeners for the events listed in the 'events' objects
      // on the eventBus
      this.delegateEvents(mediator, this.events, this);

      // Forward change events triggered on state change to the event bus
      this.forwardStateChangeEvents(mediator, this.state, this);

      this.registerDomEvents();

      return this;
    },

    render: function(options) {
      if (!options) return;

      // Create dom elements
      var $widgetContainer = options.container ? this.createEl(options.container) : null;
      var $widgetIframe    = options ? this.createEl(options) : null;

      // Insert dom elements in the host site dom
      this.insertInContainer($widgetContainer, document.body);
      this.insertInContainer($widgetIframe, $widgetContainer);

      return $widgetContainer;
    },

    registerDomEvents: function() {
      _.addEvent(this.el, 'click', _.bind(this.onWidgetClick, this));
    },

    onLoad: function() {
      this.setState('load', true);
    },

    onReady: function() {
      this.setState('ready', true);
    },

    onChangeDimensions: function(size) {
      this.setInlineStyle(this.el, {
        height: size.height,
        width: size.width
      });
    },

    onSetPosition: function(position) {
      if (position === 'left') {
        this.el.classList.add('left');
      } else {
        this.el.classList.remove('left');
      }

      this.sendMessage('app.setPosition', position);
    },

    onLilyExpand: function() {
      this.sendMessage('widget.onLilyExpand');
    },

    onSendOptions: function(options) {
      options = _.extend(options || {}, this.options);
      this.sendMessage('widget.sendsOptions', options);
    },

    onAttentionGraberEnable: function(enabled) {
      this.options.isAttentionGrabberEnabled = enabled;
    },

    onOperatorChange: function(operator) {
      this.sendMessage('lily.onOperatorChange', operator);
    },

    onWidgetClick: function() {
      var lily = mediator.getRegisteredApp('lily');

      mediator.trigger('lily.onWidgetClick', {
        expand: !lily.getState('shown')
      });

      if (lily.getState('shown')) {
        mediator.trigger('lily.shrink');
      } else {
        mediator.trigger('lily.expand');
      }
    },

    showWidget: function(options) {
      var lily = mediator.getRegisteredApp('lily');

      if (this.getState('shown') || mediator.widgetHiddenFromApi && !mediator.widgetShownFromApi) {
        return;
      }

      if (lily.getState('ready')) {
        if (this.getState('ready')) {
          this.show();
        } else {
          // Call again with the same arguments
          return mediator.once('widget.ready', _.bind(this.showWidget, this, options));
        }
      } else {
        // Call again with the same arguments
        return mediator.once('lily.onReady', _.bind(this.showWidget, this, options));
      }

      // Will be used for the api to add behaviour onShow
      mediator.trigger('widget.onShow', this.firstShow);

      this.setState('firstShow', false);
      this.setState('shown', true);
    },

    hideWidget: function() {
      this.hide();
      this.setState('shown', false);

      // Will be used for the api to add behaviour onHide
      mediator.trigger('widget.onHide');
    }

  }, xdm);

  return _widgetComponent;
};
