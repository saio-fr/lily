

// Require CommonJS like includes
var _           = require('underscore');
var Backbone    = require('backbone');
var FrameBus    = require('./FrameBus');
var utils       = require('./utils');

var app = {

  onButtonClick: function() {
    this.onWidgetClick();
  },

  ////////////////////
  //    IO Iframe
  ////////////////////

  onGetOptions: function(options) {
    // Initialize widget model with the config from app.
    app.widgetModel.set(options);

    // We got our bootstraping config from both the template generated JSON
    // and the lily app. We can create the views
    app.trigger('widget.gotConfig');
  },

  onLilyExpand: function() {
    app.trigger('attGrabber.hide');
  },

  // To Host
  onWidgetReady: function() {
    app.sendHostMessage('widget.ready');
  },

  onWidgetLoad: function() {
    app.sendHostMessage('widget.load');
  },

  onWidgetClick: function() {
    app.sendHostMessage('widget.click');
  },
};

_.extend(app, Backbone.Events, FrameBus);

app.on('button.click', app.onButtonClick);

// Events received from host website
FrameBus.on('widget.shown', app.onWidgetShown);
FrameBus.on('widget.click', app.onWidgetClick);
FrameBus.on('widget.show', app.onWidgetShow);
FrameBus.on('widget.sendsOptions', app.onGetOptions);
FrameBus.on('widget.onLilyExpand', app.onLilyExpand);

app.onWidgetLoad();

module.exports = app;
