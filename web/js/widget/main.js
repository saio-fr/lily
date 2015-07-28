/* jshint strict: false */
/* global _, sdk, window, Events, core, LilyIframe, WidgetIframe */

/**
 * The whole project will get wrapped in:
 *
 * (function(window, undefined) {
 *   (...)
 * })(this);
 *
 * In the build file created by the grunt task
 */

// shorthand reference to native types prototype methods:
var slice = [].slice;
var toString = {}.toString;

// Reference to the saio array queue created
// in snippet on publisher's website
var saioq = window.saio || [];

var saio = new core();
// Internal saio object

// IE version < 10 or unsupported features such as JSON or postMessage.
// Stop here, not supported
if (_.isUnsuported()) return;

// Snippet version.
var snippetVersion = saioq && saioq.SNIPPET_VERSION ?
  parseFloat(saioq.SNIPPET_VERSION, 10) : 0;

// Initialize.
saio.initialize();
var lily = new LilyIframe().load();
var widget = new WidgetIframe().load();

// Before swapping the global, replay an existing global `saio` queue.
while (saioq && saioq.length > 0) {
  var args = saioq.shift();
  var method = args.shift();

  if (saio[method]) {
    saio[method].apply(saio, args);
  }
}

// Finally, replace the global queue with the real `saio` singleton.
window.saio = sdk;
