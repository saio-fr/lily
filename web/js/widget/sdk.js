/* jshint strict: false */
var sdk = (function() {

  if (sdk) return sdk;

  var configMap = {
    'setOperatorGroup': 'setOperatorGroup'
  };

  // Can be triggered on the host website using the sdk
  var apiMap = {
    // Widget & iframe show/hide events
    'api.widget.show':        'showWidget',
    'api.widget.hide':        'hideWidget',
    'api.widget.onShow':      'onWidgetShow',
    'api.widget.onHide':      'onWidgetHide',
    'api.box.expand':         'expandBox',
    'api.box.shrink':         'shrinkBox',
    'api.box.onExpand':       'onLilyExpand',
    'api.box.onShrink':       'onLilyShrink',

    //
    'api.onReady':              'onReady',
    'api.onChatSessionStart':   'onChatSessionStart',
    'api.onAviSessionStart':    'onAviSessionStart',
    'api.onMessageToOperator':  'onMessageToOperator',
    'api.onQuestionAskedToAvi': 'onQuestionAskedToAvi'
  };

  var configMethods = {
    setOperatorGroup: function(groupId) {
      if (!_.isString(groupId)) {
        console.error('groupId should be a string containing the operator group id');
      }
      saio.trigger('config.setOperatorGroup', groupId);
    },
  };

  var apiMethods = {
    showWidget: function() {
      saio.trigger('widget.show');
    },

    hideWidget: function() {
      saio.trigger('widget.hide');
    },

    onWidgetShow: function(callback) {
      saio.on('widget.onShow', function() {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    },

    onWidgetHide: function(callback) {
      saio.on('widget.onHide', function() {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    },

    expandBox: function() {
      saio.trigger('lily.expand');
    },

    shrinkBox: function() {
      saio.trigger('lily.shrink');
    },

    onLilyExpand: function(callback) {
      saio.on('lily.onExpand', function() {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    },

    onLilyShrink: function(callback) {
      saio.on('lily.onShrink', function() {
        if (_.isFunction(callback)) {
          callback();
        }
      });
    },

    onMessageToOperator: function(callback) {
      saio.on('lily.onMessageToOperator', function(message) {
        if (_.isFunction(callback)) {
          callback(message);
        }
      });
    },
  };

  function config(name, obj) {
    if (!_.isString(name)) {
      throw new Error('first argument should be a string');
    }

    if (configMap[name] && configMethods[configMap[name]]) {
      configMethods[configMap[name]].call(this, obj);
    }
  }

  function api(name, obj) {
    if (!_.isString(name)) {
      throw new Error('first argument should be a string');
    }

    if (apiMap[name] && apiMethods[apiMap[name]]) {
      apiMethods[apiMap[name]].call(this, obj);
    }
  }

  return {
    config: config,
    api: api
  };

})();
