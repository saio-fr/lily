/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

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

	var lilyComponent   = __webpack_require__(1);
	var hostComponent   = __webpack_require__(7);
	var widgetComponent = __webpack_require__(8);
	var mediator        = __webpack_require__(5);
	var sdk             = __webpack_require__(9);
	var _               = __webpack_require__(3);

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

	// Initialize host and other apps (lily and widget for now)
	var host   = hostComponent().initialize();
	var lily   = lilyComponent().initialize();
	var widget = widgetComponent().initialize();

	// Register the different component instances with a unique id
	mediator.registerApp(host, 'host');
	mediator.registerApp(lily, 'lily');
	mediator.registerApp(widget, 'widget');

	// Before swapping the global, replay an existing global `saio` queue.
	while (saioq && saioq.length > 0) {
	  var args = saioq.shift();
	  var method = args.shift();

	  if (saio[method]) {
	    // call the method on sdk
	    sdk[method].apply(saio, args);
	    sdk.calledBeforeLoad = true;
	  }
	}

	// Finally, replace the global queue with the public interface in sdk.
	window.saio = sdk;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
	var component = __webpack_require__(2);
	var mediator  = __webpack_require__(5);
	var xdm       = __webpack_require__(6);
	var _         = __webpack_require__(3);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint strict: false */

	var _      = __webpack_require__(3);
	var Events = __webpack_require__(4);

	module.exports = function() {

	  var component = {

	    // A map of events for this object
	    // Callbacks will be bound to the "view", with `this` set properly.
	    // Uses event delegation for efficiency.
	    events: {},

	    // A map of states for the component.
	    // Should not be modified or accessed directly (e.g: `this.state['ready']`)
	    // Use getter/setters instead (e.g: `this.getState('ready')`)
	    //
	    // Note: setState should not be called from another component. State changes
	    // have to be made internally.
	    state: {},

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function() {},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this.el`.
	    render: function() {
	      return this.el;
	    },

	    // Get the value of a state set in the state map
	    getState: function(state) {
	      return this.state[state];
	    },

	    // Set the value of a state in the state map.
	    // Changes to a state will trigger an event.
	    setState: function(state, value) {
	      var previous = this.state[state];
	      this.state[state] = value;

	      if (typeof previous !== 'undefined' && value !== previous) {
	        this.trigger('change', this.state);
	        this.trigger('change:' + state, value);
	      }
	    },

	    createEl: function(options) {
	      var $el = document.createElement(options.tagName || 'div');

	      $el.innerHTML = options.html || '';
	      this.setAttributes($el, options.attrs);
	      this.setInlineStyle($el, options.styles);
	      return $el;
	    },

	    insertInContainer: function(el, container) {
	      if (_.isString(container)) {
	        container = document.getElementById(container);
	      }

	      return container.appendChild(el);
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

	    forwardStateChangeEvents: function(eventBus, states, context) {
	      _.each(states, function(value, state) {
	        var eventName = 'change:' + state;

	        // Listen to internal change events and forward to the mediator
	        context.on(eventName, function() {

	          // Turn arguments into a real array (not array-like object)
	          var args = [].slice.call(arguments);

	          // Set the first argument to be the event name
	          args.unshift(this.uid + '.' + eventName);

	          // Call trigger with the proper arguments using apply
	          eventBus.trigger.apply(eventBus, args);
	        });
	      });
	    },

	    removeEl: function() {
	      if (this.el) {
	        this.el.parentNode.removeChild(this.el);
	      }
	      return this;
	    },

	    remove: function() {
	      this.removeEl();
	      this.stopListening();
	      return this;
	    },

	  };

	  _.extend(component, Events);

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

	  return component;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* jshint strict:false */
	module.exports = (function () {

	  // shorthand reference to native types prototype methods:
	  var slice = [].slice;
	  var toString = {}.toString;

	  /*
	   * isObject, extend, isFunction, throttle, debounce and each are taken from undescore/lodash in
	   * order to remove the dependency
	   */
	  var _ = {

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

	    // Empty link used to retrieve url parts in the
	    // `getHost` and `getOrigin` methods
	    emptyLink: window.document.createElement('a'),

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

	    now: Date.now,
	  };

	  return _;

	})();



/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint strict:false */

	var _ = __webpack_require__(3);

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
	    if (!this._events) {this._events = {};}
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
	      var args = slice.call(arguments);
	      self.off(name, once);
	      callback.apply(this, args);
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
	      events = this._events[name];
	      if (events) {
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




/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	
	var _         = __webpack_require__(3);
	var Events    = __webpack_require__(4);
	var component = __webpack_require__(2);

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	
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
	          var targetWindow = target.frame;
	          if (targetWindow) {
	            targetWindow.postMessage(message, target.origin);
	          } else {
	            setTimeout(send, 500);
	          }
	        };

	      })(this, message);

	      if (this.getState('load')) {
	        send();
	      } else {
	        this.on('change:load', send);
	      }
	    }
	  };

	})();



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var mediator = __webpack_require__(5);
	var _        = __webpack_require__(3);

	module.exports = function() {

	  var stylesUrl = '{{ licence|customerDir|raw }}/css/lily-float.css';

	  var host = {

	    // Origin part of the host location
	    origin: window.location.origin || _.getOrigin(window.location.href), // IE 11+ only

	    // Host part of the host location
	    host: window.location.host || _.getHost(window.location.href),

	    initialize: function() {

	      // Load the external stylesheet used to style the widget
	      // and the app wrapper
	      this.loadExtStyles(stylesUrl);

	      // Listen for messages sent to the host window using the postMessage API
	      // (Messages we read this way can come from multiple third parties
	      // and should not be trusted.)
	      _.addEvent(window, 'message', _.bind(this.onTargetMessage, this));

	      return this;
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

	    /**
	     * Listen to the messages sent wia postMessage,
	     * comming from the different iframes
	     */
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
	      if (sender && mediator.getRegisteredApp(sender)) {
	        hostLocation = mediator.getRegisteredApp(sender);
	      }

	      if (hostLocation && _.getHost(event.origin) === hostLocation.host) {
	        // Scope should be saio (only scope for message comming from a saio iframe)
	        if (event.origin === hostLocation.origin && message.scope === 'saio') {
	          // Do something with received message
	          mediator.trigger(message.name, message.data);
	        }
	      }
	    },

	  };

	  return host;
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var mediator  = __webpack_require__(5);
	var component = __webpack_require__(2);
	var _         = __webpack_require__(3);

	var elOptions = {
	  tagName: 'div',
	  html: '{{ widget }}',
	  styles: {
	    'display': 'none',
	  },
	  attrs: {
	    'id': 'lily-widget-container'
	  }
	};

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
	    id: elOptions.attrs.id,

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
	      shown: false,
	      firstShow: true,
	    },

	    initialize: function() {
	      this.el = this.render(elOptions);

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

	    onWidgetClick: function() {
	      mediator.trigger('lily.expand');
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


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* jshint strict: false */

	var _    = __webpack_require__(3);
	var mediator = __webpack_require__(5);

	module.exports = (function() {

	  // Any sdk method was called using the saio public object
	  // before all the scripts were loaded
	  var calledBeforeLoad = false;

	  var configMethods = {
	    'chat.setOperatorGroup': function(groupId) {
	      if (!_.isString(groupId)) {
	        console.error('groupId should be a string containing the operator group id');
	      }
	      mediator.trigger('config.setOperatorGroup', groupId);
	    },

	    'box.startExpanded': function() {
	      mediator.trigger('lily.expand');
	    },
	  };

	  // Can be triggered on the host website using the sdk
	  var apiMethods = {
	    // Widget & iframe show/hide events
	    'widget.show': function() {
	      mediator.trigger('widget.show');
	    },

	    'widget.hide': function() {
	      mediator.trigger('widget.hide');
	    },

	    'box.expand': function() {
	      mediator.trigger('lily.expand');
	    },

	    'box.shrink': function() {
	      mediator.trigger('lily.shrink');
	    },

	    'widget.onShow': function(callback) {
	      if (_.isFunction(callback)) {
	        mediator.on('widget.onShow', callback, {});
	      }
	    },

	    'widget.onHide': function(callback) {
	      if (_.isFunction(callback)) {
	        mediator.on('widget.onHide', callback, {});
	      }
	    },

	    'box.onExpand': function(callback) {
	      if (_.isFunction(callback)) {
	        mediator.on('lily.onExpand', callback, {});
	      }
	    },

	    'box.onShrink': function(callback) {
	      if (_.isFunction(callback)) {
	        mediator.on('lily.onShrink', callback, {});
	      }
	    },

	    // Should only be registered once. If it happens to be registered multiple time,
	    // return previous return value.
	    'app.onReady': function(callback) {
	      return _.once(function() {
	        var lily = mediator.getRegisteredApp('lily');

	        if (_.isFunction(callback)) {
	          if (lily.getState('ready')) {
	            return callback();
	          }
	          mediator.once('lily.onReady', callback, {});
	        }
	      });
	    },

	    'api.onChatSessionStart':   'onChatSessionStart',
	    'api.onAviSessionStart':    'onAviSessionStart',

	    // WIP, Do not use in production
	    'chat.sendMessageToVisitor': function(message) {
	      if (!message || !(_.isObject(message) && _.isString(message.body))) {
	        console.warn('malformed message. See documentation at:');
	      }
	      mediator.trigger('lily.sendMessageToVisitor', {
	        body: message.body,
	        type: message.type || 'simple',
	      });
	    },

	    'chat.onMessageToOperator': function(callback) {
	      mediator.on('lily.onMessageToOperator', function(message) {
	        if (_.isFunction(callback)) {
	          callback(message);
	        }
	      });
	    },

	    'avi.onAskedQuestion': 'onAskedQuestionToAvi'
	  };

	  function config(name, obj) {
	    if (!_.isString(name)) {
	      throw Error('first argument should be a string');
	    }

	    if (configMethods[name]) {
	      configMethods[name].call(this, obj);
	    } else {
	      console.warn('unknown config name: "' + name.toString() +
	        '" see api documentation at');
	    }
	  }

	  function api(name, obj) {
	    if (!_.isString(name)) {
	      throw Error('first argument should be a string');
	    }

	    if (apiMethods[name]) {
	      apiMethods[name].call(this, obj);
	    } else {
	      console.warn('unknown api method name: "' + name.toString() +
	        '" see api documentation at');
	    }
	  }

	  return {
	    config: config,
	    api: api,
	    calledBeforeLoad: calledBeforeLoad
	  };

	})();


/***/ }
/******/ ]);