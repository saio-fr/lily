/*======================================
          MODAL ALERT
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ModalLayoutView = require('components/modals/views/layoutView'),

      // Object wrapper returned as a module
      ModalAlert;


  ModalAlert = ModalLayoutView.extend({

    className: 'modal',

    template: _.template($('#modalAlertTpl').html()),

    initialize: function(options) {
      var that = this;
      
      this.render();
      this.open();
      
      if (options.timeout) {
        setTimeout(function() {
          that.close();
          that.remove();
        }, options.timeout);        
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');
      return this;
    },

    remove: function() {
      this.model.destroy();
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return ModalAlert;
});
