/* jshint strict:false */
var _ = (function () {

  if (_) return _;

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

