/* jshint strict: false */
/* global window */

/**
 * The whole project will get wrapped in:
 *
 * (function(window, document, undefined) {
 *   (...)
 * })(this, document);
 *
 * In the build file created by the grunt task
 */

var lilyComponent   = require('./lilyComponent.js');
var hostComponent   = require('./hostComponent.js');
var widgetComponent = require('./widgetComponent.js');
var mediator        = require('./mediator.js');
var sdk             = require('./sdk.js');
var _               = require('./utils.js');

// Reference to the saio array queue created
// in snippet on publisher's website
var saioq = window.saio || [];

// IE version < 10 or unsupported features such as JSON or postMessage.
// Stop here, not supported
if (_.isUnsuported()) {
  throw Error('Navigator unsupported');
}

// Snippet version.
var snippetVersion = saioq && saioq.SNIPPET_VERSION ?
  parseFloat(saioq.SNIPPET_VERSION, 10) : 0;

// Initialize host (mediator + keep ref to the host window),
// and other apps (lily and widget for now)
var host   = hostComponent().initialize();
var lily   = lilyComponent().initialize();
var widget = widgetComponent().initialize();

// Register the different component instances with a unique id
mediator.registerApp(host, 'host');
mediator.registerApp(lily, 'lily');
mediator.registerApp(widget, 'widget');

// Before swapping the global, replay an existing global `saio` queue.
while (saioq && saioq.length > 0) {
  var args = saioq.shift();
  var method = args.shift();

  if (saio[method]) {
    sdk[method].apply(saio, args);
  }
}

// Finally, replace the global queue with the public interface in sdk.
window.saio = sdk;
