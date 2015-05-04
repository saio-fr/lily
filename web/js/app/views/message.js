/* ===========================
      User Simple View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    config     = require('app/globals'),
    app        = require('app/app'),
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
          inClass = 'lily-message-show';

      // Scroll all the way down
      var objDiv = document.getElementById('lily-box-messages');
      objDiv.scrollTop = objDiv.scrollHeight + $message.height();

      // Show the message w/ animation
      $message.addClass(inClass);

      // Scroll all the way down again after showing the msg
      objDiv.scrollTop = objDiv.scrollHeight + $message.height();

      $message.on(config.animEndEventName, function() {
        console.log('msg:animationEnd');
        $message.off(config.animEndEventName);
      });
    }

  });

  return MessageView;
});
