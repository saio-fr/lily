/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/app'),
    config = require('app/globals'),
    api = require('app/data/api'),
    MessageView = require('app/views/message'),

    // Object wrapper returned as a module
    MessageLilyRedirection;

// MessageLilyRedirection = MessageView.extend({
MessageLilyRedirection = Backbone.View.extend({

  // className: 'lily-msg-avatar lily-msg lily-msg-redirection',
  className: 'lily-redirection',
  template: _.template($('#lily-message-redirection').html()),

  events: {
    'click': 'dismiss'
  },

  initialize: function() {
    this.listenTo(this, 'render', this.bindRedirections.bind(this));
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo('.action-container');
    this.transitionInMessage();
    this.trigger('render');
    return this;
  },

  dismiss: function() {
    this.$el.addClass('component-hide');

    app.onAnimEnd(this.$el, function() {
      app.trigger('avi:choicesViewDismiss', 'redirectionView');
    });
  },

  transitionInMessage: function(callback) {

    var $message = this.$el,
        inClass = 'component-show';

    // Show the message w/ animation
    $message.addClass(inClass);

    app.onAnimEnd(this.$el, callback);
  },

  // Useless for now
  bindRedirections: function() {
    this.$('.lily-redirection-tel')
      .on('click', null, 'phone', this.triggerRedirection.bind(this));
    this.$('.lily-redirection-mail')
      .on('click', null, 'mail', this.triggerRedirection.bind(this));
    this.$('.lily-redirection-chat')
      .on('click', null, 'chat', this.triggerRedirection.bind(this));
    this.$('.lily-redirection-none')
      .on('click', null, 'none', this.triggerRedirection.bind(this));
  },

  triggerRedirection: function(ev) {
    var id = this.model.get('id'),
        redirection = ev.data;

    app.trigger('avi:chooseRedirection', redirection, id);
  }

});

return MessageLilyRedirection;
});
