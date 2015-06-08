/*======================================
            MODAL HANDLER
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var ModalAlertView   = require('components/modals/views/alertView'),
      ModalConfirmView = require('components/modals/views/confirmView'),
      ModalAppView     = require('components/modals/views/appView'),
      ModalPromptView  = require('components/modals/views/promptView'),

    // Object wrapper returned as a module
    CreateModal = {
      
      confirm: function(content) {
        var modalModel, modalView;
    
        modalModel = new Backbone.Model();
        modalModel.set(content);
    
        modalView = new ModalConfirmView({
          model: modalModel
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
            
      prompt: function(content, value) {
        var modalModel, modalView;
    
        modalModel = new Backbone.Model();
        modalModel.set(content);
        modalModel.set({value: value});
        
        modalView = new ModalPromptView({
          model: modalModel
        });
        
        return modalView;        
      },
      
      app: function(content) {
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
