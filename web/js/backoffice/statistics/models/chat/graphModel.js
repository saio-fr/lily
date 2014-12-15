/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('globals'),

      // Object wrapper returned as a module
      GraphModel;


  GraphModel = Backbone.NestedModel.extend({

    id: '',
    url: function() {
      return '/chat/' + 
        this.type + '/' + 
        this.start + '/' + 
        this.end;
    },

    initialize: function () {
      this.start = g.date.start;
      this.end = g.date.end;
      this.type = 'conversations';
    }

  });

  return GraphModel;
});

