/* ===========================
       Chat Operator View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      config   = require('front/config'),

      // Object wrapper returned as a module
      MessageChatView;

  MessageChatView = Backbone.View.extend({

    initialize: function() {
      // bind model's changes to the render() method to mantain interface up to date.
      this.model.on('change', this.render, this);
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.box-messages');
      this.transitionInMessage();
      $('.box-messages:last-child').scrollTop(10000);

      return this;
    },

    transitionInMessage: function(callback) {

      var $message = this.$el,
        $messageBox = $('.box-messages'),
        inClass = 'message-show';

      $message.addClass(inClass).on(config.animEndEventName, function() {

        $message.off(config.animEndEventName);
        $messageBox.animate({
          scrollTop: this.scrollHeight
        }, 500);
      });
    }

  });

  return MessageChatView;
});
