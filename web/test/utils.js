module.exports = {
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
};
