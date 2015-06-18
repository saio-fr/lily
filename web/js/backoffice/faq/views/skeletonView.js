/*========================================
        Skeleton VIEW
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      app = require('backoffice/app'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: $('.js-app'),

    events: {
      "click .new-category"   : "createCategory",
      "click .new-content"   : "createContent"
    },

    createCategory: function() {
      var faq;
      if (this.faqCollection) {
        faq = this.faqCollection.create({
            "title": "Nouvelle Categorie",
            "type": "category",
          }, {
          wait: true
        });
      }
    },

    createContent: function() {
      var faq;
      if (this.faqCollection) {
        faq = this.faqCollection.create({
            "title": "Titre Contenu",
            "type": "contenu",
          }, {
            wait:true
        });
      }
    },

    unsetActive: function () {
      this.$el
        .find('.list-group-item.active')
        .removeClass('active');
    },

    closeEditView: function () {
      if (this.contentEditView) {
        this.contentEditView.remove();
        this.contentEditView = null;
      }
    }

  });

  return SkeletonView;
});
