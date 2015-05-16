/*======================================
          MODAL CONNECTION LOST
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    ModalView = require('components/modals/modal'),

    // Object wrapper returned as a module
    ConnectionLostModal;


  ConnectionLostModal = ModalView.extend({

    className: 'js-modal-connection-lost modal',
    template: _.template($('#modalConnectionLostTpl').html()),

    // ConnectionLost modal should not open directly when created
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('body');
      return this;
    }
  });

  return ConnectionLostModal;
});
