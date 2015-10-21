/*================================
        MODEL FOOTER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('config'),
      statistics = require('statistics'),

      // Object wrapper returned as a module
      FooterModel;


  FooterModel = Backbone.NestedModel.extend({

    id: '',
    url: function(start, end) {
      return '/statistics/user/'+ this.id +'/chat/footer/'+ this.start + '/' + this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
      this.id = g.userId;
    }

  });

  return FooterModel;
});

