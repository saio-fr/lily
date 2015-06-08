/*======================================
          MODAL PROMPT
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ModalLayoutView = require('components/modals/views/layoutView'),

      // Object wrapper returned as a module
      ModalPrompt;


  ModalPrompt = ModalLayoutView.extend({

    className: 'modal',
    template: _.template($('#modalPromptTpl').html()),

    initialize: function(options) {
      ModalLayoutView.prototype.initialize.apply(this, arguments);
      
      var that = this;
      that.value = null;
      
      // That Listener need to be set after bootstrap event handler
      // called in ModalLayoutView.open()
      this.$('.js-modal-action').click(function () {
        that.value = that.$('input').val();
      });
    }
  });

  return ModalPrompt;
});
