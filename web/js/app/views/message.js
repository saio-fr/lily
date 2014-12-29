/* ===========================
      User Simple View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    config = require('app/globals'),
    // Object wrapper returned as a module
    MessageView;


  MessageView = Backbone.View.extend({

    initialize: function() {
      // bind model's changes to the render() method to mantain interface up to date.
      this.model.on('change', this.render, this);
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('#lily-box-messages');
      this.transitionInMessage();
      this.trigger('render');
      return this;
    },

    transitionInMessage: function(callback) {

      var $message = this.$el,
        $messageBox = $('#lily-box-messages'),
        inClass = 'lily-message-show';

      $message.addClass(inClass).on(config.animEndEventName, function() {

        $message.off(config.animEndEventName);
        $messageBox.animate({
          scrollTop: this.scrollHeight
        }, 500);
      });
    }

  });

  return MessageView;
});
