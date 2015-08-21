
var test = require('tape');
var frame = require('../../../widget/component.js');
var Events = require('../../../widget/Events.js');
var utils = require('../../utils.js');

var frameOptions = {
  tagName: 'article',
  attrs: {
    'class': 'test'
  },
  styles: {
    'background': 'black'
  },
  html: '<p>I\'m an article with a paragraph inside</p>'
};

var containerOptions = {
  tagName: 'section',
  attrs: {
    'id': 'myContainerId'
  }
};

test('createEl', function(assert) {

  var myFrame = frame();
  var el = myFrame.createEl(frameOptions);

  assert.equal(el.tagName, 'ARTICLE');
  assert.equal(el.className,'test');
  assert.equal(el.attributes.length, 2); // class + styles
  assert.equal(el.style.background, 'black');
  assert.equal(el.innerHTML, '<p>I\'m an article with a paragraph inside</p>');

  assert.end();
});

test('insertInContainer by id', function(assert) {

  var myFrame = frame();
  var el = myFrame.createEl(frameOptions);
  var containerEl = myFrame.createEl(containerOptions);
  document.body.appendChild(containerEl);

  myFrame.insertInContainer(el, 'myContainerId');

  assert.equal(containerEl.childNodes.length, 1, 'container should have 1 and only child');
  assert.equal(containerEl.childNodes[0], el, 'that child should be el');

  // clean up:
  document.body.removeChild(containerEl);

  assert.end();
});

test('insertInContainer using existing container element ref', function(assert) {

  var myFrame = frame();
  var el = myFrame.createEl(frameOptions);
  var containerEl = myFrame.createEl(containerOptions);
  document.body.appendChild(containerEl);

  myFrame.insertInContainer(el, containerEl);

  var domEl = document.getElementsByClassName('test')[0];

  assert.equal(domEl, el, 'el is in the Dom');
  assert.equal(domEl.parentNode, containerEl, 'and has container for parentNode');

  // clean up:
  document.body.removeChild(containerEl);

  assert.end();
});

test('hide', function(assert) {

  var myFrame = frame();

  // Assign myFrame.el to frame:
  myFrame.el = myFrame.createEl(frameOptions);
  myFrame.hide();

  assert.equal(myFrame.el.style.display, 'none');

  // window should be focused
  assert.equal(document.activeElement, document.body);

  assert.end();
});

test('show', function(assert) {

  var myFrame = frame();

  // Assign myFrame.el to myFrame:
  myFrame.el = myFrame.createEl(frameOptions);

  // first hide (set display to none)
  myFrame.hide();

  // Then show (should remove the display style property)
  myFrame.show();

  assert.equal(myFrame.el.style.display, '');

  assert.end();
});

test('setAttributes', function(assert) {

  var myFrame = frame();

  var el = myFrame.createEl(frameOptions);

  myFrame.setAttributes(el, {
    'class': 'test 2',
    'id': 'testId'
  });

  assert.equal(el.attributes.length, 3);
  assert.equal(el.className, 'test 2');
  assert.equal(el.id, 'testId');

  assert.end();
});

test('setInlineStyle', function(assert) {

  var myFrame = frame();

  var el = myFrame.createEl(frameOptions);

  // Should work with single properties
  myFrame.setInlineStyle(el, 'background', 'blue');

  // And a map
  myFrame.setInlineStyle(el, {
    'display': 'inline-block',
    'height': '50px',
    'padding': '20px'
  });

  assert.equal(el.style.background, 'blue');
  assert.equal(el.style.display, 'inline-block');
  assert.equal(el.style.height, '50px');
  assert.equal(el.style.padding, '20px');

  assert.end();
});

test('removeInlineStyle', function(assert) {

  var myFrame = frame();

  var el = myFrame.createEl(frameOptions);

  // Should work with single properties
  myFrame.setInlineStyle(el, 'background', 'blue');
  myFrame.removeInlineStyle(el, 'background');

  assert.equal(el.style.background, '');

  assert.end();
});

test('delegateEvents on self', function(assert) {

  var myFrame = frame();
  var greetings = '';

  // Create an object that extends myFrame and has an events map:
  var childFrame = utils.extend(myFrame, {
    events: {
      'greet': 'onGreet'
    },

    initialize: function() {
      // Pass in regular context, delegate to this
      this.delegateEvents(this, this.events, this);
    },

    onGreet: function() {
      greetings = 'Hi!';
    },
  });

  // Delegate events
  childFrame.initialize();

  // Trigger an event present in the map
  childFrame.trigger('greet');

  // `onGreet should have been called
  assert.equal(greetings, 'Hi!');

  assert.end();
});

test('delegateEvents on another object', function(assert) {

  var myFrame = frame();
  var greetings = '';

  var eventBus = utils.extend({}, Events);

  // Create an object that extends myFrame and has an events map:
  var childFrame = utils.extend(myFrame, {
    events: {
      'greet': 'onGreet'
    },

    initialize: function() {
      // Pass in regular context, delegate to this
      this.delegateEvents(eventBus, this.events, this);
    },

    onGreet: function() {
      greetings = 'Hi!';
    },
  });

  // Delegate events
  childFrame.initialize();

  // Trigger an event present in the map
  eventBus.trigger('greet');

  // `onGreet should have been called
  assert.equal(greetings, 'Hi!');

  assert.end();
});

test('undelegateEvents bound to self', function(assert) {

  var myFrame = frame();
  var greetings = '';

  // Create an object that extends myFrame and has an events map:
  var childFrame = utils.extend(myFrame, {
    events: {
      'greet': 'onGreet'
    },

    initialize: function() {
      // Pass in regular context, delegate to this
      this.delegateEvents(this, this.events, this);
    },

    onGreet: function() {
      greetings = 'Hi!';
    },
  });

  // Delegate events
  childFrame.initialize();

  // Undelegate events
  childFrame.undelegateEvents();

  // Trigger an event present in the map
  childFrame.trigger('greet');

  // `onGreet should not have been called
  assert.equal(greetings, '');

  assert.end();
});

test('undelegateEvents bound to another object', function(assert) {

  var myFrame = frame();
  var greetings = '';

  var eventBus = utils.extend({}, Events);

  // Create an object that extends myFrame and has an events map:
  var childFrame = utils.extend(myFrame, {
    events: {
      'greet': 'onGreet'
    },

    initialize: function() {
      // Pass in regular context, delegate to this
      this.delegateEvents(eventBus, this.events, this);
    },

    onGreet: function() {
      greetings = 'Hi!';
    },
  });

  // Delegate events
  childFrame.initialize();

  // Undelegate events
  childFrame.undelegateEvents(eventBus);

  // Trigger an event present in the map
  eventBus.trigger('greet');

  // `onGreet should not have been called
  assert.equal(greetings, '');

  assert.end();
});

test('remove', function(assert) {

  var myFrame = frame();

  // Create myFrame own el
  myFrame.el = myFrame.createEl(frameOptions);

  // Insert in body
  myFrame.insertInContainer(myFrame.el, document.body);

  // Remove
  myFrame.remove();

  // Element shouldn't be found in the DOM
  assert.equal(document.getElementsByClassName('test').length, 0);

  assert.end();
});
