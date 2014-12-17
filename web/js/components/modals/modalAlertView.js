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

    template: _.template( $('#modalTpl').html()),

    events: {
      'click' : 'destroy'
    },

    initialize: function(options) {
      if (options && options.appendEl) {
        this.appendEl = options.appendEl;
      }

      this.render();
      this.$el
        .find('.modal')
        .modal('show');
    },

    render: function() {
      var container = $(this.appendEl);

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo(container);
      return this;
    },

    destroy: function (e) {
      if ( e.target.classList.contains('close') ||
           e.target.classList.contains('modal-backdrop') ) {
        // Bootstrap modal plugin takes care of the displaying non stuff,
        // so we just remove the view and model.
        this.model.destroy();
        this.remove();
      }
    }

  });

  return ModalAlert;
});