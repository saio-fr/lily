/* jshint strict: false */

var _    = require('./utils.js');
var mediator = require('./mediator.js');

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

    // Should only be registered once. If it happens to be registered multiple time,
    // return previous return value.
    'api.onReady': function(callback) {
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
