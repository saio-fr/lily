/* ===========================
    Operator Notation View
   ========================== */

define(function(require) {

'use strict';

// Require CommonJS like includes
var Backbone    = require('backbone'),
    _           = require('underscore'),
    app         = require('front/app'),
    Models      = require('front/data/models'),
    MessageView = require('front/views/message'),

    // Object wrapper returned as a module
    MessageLilyNotation;

MessageLilyNotation = MessageView.extend({

  className: 'notation-wrapper',

  model: Models.LilyNotation,

  template: _.template($('#message-notation').html()),
  events: {
    'click .notation-positive': 'satisfaction',
    'click .notation-negative': 'satisfaction'
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.$el.appendTo('.box-messages .msg-avatar:last .msg-wrapper');

    // Scroll all the way down
    var objDiv = document.getElementsByClassName('box-messages')[0];
    objDiv.scrollTop = objDiv.scrollHeight + this.$el.height();

    return this;
  },

  satisfaction: function(e) {
    var target = $(e.target),
        satisfaction, msg;

    this.$el.find('.notation-list-item').removeClass('active');

    if (target.hasClass('notation-positive')) {
      this.$el.find('.notation-positive').addClass('active');
      satisfaction = true;
    } else {
      this.$el.find('.notation-negative').addClass('active');
      satisfaction = false;
    }

    msg = this.model.get('messageContent');
    if (!msg) { return; }

    app.trigger('avi:satisfaction', satisfaction, msg);
  }

});


return MessageLilyNotation;
});
