
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

  var appsRegistry = {};

  var mediator = _.extend(component(), {

    events: {
      // Comming from widget app
      'widget.click': 'onWidgetClick',
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
     * Methods called after a event from lily was fired
     */

    onLilyReadyChange: function(ready) {
      if (ready) {
        this.trigger('lily.onReady');
      }
    },

    /**
     * Methods called after a event from widget was fired
     */

    onWidgetClick: function() {
      this.trigger('lily.expand');
    },

    onWidgetShow: function(firstShow) {
      this.trigger('lily.onWidgetShow');
    },

    /**
     * Access and store the components in a central registory
     */
    registerApp: function(frame, uid) {
      appsRegistry[uid] = frame;
      return frame;
    },

    unRegisterApp: function(uid) {
      delete appsRegistry[uid];
    },

    getRegisteredApp: function(uid) {
      return appsRegistry[uid] || undefined;
    },

  }, Events);

  mediator.initialize();

  return mediator;
})();
