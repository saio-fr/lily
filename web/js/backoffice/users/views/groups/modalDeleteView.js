/*======================================
      		MODAL DELETE
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),

      // Object wrapper returned as a module
      ModalDelete;


  ModalDelete = Backbone.View.extend({

    className: 'modal fade',
    template: _.template( $('#groupsModalTpl').html()),

    events: {
      'click .modal-close-confirm' : 'destroy'
    },

    initialize: function() {
      this.render();
      this.$el.modal('show');
    },

    render: function() {

      this.$el.html(this.template());
      this.$el.appendTo('body');
      return this;
    },

    destroy: function () {
      this.model.destroy();
      this.remove();
    }

  });

  return ModalDelete;
});
