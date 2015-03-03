/*========================================
      Shortcut List View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      ItemView = require('backoffice/chat/views/shortcut/itemView'),

      // Object wrapper returned as a module
      ListView;

  ListView = Backbone.View.extend({

    el: '.js-app',

    events: {
      'click .js-shortcut-new': 'create',
    },

    initialize: function () {
      this.render();
    },

    render: function () {

      this.collection.each(function (item) {
        this.add(item);
      }, this);

      return this;
    },

    add: function (item) {

      var itemView = new ItemView({
        model: item
      });

      this.$el
        .find('.js-shortcuts-list')
        .append(itemView.render().el);
    },

    create: function () {
      // Create new model with default properties
      var model = this.collection.create({}, { wait:true });
      this.add(model);
    }

  });

  return ListView;
});

