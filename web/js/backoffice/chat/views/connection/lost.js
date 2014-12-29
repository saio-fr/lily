/*======================================
          MODAL TRANSFERT
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),

      // Object wrapper returned as a module
      ConnectionLostModal;


  ConnectionLostModal = Backbone.View.extend({
    
    attributes: {
      'tabindex' : -1,
      'role' : 'dialog',
      'aria-hidden' : 'true',
      'data-backdrop' : 'static'
    },
    className: 'js-modal-connection-lost modal',
    template: _.template( $('#modalConnectionLostTpl').html()),

    events: {
    },

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