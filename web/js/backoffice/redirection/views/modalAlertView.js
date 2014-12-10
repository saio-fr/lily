/*======================================
          MODAL Alert
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),

      // Object wrapper returned as a module
      ModalAlert;


  ModalAlert = Backbone.View.extend({

    className: 'modal fade',

    template: _.template( $('#modalTpl').html()),

    events: {
      'click .modal-dialog .close' : 'destroy'
    },

    initialize: function() {
      this.render();
      this.$el.modal('show');
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('#redirection');
      return this;
    },

    destroy: function () {
      // Bootstrap modal plugin takes care of the displaying non stuff,
      // so we just remove the view and model.
      this.model.destroy();
      this.remove();
    }

  });

  return ModalAlert;
});
