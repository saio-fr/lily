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

    attributes: {
      'tabindex' : -1,
      'role' : 'dialog',
      'aria-labelledby' : 'close',
      'aria-hidden' : 'true'
    },
    className: 'modal',
    template: _.template( $('#modalAlertTpl').html()),

    events: {
      'click' : 'remove'
    },

    initialize: function(options) {

      this.render();
      this.$el.modal('show');
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');
      return this;
    },

    remove: function (e) {
      if ( e.target.classList.contains('modal-backdrop') ||
           e.target.classList.contains('close') ) {

        // Bootstrap modal plugin takes care of the displaying non stuff,
        // so we just remove the view and model.
        this.model.destroy();
        this.$el.remove();
        this.stopListening();
        return this;
      }
    }

  });

  return ModalAlert;
});
