define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var Utils = require('utils/default'),
      Validation = require('backbone-validation');

  _.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
      var $el = view.$('[name=' + attr + ']'), 
          $group = $el.closest('.form-group');
          
      $group.removeClass('has-error has-feedback');
      $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
      var $el = view.$('[name=' + attr + ']'), 
        $group = $el.closest('.form-group');
          
      $group.addClass('has-error has-feedback');
      $group.find('.help-block').html(error).removeClass('hidden');
    }
  });
  
});
