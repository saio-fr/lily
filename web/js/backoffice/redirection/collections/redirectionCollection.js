/* ===========================
      Redirection Collection
   ========================== */

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      RedirectionModel = require('backoffice/redirection/models/redirectionModel'),

      // Object wrapper returned as a module
      RedirectionCollection;

  RedirectionCollection = Backbone.Collection.extend({

    model: RedirectionModel,
    url: "/",

    initialize: function () {
      this.listenTo(this, 'change', this.onChange);
    },

    onChange: function (model) {
      model.save();
    }

  });

  return RedirectionCollection;
});


