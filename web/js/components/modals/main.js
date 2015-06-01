/*======================================
            MODAL HANDLER
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var ModalAlertView   = require('components/modals/views/alertView'),
      ModalConfirmView = require('components/modals/views/confirmView'),
      ModalAppView = require('components/modals/views/appView'),

    // Object wrapper returned as a module
    CreateModal = {
      
      confirm: function(content, callback, context) {
        var modalModel, modalView;
    
        modalModel = new Backbone.Model();
        modalModel.set(content);
    
        modalView = new ModalConfirmView({
          model: modalModel
        });
    
        $('.js-modal-action').on('click', function() {
          if (_.isFunction(callback)) {
            callback.apply(context, arguments);
            $('.js-modal-action').off('click');
          }
        });
        
        return modalView;
      },
      
      alert: function(content, timeout) {
        var modalModel, modalView;
    
        modalModel = new Backbone.Model();
        modalModel.set(content);
        
        modalView = new ModalAlertView({
          model: modalModel,
          timeout: timeout
        });
        
        return modalView;
      },
      
      app: function(content, app, args) {
        var modalModel, modalView;

        modalModel = new Backbone.Model();
        modalModel.set(content);
        
        var modalView = new ModalAppView({
          model: modalModel
        });
        
        return modalView;
      }
      
    };

  return CreateModal;
});
