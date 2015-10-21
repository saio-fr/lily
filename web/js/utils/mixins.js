define(function(require) {

  var _ = require('underscore');

  _.mixin({
    getBaseProtocol: function() {
      return ('https:' === document.location.protocol ?
        'https://' : 'http://');
    }
  });

  return _;
});
