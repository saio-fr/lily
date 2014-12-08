/*================================
  Model FAQ
====================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      FaqModel;

  FaqModel = Backbone.Model.extend({
    initialize: function () {
      this.urlRoot = "/rest";
    }
  });

return FaqModel;
});