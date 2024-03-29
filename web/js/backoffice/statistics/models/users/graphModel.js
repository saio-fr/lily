/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var statistics = require('statistics-flot'),

      // Object wrapper returned as a module
      GraphModel;


  GraphModel = Backbone.Model.extend({

    id: '',
    url: function() {
      return '/statistics/user/' +
        this.userId + '/chat/' + 
        this.type + '/' +
        this.start + '/' + 
        this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
      this.type = 'conversations';
    }

  });

  return GraphModel;
});

