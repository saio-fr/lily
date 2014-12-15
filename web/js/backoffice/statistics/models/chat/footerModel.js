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
      return '/chat/footer/'+ this.start + '/' + this.end;
    },

    initialize: function () {
      this.start = g.date.start;
      this.end = g.date.end;
    }

  });

  return FooterModel;
});
