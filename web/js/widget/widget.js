/* jshint strict: false */
/* global _, saio, Iframe */

var WidgetIframe = function() {

 return _.extend({

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'widget',

    // Widget is not an iframe (for now. Could be in the future,
    // hence the structure mimicking the structure for creating lily)
    // and has to communicate directly to the lily app. So this.window gets
    // a reference to the lily frame window.
    window: saio.getRegisteredApp('lily').window,

    // Same here: use the lily iframe's origin
    origin: saio.getRegisteredApp('lily').origin,

    // Will be set when creating the dom element
    el: undefined,

    // Html id for the element
    frameId: 'lily-widget-container',

    // Flag used for analytics tracking
    firstShow: true,

    // A map of events for this object
    // Callbacks will be bound to the "view", with `this` set properly.
    // Uses event delegation for efficiency.
    events: {
      'widget.show': 'showWidget',
      'widget.hide': 'hide',
    },

    load: function() {
      this.el = this.createWidget(this.getElOptions());
      this.insertInBody(this.el);

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(saio, this.events);

      // Register this unique id for the lily App iframe
      saio.registerApp(this, this.uid);

      _.addEvent(this.el, 'click', _.bind(this.onWidgetClick, this));
    },

    getElOptions: function() {
      return {
        iframe: {
          // not an iframe for now
        },
        frameId: this.frameId,
        html: '{{ widget }}',
        styles: {
          'display': 'none',
        }
      };
    },

    onWidgetClick: function() {
      this.sendMessage('widget.click');
      saio.trigger('widget.click');
    },

    showWidget: function() {
      if (saio.isLilyReady) {
        this.show();
      } else {
        return saio.once('lily.onReady', this.showWidget, this);
      }

      this.sendMessage('widget.show', {
        firstShow: this.firstShow
      });

      this.firstShow = false;
    },

  }, Iframe, Events);

};
