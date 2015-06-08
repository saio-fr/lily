/*======================================
          MODAL CONFIRM
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ModalLayoutView = require('components/modals/views/layoutView'),

      // Object wrapper returned as a module
      ModalConfirm;


  ModalConfirm = ModalLayoutView.extend({

    className: 'modal',
    template: _.template($('#modalConfirmTpl').html()),

    initialize: function () {
      ModalLayoutView.prototype.initialize.apply(this, arguments);
      
      var that = this;
      that.value = false;
      
      // That Listener need to be set after bootstrap event handler
      // called in ModalLayoutView.open()
      this.$('.js-modal-action').click(function () {
        that.value = true;
      });
    }
  });

  return ModalConfirm;
});
