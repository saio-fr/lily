var Backbone = require('backbone');
var _        = require('underscore');
var $        = require('jquery');
var app      = require('../app');

// Object wrapper returned as a module
var attentionGrabberView = Backbone.View.extend({

  className: 'widget-attGrabber-wrapper hidden-animation-state',

  tagName: 'div',

  template: _.template($('#widget-attGrabber-template').html()),

  events: {
    'click': 'onContentClick',
    'click .attention-grabber-close': 'onCloseIconClick'
  },

  initialize: function() {
    // bind model's changes to the render() method to mantain interface up to date.
    this.model.on('change', this.render, this);
    this.listenTo(app, 'button.onClick', this.attGrabberHide);
    this.listenTo(app, 'attGrabber.hide', this.attGrabberHide);

    this.render();
  },

  render: function() {
    var that = this;

    if ( this.model.get('isAttentionGrabberEnabled') !== true ||
         this.model.get('wasAttentionGrabberDismissed') === true ) {
      return;
    }

    that.$el.html(that.template(that.model.toJSON()));
    that.$el.appendTo('.widget-wrapper');

    app.trigger('attGrabber:getSize', {
      width: this.$el.width(),
      height: this.$el.height()
    });

    that.transitionInAttentionGrabber();

    return this;
  },

  onContentClick: function(ev) {
    // Close button shouldn't trigger a click on the button
    if (ev && ev.target.classList.contains('attention-grabber-close')) return;

    app.trigger('button.click');

    // Since we are in an iframe, the blur event won't be
    // triggered when we set the focus on the app iframe.
    // Hence the programmatic blur
    this.$el.blur();

    this.model.set('isAttentionGrabberClosed', true);
    this.close();
  },

  attGrabberHide: function() {
    this.model.set('isAttentionGrabberClosed', true);
    this.close();
  },

  onCloseIconClick: function(ev) {
    this.close();
    this.model.set('wasAttentionGrabberDismissed', true);
  },

  transitionInAttentionGrabber: function(callback) {
    var that = this;

    // wait until next paint for the element to exist and be rendered
    window.requestAnimationFrame(function() {
      that.$el.addClass('open-animation-state');
    }, 1);
  },

  close: function() {
    app.trigger('attGrabber:getSize', {
      width: 0, // Account for the box shadow
      height: 0,
    });

    Backbone.View.prototype.remove.call(this);
  }

});

module.exports = attentionGrabberView;
