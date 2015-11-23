/* jshint strict: false */

var _    = require('./utils.js');
var mediator = require('./mediator.js');

module.exports = (function() {

  // Any sdk method was called using the saio public object
  // before all the scripts were loaded
  var calledBeforeLoad = false;

  var configMethods = {
    'chat.setOperatorGroup': function(groupId, shouldFallback) {
      if (!_.isString(groupId)) {
        console.error('groupId should be a string containing the operator group id');
      } else {
        shouldFallback = typeof shouldFallback === 'undefined' ? true : shouldFallback;
        mediator.trigger('lily.setOperatorGroup', groupId, shouldFallback);
      }
    },

    'widget.attentionGrabberEnabled': function(enabled) {
      // `enabled` should be a boolean
      if (enabled !== true && enabled !== false) {
        console.error('enabled should be a boolean');
      }

      mediator.trigger('widget.attentionGrabberEnabled', enabled);
    },

    'widget.position': function(position) {
      if (position !== 'left' && position !== 'right') {
        console.error('position should be either `left` or `right`.');
      } else {
        mediator.trigger('app.position', position);
      }
    }
  };

  // Can be triggered on the host website using the sdk
  var apiMethods = {
    // Widget & iframe show/hide events
    'widget.show': function() {
      mediator.trigger('widget.show', { apiTriggered: true });
    },

    'widget.hide': function() {
      mediator.trigger('widget.hide', { apiTriggered: true });
    },

    'box.expand': function() {
      mediator.trigger('lily.expand', { apiTriggered: true });
    },

    'box.shrink': function() {
      mediator.trigger('lily.shrink', { apiTriggered: true });
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

    'app.isChatAvailable': function() {
      var lily = mediator.getRegisteredApp('lily');
      var chatAvailable = lily.getState('activeRoute') === 'chat';
      return chatAvailable;
    },

    'api.onChatSessionStart':   'onChatSessionStart',
    'api.onAviSessionStart':    'onAviSessionStart',

    // WIP, Do not use in production
    'chat.sendMessageToVisitor': function(message) {
      if (!message || !(_.isObject(message) && _.isString(message.body))) {
        return console.warn('malformed message. See documentation at: http://saiodocs.readthedocs.org/en/latest/javascript-api/');
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

    'avi.addMessage': function(question) {
      if (!question || !(_.isString(question))) {
        return console.warn('malformed message. See documentation at: http://saiodocs.readthedocs.org/en/latest/javascript-api/');
      }
      mediator.trigger('lily.addAviMessage', question);
    },

    'avi.onAskedQuestion': 'onAskedQuestionToAvi',

    'user.identify': function(infos) {
      if (!infos || !_.isObject(infos) || infos === {}) {
        return console.warn('malformed infos object. See documentation at: http://saiodocs.readthedocs.org/en/latest/javascript-api/');
      }

      mediator.trigger('user.identify', infos);
    }
  };

  function config(name, obj) {
    if (!_.isString(name)) {
      throw Error('first argument should be a string');
    }

    if (configMethods[name]) {
      return configMethods[name].call(this, obj);
    } else {
      console.warn('unknown config name: "' + name.toString() +
        '" see api documentation at: http://saiodocs.readthedocs.org/en/latest/javascript-api/');
    }
  }

  function api(name, obj) {
    if (!_.isString(name)) {
      throw Error('first argument should be a string');
    }

    if (apiMethods[name]) {
      return apiMethods[name].call(this, obj);
    } else {
      console.warn('unknown api method name: "' + name.toString() +
        '" see api documentation at: http://saiodocs.readthedocs.org/en/latest/javascript-api/');
    }
  }

  return {
    config: config,
    api: api,
    calledBeforeLoad: calledBeforeLoad
  };

})();
