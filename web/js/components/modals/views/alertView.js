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
      ModalLayoutView.prototype.initialize.apply(this, arguments);
      
      var that = this;

      if (options.timeout) {
        setTimeout(function() {
          that.close();
          that.remove();
        }, options.timeout);        
      }
    }
    
  });

  return ModalAlert;
});
