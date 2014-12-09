/* ===========================
       Redirection Model
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      RedirectionModel;

  RedirectionModel = Backbone.Model.extend({

    initialize: function () {
        this.urlRoot = "/rest";
    },

    cancel: function() {
      this.trigger('cancelled', this);
    },
  });

  return RedirectionModel;
});


