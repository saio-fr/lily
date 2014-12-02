/*======================================
             MODAL VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

    // Object wrapper returned as a module
    ModalView;

  ModalView = Backbone.View.extend({
	  
	  className: "modal fade",
    template: _.template($('#modalTpl').html()),
    
    initialize: function() {
	    this.render();
	  },

    render: function () {
	    this.$el.html(this.template());
      this.$el.appendTo('#config');
      this.$el.attr( { 'tabindex':'-1', 'role':'dialog', 'aria-labelledby':'close', 'aria-hidden':'true' } );
    }
	
  });
  return ModalView;
});
