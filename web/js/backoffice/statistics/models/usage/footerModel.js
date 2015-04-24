/*================================
        MODEL FOOTER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      statistics = require('statistics-flot'),

      // Object wrapper returned as a module
      FooterModel;


  FooterModel = Backbone.NestedModel.extend({

    id: '',
    url: function(start, end) {
      return '/statistics/usage/footer/'+ this.start + '/' + this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
    }

  });

  return FooterModel;
});

