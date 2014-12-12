/*========================================
        Skeleton VIEW
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('app'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: $('#faq'),

    events: {
      "click .new-category"   : "createCategory",
      "click .new-content"   : "createContent"
    },

    createCategory: function() {

      var faq = app.faqCollection.create({
          "title": "Nouvelle Category",
          "type": "category",
        }, {
          wait: true
      });
    },

    createContent: function() {

      var faq = app.faqCollection.create({
          "title": "Titre Contenu",
          "type": "contenu",
        }, {
          wait:true
      });
    },

  });

  return SkeletonView;
});