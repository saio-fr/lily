/*======================================
             MODAL VIEW
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    Modal = require('components/modals/modal'),

    // Object wrapper returned as a module
    ModalView;

  ModalView = Modal.extend({

    className: 'modal fade',
    template: _.template($('#modalTpl').html()),

    initialize: function() {
      this.render();
      this.open();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('body');
    }
  });

  return ModalView;
});
