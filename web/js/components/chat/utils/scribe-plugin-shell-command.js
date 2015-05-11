define('scribe-plugin-shell-command',['app', 'components/chat/utils/shell'],function (app, Shell) {

  /**
   * This plugin handle shell command into scribe el
   */

  

  return function () {
    return function (scribe) {
      
      scribe.el.addEventListener('keydown', function (event) {
        
        var text = scribe.el.innerText || scribe.el.textContent;
        
        if (event.keyCode === 13 && !event.shiftKey) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
      
      scribe.el.addEventListener('commandSelected', function (event) {

        scribe.transactionManager.run(function () {

          scribe.el.innerHTML = event.detail.commandTitle + '&nbsp;';

          scribe.el.focus();
          
          var selection = new scribe.api.Selection();
          var range = selection.range;
  
          range.selectNodeContents(scribe.el); //Select the entire contents of the element with the range
          range.collapse(false); // collapse the range to the end point. false means collapse to end rather than the start
          selection.selection.removeAllRanges(); //remove any selections already made
          selection.selection.addRange(range); //make the range the visible selection
        });
      });
        
      scribe.el.addEventListener('clearInput', function (event) {

        scribe.transactionManager.run(function () {
          scribe.el.innerHTML = '';
        });
      });
      
    };

  };

});