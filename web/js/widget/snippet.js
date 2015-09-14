;(function (window, undefined) {
  'use strict';

  // Create a queue, but don't obliterate an existing one!
  var saio = window.saio = window.saio || [];

  // If the real widget.js is already on the page return.
  if (saio.initialize) return;

  // If the snippet was invoked already show an error.
  if (saio.invoked) {
    if (window.console && console.error) {
      console.error('Saio snippet included twice.');
    }
    return;
  }

  // Invoked flag, to make sure the snippet
  // is never invoked twice.
  saio.invoked = true;

  // A list of the methods in widget.js to stub.
  saio.methods = [
    'config',
    'api',
  ];

  // Define a factory to create stubs. These are placeholders
  // for methods in widget.js so that you never have to wait
  // for it to load to actually record data. The `method` is
  // stored as the first argument, so we can replay the data.
  saio.factory = function(method) {
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(method);
      saio.push(args);
      return saio;
    };
  };

  // For each of our methods, generate a queueing stub.
  for (var i = 0; i < saio.methods.length; i++) {
    var key = saio.methods[i];
    saio[key] = saio.factory(key);
  }

  // Define a method to load widget.js from our CDN,
  // and that will be sure to only ever load it once.
  saio.load = function(key) {
    // Create an async script element based on your key.
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = ('https:' === document.location.protocol ?
    'https://' : 'http://') + '{{ widgetOrigin|raw}}/app/widget/' + key;

    // Insert our script next to the first script element.
    var first = document.getElementsByTagName('script')[0];
    first.parentNode.insertBefore(script, first);
  };

  // Add a version to keep track of what's in the wild.
  saio.SNIPPET_VERSION = '1.0.0';

})(this);
