/* ===========================
         	ROUTER
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
      Backbone = require('backbone'),
      app = require('backoffice/app'),

      // Object wrapper returned as a module
      Counters = {};
      
  Counters.set = function (config) {
    Counters.questions = config.counters.questions;
    Counters.Update();
  },

  Counters.Update = function () {
    $('.questions-nav span').html(Counters.questions);
  }
  
  Counters.increase = function (type) {
    switch (type) {
      case 'questions':
        Counters.questions++;
        $('.questions-nav span').html(Counters.questions);
        break;
    }
  }
  
  Counters.decrease = function (type) {
    switch (type) {
      case 'questions':
        Counters.questions--;
        $('.questions-nav span').html(Counters.questions);
        break;
    }
  }

  return Counters;
});

