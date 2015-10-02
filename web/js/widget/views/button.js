var Backbone = require('backbone');
var _        = require('underscore');
var $        = require('jquery');
var app      = require('../app');

// Object wrapper returned as a module
var ButtonView = Backbone.View.extend({

  className: 'widget-button button button-rounded hidden-animation-state',

  tagName: 'button',

  template: _.template($('#widget-button-template').html()),

  events: {
    'click': 'onButtonClick',
  },

  initialize: function() {
    this.render();
    // bind model's changes to the render() method to mantain interface up to date.
    this.model.on('change', this.render, this);
    this.listenTo(app, 'chat.operatorChange', this.onOperatorChange);
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo('.widget-wrapper');
    this.transitionInButton();

    return this;
  },

  onButtonClick: function() {
    app.trigger('button.click');
    app.trigger('button.onClick');

    // Since we are in an iframe, the blur event won't be
    // triggered when we set the focus on the app iframe.
    // Hence the programmatic blur
    this.$el.blur();
  },

  onOperatorChange: function(operator) {
    this.model.set({
      hasCustomOperatorFigure: operator.avatar ? "true" : "false",
      operatorFigureSrc: operator.avatar || '',
      operatorName: operator.firstname || '',
    });
  },

  transitionInButton: function(callback) {
    var that = this;

    // wait until next paint for the element to exist and be rendered
    window.requestAnimationFrame(function() {
      that.$el.addClass('open-animation-state');
    }, 1);
  }

});

module.exports = ButtonView;
