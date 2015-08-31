
var _         = require('./utils.js');
var Events    = require('./Events.js');
var component = require('./component.js');

/**
 * The mediator object is a singleton that will be used as a global event bus by a frame app
 * like lily or widget, to communicate across apps without needing
 * knowledge of the internals of the others
 *
 * It also has utility methods attatched to it, to set/get a registered app
 *
 */
module.exports = (function() {

  var _appsRegistry = {};

  var mediator = _.extend(component(), {

    events: {
      // Comming from widget app
      'widget.onShow': 'onWidgetShow',

      // Change events
      'lily.change:ready': 'onLilyReadyChange'
    },

    initialize: function() {

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(this, this.events);

      return this;
    },


    /**
     * Event listeners
     */

    onLilyReadyChange: function(ready) {
      if (ready) {
        this.trigger('lily.onReady');
      }
    },

    onWidgetShow: function(firstShow) {
      this.trigger('lily.onWidgetShow');
    },


    /**
     * Access and store the components in a central registory
     */

    registerApp: function(frame, uid) {
      _appsRegistry[uid] = frame;
      return frame;
    },

    getRegisteredApp: function(uid) {
      return _appsRegistry[uid] || undefined;
    },

    unRegisterApp: function(uid) {
      delete _appsRegistry[uid];
    },

  }, Events);

  mediator.initialize();

  return mediator;

})();
