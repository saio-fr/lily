/*======================================
        LOG COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      g = require('globals'),

      // Object wrapper returned as a module
      LogCollection;

  LogCollection = Backbone.Collection.extend({

    sortCriteria : 'start',
    url: function () {
      return '/user/'+this.userId+'/history/logs/'+this.start+'/'+this.end;
    },
    
    initialize: function () {
      this.start = g.date.start;
      this.end = g.date.end;
    },
  });

  return LogCollection;
});
