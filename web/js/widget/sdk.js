/* jshint strict: false */

var _    = require('./utils.js');
var mediator = require('./mediator.js');

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