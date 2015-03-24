/*========================================
            SHELL FUNCTIONS
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      _ = require('underscore');
    
  return {
          
    /*
     * A command state to know what action to trigger on click/enter event
     * inactive, when no isCommand return false
     * searching, when commands are found but no enter/click was fired
     * ready, when a command is selected and ready to execute
     */ 
    stateCommand: 'inactive',

    isCommand: function(text) {
      
      var commandChar = text.slice(0, 1);
      
      switch (commandChar) {
        case '/' :
          return 'shortcuts';
        
        default:
          return false;
      }
    },
     
    updateCommandState: function () {
      
      var commandTitle = this.selectedCommand.get('title');
      
      switch (this.stateCommand) {
        case 'inactive':
          this.stateCommand = 'searching';
          break;
        
        case 'ready':
          this.stateCommand = 'inactive';
          break;
      }
    },
    
    setSelectedCommand: function (selectedCommand) {
      this.selectedCommand = selectedCommand;
    },
    
    getSelectedCommand: function (selectedCommand) {
      return this.selectedCommand;
    }

  };

});
