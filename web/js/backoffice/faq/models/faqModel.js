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

    createUrl: function () {
      return this.collection.url;
    },
    updateUrl: function () {
      return "/" + this.id;
    },
    deleteUrl: function () {
      return "/" + this.id;
    },
    readUrl: function () {
      return this.collection.url;
    },

    sync: function (method, model, options) {
        options = options  || {};

        if (!options.url) {
          // Let Backbone.sync handle model.url fallback value
          options.url = _.result(model, method + 'Url');
        }
        return Backbone.sync.call(this, method, model, options);
    }
  });

return FaqModel;
});