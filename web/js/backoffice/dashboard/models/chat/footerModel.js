/*================================
        MODEL FOOTER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var statistics = require('statistics-flot'),
      g = require('globals'),

      // Object wrapper returned as a module
      FooterModel;


  FooterModel = Backbone.Model.extend({

    id: '',
    url: function(start, end) {
      return '/user/' + 
      this.userId + 
      '/chat/footer/' + 
      this.start + '/' + 
      this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
      this.userId = g.userId;
    }

  });

  return FooterModel;
});

