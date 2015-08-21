
var saio = require('../../../widget/main.js');
var test = require('tape');

test('saio exposes the sdk interface', function(t) {
  t.ok(window.saio.hasOwnProperty('api'));
  t.ok(window.saio.hasOwnProperty('config'));
});
