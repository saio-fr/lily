/* ===========================
    		Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    app = require('app/app'),
    utils = require('utils/pages'),
    Models = require('app/data/models'),
    PageView = require('app/views/page'),
    ContentView = require('app/views/content'),
    // Object wrapper returned as a module
    FaqPage;

  FaqPage = PageView.extend({

    model: Models.Faq,
    template: _.template($('#lily-page-faq-template').html()),

    events: {
      'click .lily-main-content': 'onItemClick'
    },

    initialize: function() {
      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return PageView.prototype.render.apply(this, arguments);
    },

    onItemClick: function(e) {
      var item = $(e.target),
        type = item.data("type") || null,
        id = item.data("id"),
        parent = this.model.get('parent');

      if (type && type === "contenu") {
        app.router.navigate('faq/' + parent + '/content/' + id, {
          trigger: true
        });
      } else if (type && type === "category") {
        app.router.navigate('faq/' + id, {
          trigger: true
        });
      }
    },

  });

  return FaqPage;
});
