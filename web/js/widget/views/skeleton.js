var Backbone    = require('backbone');
var _           = require('underscore');
var app         = require('../app');
var ButtonWiew  = require('./button');
var AttGrabber  = require('./attGrabber');
var WidgetModel  = require('../models/widgetModel');

// Object wrapper returned as a module
var skeletonView = Backbone.View.extend({

  initialize: function() {

    var config = _.extend(window.config, window.clientConfig);
    // Create model using the config present in the template
    app.widgetModel = new WidgetModel(config);

    this.listenTo(app, 'widget.gotConfig', this.render);
  },

  render: function() {
    app.buttonView = new ButtonWiew({ model: app.widgetModel });

    // Show attention graber after a certain delay
    var renderTimeout = window.setTimeout(function() {
      app.attGrabber = new AttGrabber({ model: app.widgetModel });
      window.clearTimeout(renderTimeout);
    }, app.widgetModel.get('attentionGrabberDelay'));

    app.onWidgetReady();
  },

});

module.exports = skeletonView;
