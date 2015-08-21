
var test = require('tape');
var mediator = require('../../../widget/mediator.js');
var widgetComponent = require('../../../widget/widgetComponent.js');

function lilyMock() {
  var lily = {
    state: {
      'ready': false
    },

    getState: function(state) {
      return this.state[state] || undefined;
    },

    // Set the value of a state in the state map.
    // Changes to a state will trigger an event.
    setState: function(state, value) {
      var previous = this.state[state];
      this.state[state] = value;

      // Will trigger change events
      if (typeof previous !== 'undefined' && value !== previous) {
        mediator.trigger('lily.change', this.state);
        mediator.trigger('lily.change:' + state, value);
      }
    },
  };

  return mediator.registerApp(lily, 'lily');
}

test('initialize calls render and sets `this.el`', function(assert) {
  var widget = widgetComponent();

  // Create a spy for render
  var renderSpy = sinon.spy(widget, 'render');

  // Initialize widget
  widget.initialize();

  assert.ok(renderSpy.calledOnce, 'should call render method once');
  widget.render.restore();

  assert.ok(widget.el, '`this.el` should have been set to the return value of render');

  // clean up
  widget.remove();

  assert.end();
});

test('initialize calls delegate on the events map', function(assert) {
  var widget = widgetComponent();

  // the frame should not be listening to any event on any object
  // before calling delegateEvents in the initialize method
  assert.equal(widget._listeningTo, undefined,
    '_listeningTo doesn\'t exist yet on the widget instance');

  // Initialize widget
  widget.initialize();

  var listeningTo = widget._listeningTo;
  assert.ok(listeningTo && Object.keys(listeningTo).length,
    'shouldn\'t be undefined or empty at this point');

  // clean up
  widget.remove();

  assert.end();
});

test('initialize calls delegate even when `this.events` map is empty', function(assert) {
  var widget = widgetComponent();

  // Empty the events map
  widget.events = {};

  // Initialize widget
  widget.initialize();

  var listeningTo = widget._listeningTo;
  assert.equal(listeningTo, undefined,
    'should not exist if no event was bound');

  // clean up
  widget.remove();

  assert.end();
});

test('initialize calls registerDomEvents', function(assert) {
  var widget = widgetComponent();

  // Create a spy for render
  var registerDomEventsSpy = sinon.spy(widget, 'registerDomEvents');

  // Initialize widget
  widget.initialize();

  assert.ok(registerDomEventsSpy.calledOnce,
    'should call registerDomEvents method once');

  // clean up
  widget.registerDomEvents.restore();
  widget.remove();

  assert.end();
});

test('render', function(assert) {
  var widget = widgetComponent();

  // Initialize widget
  var el = widget.render({
    tagName: 'div',
    styles: {
      'display': 'none',
    },
    attrs: {
      'id': widget.id
    }
  });

  // Element created
  assert.equal(el.tagName, 'DIV');
  assert.equal(el.style.display, 'none');
  assert.equal(el.id, widget.id);

  // And inserted in the dom
  assert.equal(document.getElementById(widget.id), el);

  // clean up
  el.parentNode.removeChild(el);
  assert.end();
});

test('calling registerDomEvents should bind `onWidgetClick` on click on `this.el`', function(assert) {
  var widget = widgetComponent();

  // Spy on `onWidgetClick`
  var onWidgetClickSpy = sinon.spy(widget, 'onWidgetClick');

  // Create `this.el` and call `this.registerDomEvents`
  widget.initialize();

  // Emulate user click on `this.el`
  widget.el.click();

  assert.ok(onWidgetClickSpy.calledOnce,
    'should have been called once');

  // clean up
  widget.remove();
  assert.end();
});

test('show Widget when lily app is ready', function(assert) {

  var widget = widgetComponent();
  var lily = lilyMock();

  // Initialize (will call render and create the element in the dom)
  widget.initialize();
  assert.equal(widget.el.style.display, 'none',
    'widget is hidden on initialization');

  // lily is ready
  lily.setState('ready', true);
  widget.showWidget();

  assert.equal(widget.el.style.display, '', 'widget should now be shown');

  // clean up
  mediator.unRegisterApp('lily');
  widget.remove();
  assert.end();
});

test('showWidget calls `show` on widget el when a state change passed `ready` to `true`', function(assert) {

  var widget = widgetComponent();
  var lily = lilyMock();
  var showStub = sinon.stub(widget, 'show');

  // Initialize (will call render and create the element in the dom)
  widget.initialize();
  assert.notOk(showStub.called,
    'widget remains hidden on initialization');

  // Call showWidget()
  widget.showWidget();
  assert.notOk(showStub.called,
    'widget still hidden until lily is said to be ready');

  // lily is ready
  lily.setState('ready', true); // Will trigger a change event and `lily.onReady` will be fired by the mediator
  assert.ok(showStub.called, 'widget should now be shown');

  // clean up
  widget.remove();
  assert.end();
});

