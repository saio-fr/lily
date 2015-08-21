var mediator  = require('./mediator.js');
var component = require('./component.js');
var _         = require('./utils.js');

module.exports = function() {

  var _widgetComponent = _.extend(component(), {

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'widget',

    // Will be set when creating the dom element
    el: undefined,

    // Html id for the element
    id: 'lily-widget-container',

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency and readability.
    events: {
      'widget.show': 'showWidget',
      'widget.hide': 'hideWidget',
    },

    // A map of states for the component.
    // Should not be modified or accessed directly (e.g: `this.state['ready']`)
    // Use getter/setters instead (e.g: `this.getState('ready')`)
    //
    // Note: setState should not be called from another component. State changes
    // have to be made internally.
    state: {
      'shown': false,
      'firstShow': true,
    },

    // Not unit tested
    getElOptions: function() {
      return {
        tagName: 'div',
        html: '{{ widget }}',
        styles: {
          'display': 'none',
        },
        attrs: {
          'id': this.id
        }
      };
    },

    initialize: function() {
      this.el = this.render(this.getElOptions());

      // Create listeners for the events listed in the 'events' objects
      // on the eventBus
      this.delegateEvents(mediator, this.events, this);

      // Forward change events triggered on state change to the event bus
      this.forwardStateChangeEvents(mediator, this.state, this);

      this.registerDomEvents();

      return this;
    },

    render: function(options) {
      var $widget = this.createEl(options);
      this.insertInContainer($widget, document.body);
      return $widget;
    },

    registerDomEvents: function() {
      _.addEvent(this.el, 'click', _.bind(this.onWidgetClick, this));
    },

    // Not unit tested
    onWidgetClick: function() {
      mediator.trigger('widget.click');
    },

    showWidget: function() {
      var lily = mediator.getRegisteredApp('lily');

      if (this.getState('shown') || lily.getState('shown')) {
        return;
      }

      if (lily.getState('ready')) {
        this.show();
      } else {
        return mediator.once('lily.onReady', this.showWidget, this);
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

  });

  return _widgetComponent;
};
