/* jshint strict:false */
var xdm = (function() {

  return {
    sendMessage: function(name, data) {
      var message = JSON.stringify({
        scope: 'client',
        name: name,
        data: data
      });

      console.log('client' + ': ' + name);

      var send = (function(target, message) {
        return function() {
          var targetWindow = target.window;
          if (targetWindow) {
            targetWindow.postMessage(message, target.origin);
          } else {
            setTimeout(send, 500);
          }
        };

      })(this, message);

      // if (this.isReady()) {
        send();
      // } else {
      //   this.on('ready', send);
      // }
    }
  };

})();

