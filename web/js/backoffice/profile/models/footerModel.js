/*================================
        MODEL FOOTER
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      g = require('globals'),

      // Object wrapper returned as a module
      FooterModel;


  FooterModel = Backbone.NestedModel.extend({

    id: '',
    url: function(start, end) {
      return '/statistics/user/'+ this.id +'/chat/footer/'+ this.start + '/' + this.end;
    },

    initialize: function () {
      this.start = g.date.start;
      this.end = g.date.end;
      this.id = g.userId;
    }

  });

  return FooterModel;
});

