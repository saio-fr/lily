
var test            = require('tape');
var mediator        = require('../../../js/loader/mediator.js');
var widgetComponent = require('../../../js/loader/widgetComponent.js');
var utils           = require('../../utils.js');

utils.contentLoaded(window, function() {

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
    assert.ok(widget.el, '`this.el` should have been set to the return value of render');

    // clean up
    widget.remove();
    widget.render.restore();
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

  test('render', function(assert) {
    var widget = widgetComponent();

    // render widget
    widget.el = widget.render({
      tagName: 'iframe',
      attrs: {
        'id': 'iframe'
      },
      container: {
        tagName: 'div',
        attrs: {
          id: 'lily-widget-container',
        },
        styles: {
          display: 'none',
        }
      }
    });

    // El created. Should return the container element
    assert.equal(document.getElementById('lily-widget-container'), widget.el);

    // actual element created, inserted in the container
    assert.equal(document.getElementById('iframe').parentNode, widget.el);

    // clean up
    widget.remove();
    assert.end();
  });

  test('show Widget when lily app is ready and widget app is ready', function(assert) {

    var widget = widgetComponent();
    var lily = lilyMock();
    var showSpy = sinon.spy(widget, 'show');

    // Initialize (will call render and create the element in the dom)
    widget.initialize();
    assert.notOk(showSpy.called,
      'widget is hidden on initialization');

    // Widget is ready
    widget.setState('ready', true);
    // Lily is ready
    lily.setState('ready', true);

    // lily is ready
    mediator.trigger('widget.show');

    assert.ok(showSpy.called, 'widget should now be shown');

    // clean up
    mediator.unRegisterApp('lily');
    widget.remove();
    assert.end();
  });

  test('`widget.click calls `show` on widget el when a state change passed `ready` to `true`', function(assert) {

    var widget = widgetComponent();
    var lily = lilyMock();
    var showSpy = sinon.spy(widget, 'show');

    // Initialize (will call render and create the element in the dom)
    widget.initialize();
    widget.setState('ready', true);
    assert.notOk(showSpy.called,
      'widget is hidden on initialization');

    mediator.trigger('widget.show');
    assert.notOk(showSpy.called,
      'widget still hidden until lily is said to be ready');
    assert.equal(widget.getState('shown'), false);

    // lily is ready
    // Will trigger a change event and `lily.onReady` will be fired by the mediator
    lily.setState('ready', true);

    assert.ok(showSpy.called, 'widget should now be shown');
    assert.equal(widget.getState('shown'), true, 'state should have changed accordingly');

    // clean up
    widget.remove();
    widget.show.restore();
    assert.end();
  });

  test('hideWidget', function(assert) {

    var widget = widgetComponent();
    var lily = lilyMock();

    // lily is ready
    lily.setState('ready', true);

    // Initialize (will call render and create the element in the dom)
    widget.initialize();

    mediator.trigger('widget.click');
    setTimeout(function() {
      assert.equal(widget.el.style.display, '', 'widget is shown');
    }, 250);

    // Hide Widget
    widget.hideWidget();
    assert.equal(widget.el.style.display, 'none');

    assert.equal(widget.getState('shown'), false);

    // clean up
    widget.remove();
    assert.end();
  });
});

