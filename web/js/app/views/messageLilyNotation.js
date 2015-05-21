/* ===========================
    Operator Notation View
   ========================== */

define(function(require) {

'use strict';

// Require CommonJS like includes
var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/app'),
    Models = require('app/data/models'),
    MessageView = require('app/views/message'),

    // Object wrapper returned as a module
    MessageLilyNotation;

MessageLilyNotation = MessageView.extend({

  className: 'lily-msg lily-msg-avatar lily-message-show lily-msg-reporting',

  model: Models.LilyNotation,

  template: _.template($('#lily-message-notation').html()),
  events: {
    'click .lily-icon-thumb-up': 'satisfaction',
    'click .lily-icon-thumb-down': 'satisfaction'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.insertAfter('.lily-box-messages .lily-msg-avatar:last');
    $('.lily-box-messages .lily-msg-avatar:last')
      .addClass('lily-notation-wrapper');
    this.transitionInMessage();
    return this;
  },

  satisfaction: function(e) {

    var target = $(e.target),
      satisfaction, msg;

    this.$el.find('.lily-notation-list').removeClass('active');

    if (target.hasClass('lily-icon-thumb-up')) {
      this.$el.find('.lily-icon-thumb-up').addClass('active');
      satisfaction = true;
    } else {
      this.$el.find('.lily-icon-thumb-down').addClass('active');
      satisfaction = false;
    }

    msg = this.model.get('message_content');

    if (!msg) { return; }

    app.trigger('avi:satisfaction', satisfaction, msg);
  }

});


return MessageLilyNotation;
});
