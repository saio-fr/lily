/*======================================
          MODAL Alert
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),

      // Object wrapper returned as a module
      ModalConfirm;


  ModalConfirm = Backbone.View.extend({
  
    attributes: {
      'tabindex' : -1,
      'role' : 'dialog',
      'aria-labelledby' : 'close',
      'aria-hidden' : 'true'
    },
    className: 'modal',
    template: _.template( $('#modalConfirmTpl').html()),

    events: {
      'click' : 'remove'
    },

    initialize: function(options) {
      if (options && options.appendEl) {
        this.appendEl = options.appendEl;
      }

      this.render();
      this.$el.modal('show');
    },

    render: function() {
      var container = $(this.appendEl);

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.prependTo(container);
      return this;
    },

    remove: function (e) {
      if ( e.target.classList.contains('btn') ||
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

  return ModalConfirm;
});