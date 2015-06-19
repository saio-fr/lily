define(function (require) {

  var app     = require('backoffice/app'),
      globals = require('globals');

  /**
   * This plugin adds a command for creating links, including a basic prompt.
   */

  'use strict';

  return function () {
    return function (scribe) {
      var linkPromptCommand = new scribe.api.Command('createLink');


      linkPromptCommand.nodeName = 'A';

      linkPromptCommand.execute = function () {
        var link;
        var selection = new scribe.api.Selection();
        var range = selection.range;

        // We need to store selection to revert it back cause it will be lost
        // on click on prompt modal
        var prevSelection = selection;
        var prevRange = prevSelection.range;

        var anchorNode = selection.getContaining(function (node) {
          return node.nodeName === this.nodeName;
        }.bind(this));

        var initialLink = anchorNode ? anchorNode.href : '';
        
        var modal = app.createModal.prompt(globals.modalPrompt.insertLink, initialLink);
        
        modal.promise.then(function (link) {
          if (link) {
            try {
              
              if (anchorNode) {
                prevRange.selectNode(anchorNode);
              } 
              prevSelection.selection.removeAllRanges();
              prevSelection.selection.addRange(prevRange);
              
              // If no http/s protocol is provided, we automatically include it
              var urlProtocolRegExp = /^https?\:\/\//;
              if (!urlProtocolRegExp.test(link)) {
                link = 'http://' + link;
              }           
              
              scribe.api.SimpleCommand.prototype.execute.call(this, link);
            }
            catch(e) {
              console.log(e);
            }
          }
        }.bind(this));
      };

      linkPromptCommand.queryState = function () {
        /**
         * We override the native `document.queryCommandState` for links because
         * the `createLink` and `unlink` commands are not supported.
         * As per: http://jsbin.com/OCiJUZO/1/edit?js,console,output
         */
        var selection = new scribe.api.Selection();
        return !! selection.getContaining(function (node) {
          return node.nodeName === this.nodeName;
        }.bind(this));
      };

      scribe.commands.linkPrompt = linkPromptCommand;
    };
  };

});
