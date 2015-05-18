/*========================================
            SHELL FUNCTIONS
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      _ = require('underscore');
    
  return {

    isCommand: function(text) {
      
      var commandChar = text.slice(0, 1);
      
      switch (commandChar) {
        case '/' :
          return 'shortcuts';
        
        default:
          return false;
      }
    },
    
    isNavigationAction: function(e) {
      
      var validateCondition = e.type === 'click' ||
        (e.keyCode === 13 && !e.shiftKey) || 
        e.keyCode === 39;
      
      if (validateCondition) {
        return 'validate';
      }
      
      if (e.keyCode === 40 || e.keyCode === 9) {
        return 'next';
      }
      
      if (e.keyCode === 38) {
        return 'prev';
      }
      
    }

  };

});