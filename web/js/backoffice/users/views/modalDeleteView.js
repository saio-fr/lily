/*======================================
      		MODAL DELETE
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),

      // Object wrapper returned as a module
      ModalDelete;


  ModalDelete = Backbone.View.extend({

    id: 'delete',
    className: 'modal fade',
    template: _.template( $('#modal-delete').html()),

    initialize: function() {
      this.render();
    },

    render: function() {

      this.$el.html(this.template());
      this.$el.appendTo('#users');
      this.$el.attr({
        'tabindex': '-1',
        'role': 'dialog',
        'aria-labelledby': 'close',
        'aria-hidden': 'true'
      });
      this.$el.modal('show');

      return this;
    }

  });

  return ModalDelete;
});
