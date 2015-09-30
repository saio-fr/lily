var Backbone    = require('backbone');
var _           = require('underscore');
var $           = require('jquery');
var app         = require('../app');
var ButtonWiew  = require('./button');
var AttGrabber  = require('./attGrabber');
var WidgetModel = require('../models/widgetModel');

// Object wrapper returned as a module
var skeletonView = Backbone.View.extend({

  initialize: function() {
    this.getClientConfig();

    // Create model using the config present in the template
    app.widgetModel = new WidgetModel(window.config);

    this.listenTo(app, 'widget.gotConfig', this.onGotAppConfig);
  },

  getClientConfig: function() {
    var that = this;
    var configFileUrl = 'http://cdn-saio.fr/customer/' + window.config.licence + '/config/clientConfig.json';

    $.getJSON(configFileUrl, function(data) {
      app.widgetModel.set(data);
      that.gotClientConfig = true;

      if (that.gotAppConfig === true) {
        that.render();
      }
    });
  },

  onGotAppConfig: function() {
    this.gotAppConfig = true;

    if (this.gotClientConfig === true) {
      this.render();
    }
  },

  render: function() {
    app.buttonView = new ButtonWiew({ model: app.widgetModel });
    app.attGrabber = new AttGrabber({ model: app.widgetModel });

    app.onWidgetReady();
  },

});

module.exports = skeletonView;
