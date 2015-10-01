var Backbone    = require('backbone');
var _           = require('underscore');
var app         = require('../app');
var ButtonWiew  = require('./button');
var AttGrabber  = require('./attGrabber');
var WidgetModel  = require('../models/widgetModel');

// Object wrapper returned as a module
var skeletonView = Backbone.View.extend({

  initialize: function() {

    // Create model using the config present in the template
    app.widgetModel = new WidgetModel(_.extend(window.config, window.clientConfig));

    this.listenTo(app, 'widget.gotConfig', this.render);
  },

  render: function() {
    app.buttonView = new ButtonWiew({ model: app.widgetModel });
    app.attGrabber = new AttGrabber({ model: app.widgetModel });

    app.onWidgetReady();
  },

});

module.exports = skeletonView;
