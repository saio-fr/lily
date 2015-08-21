(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint strict:false */

var _ = require('./utils.js');

var slice = [].slice;

/**
 * Small events library taken from Backbone.js events api
 */

// Generate a unique integer id (unique within the entire client session).
// Useful for temporary DOM ids.
var idCounter = 0;
_.uniqueId = function(prefix) {
  var id = ++idCounter + '';
  return prefix ? prefix + id : id;
};

var Events = {
  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  on: function(name, callback, context) {
    if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({callback: callback, context: context, ctx: context || this});
    return this;
  },

  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, it will be removed.
  once: function(name, callback, context) {
    if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
    var self = this;
    var once = _.once(function() {
      self.off(name, once);
      callback.apply(this, arguments);
    });
    once._callback = callback;
    return this.on(name, once, context);
  },

  // Remove one or many callbacks. If `context` is null, removes all
  // callbacks with that function. If `callback` is null, removes all
  // callbacks for the event. If `name` is null, removes all bound
  // callbacks for all events.
  off: function(name, callback, context) {
    var retain, ev, events, names, i, l, j, k;
    if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
    if (!name && !callback && !context) {
      this._events = void 0;
      return this;
    }
    names = name ? [name] : _.keys(this._events);
    for (i = 0, l = names.length; i < l; i++) {
      name = names[i];
      if (events = this._events[name]) {
        this._events[name] = retain = [];
        if (callback || context) {
          for (j = 0, k = events.length; j < k; j++) {
            ev = events[j];
            if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                (context && context !== ev.context)) {
              retain.push(ev);
            }
          }
        }
        if (!retain.length) delete this._events[name];
      }
    }

    return this;
  },

  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  trigger: function(name) {
    if (!this._events) return this;
    var args = slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) return this;
    var events = this._events[name];
    var allEvents = this._events.all;
    if (events) triggerEvents(events, args);
    if (allEvents) triggerEvents(allEvents, arguments);
    return this;
  },

  // Tell this object to stop listening to either specific events ... or
  // to every object it's currently listening to.
  stopListening: function(obj, name, callback) {
    var listeningTo = this._listeningTo;
    if (!listeningTo) return this;
    var remove = !name && !callback;
    if (!callback && typeof name === 'object') callback = this;
    if (obj) (listeningTo = {})[obj._listenId] = obj;
    for (var id in listeningTo) {
      obj = listeningTo[id];
      obj.off(name, callback, this);
      if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
    }
    return this;
  }

};

// Regular expression used to split event strings.
var eventSplitter = /\s+/;

// Implement fancy features of the Events API such as multiple event
// names `"change blur"` and jQuery-style event maps `{change: action}`
// in terms of the existing API.
var eventsApi = function(obj, action, name, rest) {
  if (!name) return true;

  // Handle event maps.
  if (typeof name === 'object') {
    for (var key in name) {
      obj[action].apply(obj, [key, name[key]].concat(rest));
    }
    return false;
  }

  // Handle space separated event names.
  if (eventSplitter.test(name)) {
    var names = name.split(eventSplitter);
    for (var i = 0, l = names.length; i < l; i++) {
      obj[action].apply(obj, [names[i]].concat(rest));
    }
    return false;
  }

  return true;
};

// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy (most internal
// Backbone events have 3 arguments).
var triggerEvents = function(events, args) {
  var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
  switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
  }
};

var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

// Inversion-of-control versions of `on` and `once`. Tell *this* object to
// listen to an event in another object ... keeping track of what it's
// listening to.
_.each(listenMethods, function(implementation, method) {
  Events[method] = function(obj, name, callback) {
    var listeningTo = this._listeningTo || (this._listeningTo = {});
    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
    listeningTo[id] = obj;
    if (!callback && typeof name === 'object') callback = this;
    obj[implementation](name, callback, this);
    return this;
  };
});

// Aliases for backwards compatibility.
Events.bind   = Events.on;
Events.unbind = Events.off;

module.exports = Events;



},{"./utils.js":7}],2:[function(require,module,exports){
/* jshint strict: false */

var _      = require('./utils.js');
var xdm    = require('./xdm.js');
var Events = require('./Events.js');

module.exports = function() {

  var frame = {

    events: {},

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function() {},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this.el`.
    render: function() {
      return this.el;
    },

    createEl: function(options) {
      var $el = document.createElement(options.tagName || 'div');

      $el.innerHTML = options.html || '';
      this.setAttributes($el, options.attrs);
      this.setInlineStyle($el, options.styles);
      return $el;
    },

    insertInContainer: function(el, containerId) {
      return document.getElementById(containerId).appendChild(el);
    },

    insertInBody: function(element) {
      host.hostBody.appendChild(element);
    },

    hide: function() {
      this.setInlineStyle(this.el, 'display', 'none');
      window.focus();
    },

    show: function() {
      this.removeInlineStyle(this.el, 'display');
    },

    setAttributes: function(element, attributes) {
      _.each(attributes, function(value, attribute) {
        element.setAttribute(attribute, value);
      });
    },

    setInlineStyle: function(el, property, value) {
      var stylesObj = {};
      var style = el.style;

      // Single property
      if (_.isString(property)) {
        stylesObj[property] = value;
      } else { // Object with one or more properties
        stylesObj = property;
      }

      // IE > 9
      if ('setProperty' in style) {
        _.each(stylesObj, function(value, property) {
          style.setProperty(property, '' + value, 'important');
        }) ;
      } else {
        _setInlineStyleCompat(el, stylesObj);
      }
    },

    removeInlineStyle: function(el, property) {
      var style = el.style;
      if ('removeProperty' in style) {
        style.removeProperty(property);
      } else {
        _removeInlineStyleCompat(property);
      }
    },

    delegateEvents: function(other, events, ctx) {
      if (!events) return this;
      this.undelegateEvents(other || this);
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        this.listenTo(other || this, key, _.bind(method, ctx || this));
      }
      return this;
    },

    undelegateEvents: function(obj) {
      this.stopListening(obj || this);
    },

    remove: function() {
      if (this.el) {
        this.el.parentNode.removeChild(this.el);
      }
      this.stopListening();
      return this;
    },

  };

  _.extend(frame, xdm, Events);

  function _setInlineStyleCompat(el, stylesObj) {
    var props = [];
    _.each(stylesObj, function(value, property) {
      props.push(property + ':' + value + ' !important');
    });

    el.style.cssText = props.join(';');
  }

  function _removeInlineStyleCompat() {
    this._setInlineStyleCompat({});
  }

  return frame;

};

},{"./Events.js":1,"./utils.js":7,"./xdm.js":9}],3:[function(require,module,exports){
/* jshint strict: false */

/**
 * The host object will be used as a global event bus by a frame app
 * like lily or widget, to communicate across apps without needing
 * knowledge of the internals of the others
 *
 * It also has utility methods attatched to it, to set/get a registered app
 * or manipulate urls.
 *
 */

var _      = require('./utils.js');
var Events = require('./Events.js');

var countInit = 0;

var hostComponent = (function() {

  var stylesUrl = '{{ licence|customerDir|raw }}/css/lily-float.css';
  var appsRegistry = {};

  var _host = _.extend(frame(), {

    // Reference to the host document object
    hostDocument: window.document,

    // Reference to the host window object
    hostWindow: window,

    // Reference to the host body dom element
    hostBody: window.document.getElementsByTagName('body')[0],

    // Origin part of the host location
    origin: window.location.origin || this.getOrigin(window.location.href), // IE 11+ only

    // Host part of the host location
    host: window.location.host || this.getHost(window.location.href),

    // Empty link used to retrieve url parts in the
    // `getHost` and `getOrigin` methods
    emptyLink: window.document.createElement('a'),

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
      countInit ++;

      // Register this unique id for the host window
      this.registerApp(this.hostWindow, 'host');

      // Load the external stylesheet used to style the widget
      // and the app wrapper
      this.loadExtStyles(stylesUrl);

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(this, this.events);

      // Listen for messages sent to the hostWindow using the postMessage API
      // (Messages we read this way can come from multiple third parties
      // and should not be trusted.)
      _.addEvent(this.hostWindow, 'message', _.bind(this.onTargetMessage, this));

      return this;
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
     * Utility methods accessible on the host object
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

      var sender = message.sender;
      var hostLocation;

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
          this.trigger(message.name, message.data);
        }
      }

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

  }, Events);

  return _host;

})();

var host = hostComponent.initialize();

console.log(countInit);

module.exports = host;

},{"./Events.js":1,"./utils.js":7}],4:[function(require,module,exports){
/* jshint strict: false */

var frame = require('./frame.js');
var host  = require('./hostComponent.js');
var _     = require('./utils.js');

module.exports = function() {

  var _lilyComponent = _.extend(frame(), {

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'lily',

    // Will be used as src for the iframe
    target: '{{ url("lily_app_index", { licence: licence }) }}',

    // Origin part of the target url
    origin: host.getOrigin('{{ url("lily_app_index", { licence: licence }) }}'),

    // host part of the target url
    host: host.getHost('{{ url("lily_app_index", { licence: licence }) }}'),

    // frame window will be given the iframe window when inserted in the dom
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

      // Triggered by api
      'lily.sendMessageToVisitor': 'sendMessageToVisitor',
    },

    initialize: function() {
      this.el = this.render(this.getElOptions());

      // Keep a reference to the iframe window object.
      // Will be used later to send messages using postMessage.
      // Child iframe window object can also be found in the "frame" array
      this.window = host.hostDocument.getElementById(this.frameId).contentWindow;

      // Create listeners for the events listed in the 'events' objects
      this.delegateEvents(host, this.events, this);

      // Register this unique id for the lily App iframe
      host.registerApp(this, this.uid);

      return this;
    },

    render: function(options) {
      if (!options) return;

      // Create dom elements
      var $lilyContainer = options.container ? this.createEl(options.container) : null,
          $lilyIframe    = options ? this.createEl(options) : null;

      // Insert dom elements in the host site dom
      this.insertInBody($lilyContainer);
      this.insertInContainer($lilyIframe, options.container.attrs.id);

      return $lilyContainer;
    },

    getElOptions: function() {
      return {
        tagName: 'iframe',
        attrs: {
          'id': this.frameId,
          'allowTransparency': 'true',
          'frameBorder': '0',
          'scrolling': 'yes',
          'name': 'saio_lily_app',
          'role': 'dialog',
          'src': this.target
        },

        container: {
          tagName: 'div',
          attrs: {
            'id': 'lilyAppContainer',
          },
          styles: {
            'display': 'none',
          }
        },
      };
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
      mediator.trigger('lily.onReady');

      if (options && options.displayApp) {
        this.showApp();
      } else {
        mediator.trigger('widget.show');
      }
    },

    hideApp: function() {
      // Go no further if app is in standalone mode.
      if (host.shouldOpenStandalone) return;

      // Hide \o/
      this.hide();

      // Global flag for the state of the app
      //
      // NOTE: It would probably make more sence and be less messy
      // to have a `state` associated with each app and getter/setters
      // to access/modify this state
      host.lilyIsShown = false;

      // Widget should be shown after the app was hidden
      mediator.trigger('widget.show');

      // Will be used for the api to add behaviour onShrink
      mediator.trigger('lily.onShrink');
    },

    showApp: function() {
      var firstOpen = this.firstOpen;

      // If the app should be opened in standalone mode (new tab,
      // currently only for mobile devices), do so and return here.
      // Widget should remain visible.
      if (this.shouldOpenStandalone) {
        return this.standaloneOpen();
      }

      if (host.isLilyReady) {
        this.show();
      } else {
        return mediator.once('lily.onReady', this.showApp, this);
      }

      host.lilyIsShown = true;

      // Widget should hide before the app is shown
      mediator.trigger('widget.hide');

      // Show \o/
      this.show();

      // Notify the lily app that it's been shown
      this.sendMessage('lily.shown', {
        firstOpen: firstOpen
      });

      this.firstOpen = false;

      // Will be used for the api to add behaviour onExpand
      mediator.trigger('lily.onExpand');
    },

    sendMessageToVisitor: function(message) {
      this.sendMessage('lily.sendMessageToVisitor', message);
    },

    standaloneOpen: function() {
      var win = window.open(this.target, '_blank');
      win.focus();
    },

  });

  return _lilyComponent;
};

},{"./frame.js":2,"./hostComponent.js":3,"./utils.js":7}],5:[function(require,module,exports){
/* jshint strict: false */
/* global window */

/**
 * The whole project will get wrapped in:
 *
 * (function(window, document, undefined) {
 *   (...)
 * })(this, document);
 *
 * In the build file created by the grunt task
 */

var lilyComponent   = require('./lilyComponent.js');
var widgetComponent = require('./widgetComponent.js');
var sdk             = require('./sdk.js');
var _               = require('./utils.js');

// Reference to the saio array queue created
// in snippet on publisher's website
var saioq = window.saio || [];

// IE version < 10 or unsupported features such as JSON or postMessage.
// Stop here, not supported
if (_.isUnsuported()) {
  throw Error('Navigator unsupported');
}

// Snippet version.
var snippetVersion = saioq && saioq.SNIPPET_VERSION ?
  parseFloat(saioq.SNIPPET_VERSION, 10) : 0;

// Initialize host (mediator + keep ref to the host window),
// and other apps (lily and widget for now)
lilyComponent().initialize();
widgetComponent().initialize();

// Before swapping the global, replay an existing global `saio` queue.
while (saioq && saioq.length > 0) {
  var args = saioq.shift();
  var method = args.shift();

  if (saio[method]) {
    sdk[method].apply(saio, args);
  }
}

// Finally, replace the global queue with the public interface in sdk.
window.saio = sdk;

},{"./lilyComponent.js":4,"./sdk.js":6,"./utils.js":7,"./widgetComponent.js":8}],6:[function(require,module,exports){
/* jshint strict: false */

var _ = require('./utils.js');

module.exports = (function() {

  var configMethods = {
    'setOperatorGroup': function(groupId) {
      if (!_.isString(groupId)) {
        console.error('groupId should be a string containing the operator group id');
      }
      mediator.trigger('config.setOperatorGroup', groupId);
    },

    'config.box.startExpanded': function() {
      mediator.trigger('lily.expand');
    },
  };

  // Can be triggered on the host website using the sdk
  var apiMethods = {
    // Widget & iframe show/hide events
    'api.widget.show': function() {
      mediator.trigger('widget.show');
    },

    'api.widget.hide': function() {
      mediator.trigger('widget.hide');
    },

    'api.box.expand': function() {
      mediator.trigger('lily.expand');
    },

    'api.box.shrink': function() {
      mediator.trigger('lily.shrink');
    },

    'api.widget.onShow': function(callback) {
      if (_.isFunction(callback)) {
        mediator.on('widget.onShow', callback, {});
      }
    },

    'api.widget.onHide': function(callback) {
      if (_.isFunction(callback)) {
        mediator.on('widget.onHide', callback, {});
      }
    },

    'api.box.onExpand': function(callback) {
      if (_.isFunction(callback)) {
        mediator.on('lily.onExpand', callback, {});
      }
    },

    'api.box.onShrink': function(callback) {
      if (_.isFunction(callback)) {
        mediator.on('lily.onShrink', callback, {});
      }
    },

    'api.onReady':              'onReady',
    'api.onChatSessionStart':   'onChatSessionStart',
    'api.onAviSessionStart':    'onAviSessionStart',

    // WIP, Do not use in production
    'api.sendMessageToVisitor': function(message) {
      if (!message || !(_.isObject(message) && _.isString(message.body))) {
        console.warn('malformed message. See documentation at:');
      }
      mediator.trigger('lily.sendMessageToVisitor', {
        body: message.body,
        type: message.type || 'simple',
      });
    },

    'api.onMessageToOperator': function(callback) {
      mediator.on('lily.onMessageToOperator', function(message) {
        if (_.isFunction(callback)) {
          callback(message);
        }
      });
    },

    'api.onQuestionAskedToAvi': 'onQuestionAskedToAvi'
  };

  function config(name, obj) {
    if (!_.isString(name)) {
      throw Error('first argument should be a string');
    }

    if (configMethods[name]) {
      configMethods[name].call(this, obj);
    }
  }

  function api(name, obj) {
    if (!_.isString(name)) {
      throw Error('first argument should be a string');
    }

    if (apiMethods[name]) {
      apiMethods[name].call(this, obj);
    }
  }

  return {
    config: config,
    api: api
  };

})();

},{"./utils.js":7}],7:[function(require,module,exports){
/* jshint strict:false */
module.exports = (function () {

  // shorthand reference to native types prototype methods:
  var slice = [].slice;
  var toString = {}.toString;

  /*
   * isObject, extend, isFunction, throttle, debounce and each are taken from undescore/lodash in
   * order to remove the dependency
   */
  return {

    isArray: function(arr) {
      return Object.prototype.toString.call(arr) === '[object Array]';
    },

    isObject: function(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    },

    isFunction: function(obj) {
      if (typeof /./ !== 'function' && typeof Int8Array !== 'object') {
        return typeof obj === 'function' || false;
      } else {
        return toString.call(obj) === '[object Function]';
      }
    },

    isString: function(obj) {
      return toString.call(obj) === '[object String]';
    },

    isOwn: function(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    },

    bind: function(fn, context) {
      // Quick check to determine if target is callable, in the spec
      // this throws a TypeError, but we will just return undefined.
      if (!this.isFunction(fn)) {
        return undefined;
      }

      var args = slice.call( arguments, 2 );

      return function() {
        return fn.apply(context || this, args.concat(slice.call(arguments)));
      };
    },

    each: function(obj, iteratee) {
      var i, length;
      if (_.isArray(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
          iteratee(obj[i], i, obj);
        }
      } else {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            iteratee(obj[key], key, obj);
          }
        }
      }
    },

    extend: function(obj) {
      if (!this.isObject(obj)) {
        return obj;
      }
      var source, prop;
      for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
          if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
            var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
            Object.defineProperty(obj, prop, propertyDescriptor);
          } else {
            obj[prop] = source[prop];
          }
        }
      }
      return obj;
    },

    throttle: function(func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options) options = {};
      var later = function() {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      };
      return function() {
        var now = _.now();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    },

    debounce: function(func, wait, immediate) {
      var timeout, args, context, timestamp, result;

      var later = function() {
        var last = _.now() - timestamp;

        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout) context = args = null;
          }
        }
      };

      return function() {
        context = this;
        args = arguments;
        timestamp = _.now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }

        return result;
      };
    },

    once: function(func) {
      var result;
      var wasCalled = false;

      return function() {
        if (wasCalled)
          return result;
        else {
          wasCalled = true;
          result = func.apply(this, arguments);
          func = null;
          return result;
        }
      };
    },

    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    keys: function(obj) {
      if (!_.isObject(obj)) return [];
      if (Object.keys) return Object.keys(obj);
      var keys = [];
      for (var key in obj) if (_.has(obj, key)) keys.push(key);
      return keys;
    },

    addEvent: function(el, type, callback) {
      if (window.addEventListener) { // modern browsers including IE9+
        el.addEventListener(type, callback, false);
      } else if (window.attachEvent) { // IE8 and below
        el.attachEvent('on' + type, callback);
      } else {
        el['on' + type] = callback;
      }
    },

    removeEvent: function(el, type, callback) {
      if (window.removeEventListener) {
        el.removeEventListener(type, callback, false);
      } else if (window.detachEvent) {
        el.detachEvent('on' + type, callback);
      } else {
        el['on' + type] = null;
      }
    },

    stopPropagation: function(type) {
      var e = type || window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    },

    // Checks if browser id IE 9 or lower
    isMsie: function() {
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        var ieversion = +(RegExp.$1);
        if (ieversion < 10) {
          return true;
        }
      }
    },

    isUnsuported: function() {
      if (this.isMsie())
        return true;
      if (!window.postMessage)
        return true;
      if (!window.JSON)
        return true;
      try {
        window.postMessage('ping', '*');
      } catch (err) {
        return true;
      }

      return false;
    },

    now: Date.now,
  };

})();


},{}],8:[function(require,module,exports){
/* jshint strict: false */

var frame = require('./frame.js');
var host  = require('./hostComponent.js');
var _     = require('./utils.js');

module.exports = function() {

  var _widgetComponent = _.extend(frame(), {

    // Create a unique identifier for the lily App
    // that will be used to identify the iframed saio app
    // to ensure a secured communication between host && client
    // using the postMessage api.
    uid: 'widget',

    // Widget is not an iframe (for now. Could be in the future,
    // hence the structure mimicking the structure for creating lily)

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
      'widget.hide': 'hideWidget',
    },

    initialize: function() {
      this.el = this.render(this.getElOptions());

      // Create listeners for the events listed in the 'events' objects
      // on the host eventBus
      this.delegateEvents(host, this.events, this);

      // Register this unique id for the lily App iframe
      host.registerApp(this, this.uid);

      this.registerDomEvents();

      return this;
    },

    render: function(options) {
      var $widget = this.createEl(options);
      this.insertInBody($widget);
      return $widget;
    },

    registerDomEvents: function() {
      _.addEvent(this.el, 'click', _.bind(this.onWidgetClick, this));
    },

    getElOptions: function() {
      return {
        tagName: 'div',
        html: '{{ widget }}',
        styles: {
          'display': 'none',
        },
        attrs: {
          'id': this.frameId
        }
      };
    },

    // Not great. Widget shouldn't know lily, or it should be a part of lily.
    // We'll settle with that for now
    sendMessageToLily: function(name, obj) {
      var lily = host.getRegisteredApp('lily');
      if (lily) {
        lily.sendMessage(name, obj);
      }
    },

    onWidgetClick: function() {
      this.sendMessage('widget.click');
      mediator.trigger('widget.click');
    },

    showWidget: function() {
      if (host.widgetIsShown || host.lilyIsShown) {
        return;
      }

      if (host.isLilyReady) {
        this.show();
      } else {
        return mediator.once('lily.onReady', this.showWidget, this);
      }

      // Notify the lily app that the widget was shown
      // on the host website
      this.sendMessageToLily('widget.shown', {
        firstShow: this.firstShow
      });

      this.firstShow = false;
      host.widgetIsShown = true;

      // Will be used for the api to add behaviour onShow
      mediator.trigger('widget.onShow');
    },

    hideWidget: function() {
      this.hide();
      host.widgetIsShown = false;

      // Will be used for the api to add behaviour onHide
      mediator.trigger('widget.onHide');
    }

  });

  return _widgetComponent;

};

},{"./frame.js":2,"./hostComponent.js":3,"./utils.js":7}],9:[function(require,module,exports){
/* jshint strict:false */
module.exports = (function() {

  return {
    sendMessage: function(name, data) {
      var message = JSON.stringify({
        scope: 'client',
        name: name,
        data: data
      });

      console.log('client' + ': ' + name);

      var send = (function(target, message) {
        return function() {
          var targetWindow = target.window;
          if (targetWindow) {
            targetWindow.postMessage(message, target.origin);
          } else {
            setTimeout(send, 500);
          }
        };

      })(this, message);

      // if (this.isReady()) {
      send();
      // } else {
      //   this.on('ready', send);
      // }
    }
  };

})();


},{}]},{},[5]);
