

// Require CommonJS like includes
var _           = require('underscore');
var $           = require('jquery');
var Backbone    = require('backbone');
var FrameBus    = require('./FrameBus');
var utils       = require('./utils');

var app = {

  widgetWidth: 0,
  widgetHeight: 0,

  positionBottom: 20,
  positionSide: 20, // Left or Right
  marginBetween: 20,
  boxShadowRadius: 10,

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

    if (app.attGrabberRenderTimeout) {
      window.clearTimeout(app.attGrabberRenderTimeout);
    }
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
    if (app.attGrabberRenderTimeout) {
      window.clearTimeout(app.attGrabberRenderTimeout);
    }
  },

  onOperatorChange: function(operator) {
    app.trigger('chat.operatorChange', operator);
  },

  onSetPosition: function(position) {
    var $widgetWrapper = $('.widget-wrapper');
    if (position === 'left') {
      $widgetWrapper.addClass('left');
    } else {
      $widgetWrapper.removeClass('left');
    }
  },

  // Dynamicaly resize the iframe on render
  onGetButtonSize: function(size) {
    var prevButtonWidth = this.buttonWidth || 0;
    var prevButtonHeight = this.buttonHeight || 0;

    // Take the widget position and spacing between the widget and attention grabber into account
    this.buttonWidth = size.width + this.positionSide + this.boxShadowRadius;
    this.buttonHeight = size.height + this.positionBottom + this.boxShadowRadius;

    app.onGetSize({
      width: this.widgetWidth - prevButtonWidth + this.buttonWidth,
      height: Math.max(this.buttonHeight, this.attGrabberHeight || 0)
    });
  },

  onGetAttGrabberSize: function(size) {
    var prevAttGrabberWidth = this.attGrabberWidth || 0;
    var prevAttGrabberHeight = this.attGrabberHeight || 0;

    // Take the widget position and spacing between the widget and attention grabber into account
    this.attGrabberWidth = size.width === 0 ? 0 : size.width + this.positionSide + this.boxShadowRadius;
    this.attGrabberHeight = size.height === 0 ? 0 : size.height + this.positionBottom + this.boxShadowRadius;

    app.onGetSize({
      width: this.widgetWidth - prevAttGrabberWidth + this.attGrabberWidth,
      height: Math.max(this.attGrabberHeight, this.buttonHeight || 0)
    });
  },

  onGetSize: function(size) {
    var that = this;
    var prevWidgetHeight = this.widgetHeight;
    var prevWidgetWidth = this.widgetWidth;
    this.widgetHeight = size.height;
    this.widgetWidth = size.width;

    // The overall size of the widget has changed
    if (this.widgetHeight !== prevWidgetHeight ||
        this.widgetWidth !== prevWidgetWidth) {

      app.sendHostMessage('widget.changeDimensions', {
        height: that.widgetHeight + 'px', // Include units
        width: that.widgetWidth + 'px'
      });
    }
  },
};

_.extend(app, Backbone.Events, FrameBus);

app.on('button.click', app.onButtonClick);
app.on('button:getSize', app.onGetButtonSize);
app.on('attGrabber:getSize', app.onGetAttGrabberSize);

// Events received from host website
FrameBus.on('widget.shown', app.onWidgetShown);
FrameBus.on('widget.click', app.onWidgetClick);
FrameBus.on('widget.show', app.onWidgetShow);
FrameBus.on('widget.sendsOptions', app.onGetOptions);
FrameBus.on('widget.onLilyExpand', app.onLilyExpand);
FrameBus.on('lily.onOperatorChange', app.onOperatorChange);
FrameBus.on('app.setPosition', app.onSetPosition);

app.onWidgetLoad();

module.exports = app;
