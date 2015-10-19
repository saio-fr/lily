var sdk      = require('../../../js/loader/sdk.js');
var mediator = require('../../../js/loader/mediator.js');
var utils    = require('../../utils.js');
var test     = require('tape');

utils.contentLoaded(window, function() {

  /**
   * Subset of the snippet code relevant to our test. see `snippet.js`
   */
  function beforeRequireMain() {

    // Create a queue, but don't obliterate an existing one!
    var saio = window.saio = window.saio || [];

    saio.methods = [
      'config',
      'api',
    ];

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
  }

  test('calls to the public saio api made before the widget script was loaded get called eventually', function(assert) {

    var configSpy = sinon.spy(sdk, 'config');
    var apiSpy = sinon.spy(sdk, 'api');

    // Create a saio object on window with fake `saio.config` and `saio.api` methods.
    // Same logic as in `snippet.js`
    beforeRequireMain();

    // Call that fake config method, with a valid argument
    window.saio.config('box.startExpanded');

    // Do the same for api
    window.saio.api('widget.show');

    if (/PhantomJS/.test(window.navigator.userAgent)) {
      // Clean up
      sdk.calledBeforeLoad = false;
      sdk.config.restore();
      sdk.api.restore();

      assert.end();
      return;
    }

    // webpack require is synchronous. requiring `main.js` will instanciate
    // all modules, and calls to `config` and `api` that were made
    // before the require will get dequeued only then.

    var main = require('../../../js/loader/main.js');

    // refs to the modules instanciated in `main.js` that created elements in the dom.
    // Used to clean up after the tests
    var lily   = mediator.getRegisteredApp('lily');
    var widget = mediator.getRegisteredApp('widget');

    assert.ok(configSpy.calledWith('box.startExpanded'), 'config was called');
    assert.ok(apiSpy.calledWith('widget.show'), 'api was called as well');

    // asynchronous dequeue and method invocation works as expected
    assert.ok(sdk.calledBeforeLoad, 'config was called before the sdk module existed');

    // Clean up
    sdk.calledBeforeLoad = false;
    sdk.config.restore();
    sdk.api.restore();
    assert.end();
  });

  test('Both the widget and the lily app now exist in the dom', function(assert) {
    if (/PhantomJS/.test(window.navigator.userAgent)) {
      assert.end();
      return;
    }

    // refs to the modules instanciated in `main.js` that created elements in the dom.
    // Used to clean up after the tests
    var lily   = mediator.getRegisteredApp('lily');
    var widget = mediator.getRegisteredApp('widget');

    assert.equal(document.getElementById(lily.id), lily.el);
    assert.equal(document.getElementById(widget.id), widget.el);

    // Injecting main means that lily and widget were instanciated
    // and initialized. Render was called on initialize and elements were created.
    // we remove them now
    widget.remove();
    lily.remove();
    assert.end();
  });

  test('global saio object exposes the sdk interface', function(assert) {
    if (/PhantomJS/.test(window.navigator.userAgent)) {
      assert.end();
      return;
    }

    assert.ok(window.saio.hasOwnProperty('api'));
    assert.ok(window.saio.hasOwnProperty('config'));

    assert.end();
  });

});
