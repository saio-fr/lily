/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('globals'),
      statistics = require('statistics'),

      // Object wrapper returned as a module
      GraphModel;


  GraphModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
      return '/statistics/user/' + 
        this.id + '/chat/' + 
        this.type + '/' + 
        this.start + '/' + 
        this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
      this.type = 'conversations';
      this.id = g.userId;
    }

  });

  return GraphModel;
});

