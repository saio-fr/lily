/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ModalView = require('components/modals/modal'),

      // Object wrapper returned as a module
      ModalConfirm;


  ModalConfirm = ModalView.extend({

    className: 'modal',
    template: _.template($('#modalConfirmTpl').html()),

    initialize: function() {
      this.render();
      this.open();
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');
      return this;
    },

    remove: function() {
      this.model.destroy();
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return ModalConfirm;
});
