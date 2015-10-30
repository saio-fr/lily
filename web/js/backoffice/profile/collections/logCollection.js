/*======================================
        LOG COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      g = require('config'),
      statistics = require('statistics'),

      // Object wrapper returned as a module
      LogCollection;

  LogCollection = Backbone.Collection.extend({

    sortCriteria : 'start',
    url: function () {
      return '/statistics/user/'+g.userId+'/history/logs/'+this.start+'/'+this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
    },
  });

  return LogCollection;
});
