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

    defaults: {
      "title": "Nouvelle redirection",
      "frequency": 0,
      "phone": "+33 4 00 00 00 00",
      "mail": "Email@exemple.com",
      "object":"Objet du mail"
    },

    initialize: function () {
        this.urlRoot = "/";
    },

    cancel: function() {
      this.trigger('cancelled', this);
    },
  });

  return RedirectionModel;
});


