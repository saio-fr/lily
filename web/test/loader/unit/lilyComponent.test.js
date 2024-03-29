
var test          = require('tape');
var mediator      = require('../../../js/loader/mediator.js');
var lilyComponent = require('../../../js/loader/lilyComponent.js');
var utils         = require('../../utils.js');

utils.contentLoaded(window, function() {

  test('initialize calls render and sets `this.el`', function(assert) {
    var lily = lilyComponent();

    // Create a spy for render
    var renderSpy = sinon.spy(lily, 'render');

    // Initialize lily
    lily.initialize();

    assert.ok(renderSpy.calledOnce, 'should call render method once');
    assert.ok(lily.el, '`this.el` should have been set to the return value of render');

    // clean up
    lily.remove();
    lily.render.restore();
    assert.end();
  });

  test('initialize sets `this.frame` as a reference to the iframe window', function(assert) {
    var lily = lilyComponent();

    // Initialize lily
    lily.initialize();

    var frameWindow = lily.frame;

    assert.ok(lily.frame, '`lily.frame` should have been set');
    assert.ok(frameWindow.self, '`frameWindow` should have `self` as a reference to itself');
    assert.notEqual(frameWindow, window, '`frameWindow` should not be the host `window`');

    lily.remove();
    assert.end();
  });

  test('initialize calls delegate on the events map', function(assert) {
    var lily = lilyComponent();

    // the frame should not be listening to any event on any object
    // before calling delegateEvents in the initialize method
    assert.equal(lily._listeningTo, undefined,
      '_listeningTo doesn\'t exist yet on the widget instance');

    // Initialize widget
    lily.initialize();

    var listeningTo = lily._listeningTo;
    assert.ok(listeningTo && Object.keys(listeningTo).length,
      'shouldn\'t be undefined or empty at this point');

    // clean up
    lily.remove();
    assert.end();
  });

  test('render', function(assert) {
    var lily = lilyComponent();

    // render lily
    lily.el = lily.render({
      tagName: 'iframe',
      attrs: {
        'id': 'iframe'
      },
      container: {
        tagName: 'div',
        attrs: {
          id: 'lilyAppContainer',
        },
        styles: {
          display: 'none',
        }
      }
    });

    // El created. Should return the container element
    assert.equal(document.getElementById('lilyAppContainer'), lily.el);

    // actual element created, inserted in the container
    assert.equal(document.getElementById('iframe').parentNode, lily.el);

    // clean up
    lily.remove();
    assert.end();
  });

  test('onExpand', function(assert) {
    var lily = lilyComponent();
    var showSpy = sinon.spy(lily, 'show');
    var sendMessageStub = sinon.stub(lily, 'sendMessage');

    lily.initialize();

    // `ready` state is `false`
    lily.onExpand();
    assert.notOk(showSpy.called, 'lily should not be shown yet');

    // lily is ready
    lily.setState('ready', true);
    assert.ok(showSpy.called, 'lily should now be shown');
    assert.equal(lily.getState('shown'), true, 'state should have changed accordingly');

    //clean up
    lily.remove();
    lily.show.restore();
    lily.sendMessage.restore();
    assert.end();
  });

  test('onShrink', function(assert) {

    var lily = lilyComponent();
    var hideSpy = sinon.spy(lily, 'hide');
    var sendMessageStub = sinon.stub(lily, 'sendMessage');

    // lily is ready
    lily.setState('ready', true);

    // Initialize (will call render and create the element in the dom)
    lily.initialize();

    // Show App
    lily.onExpand();

    // Hide App
    lily.onShrink();

    assert.ok(hideSpy.called, 'lily is hidden');
    assert.equal(lily.getState('shown'), false);

    // clean up
    lily.remove();
    lily.hide.restore();
    lily.sendMessage.restore();
    assert.end();
  });
});
