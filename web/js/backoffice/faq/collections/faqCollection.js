/*======================================
  Collection FAQs
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      FaqModel = require('backoffice/faq/models/faqModel'),

      // Object wrapper returned as a module
      FaqCollection;

  FaqCollection = Backbone.Collection.extend({

    model: FaqModel,

    initialize: function () {
      this.listenTo(this, 'change', this.onChange);
    },

    comparator: function (model) {
      return model.get('position');
    },

    onChange: function (model) {
      model.save();
    }

  });

  return FaqCollection;
});