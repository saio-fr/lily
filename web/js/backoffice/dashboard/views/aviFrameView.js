/*========================================
              IFRAME VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),

      // Object wrapper returned as a module
      IframeView;

  IframeView = Backbone.View.extend({

    el: '.iframe-wrapper',
    template: _.template($('#aviFrameTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return IframeView;
});
