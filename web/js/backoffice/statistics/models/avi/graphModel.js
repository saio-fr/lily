/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      statistics = require('statistics-flot'),

      // Object wrapper returned as a module
      GraphModel;


  GraphModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
      return '/statistics/avi/' + 
        this.start + '/' + 
        this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
    }

  });

  return GraphModel;
});

