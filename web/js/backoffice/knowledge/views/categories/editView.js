/*======================================
            EDIT CATEGORY
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    ModalLayoutView = require('components/modals/views/layoutView'),

    // Object wrapper returned as a modules
    Modal;


  Modal = Backbone.View.extend({

    template: _.template($('#categoriesEditTpl').html()),

    events: {
      'click .btn-update': 'update'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template({
        category: this.model.toJSON(),
        collection: app.categories.collection.toJSON()
      }));
    },

    update: function(ev) {
      if (ev) ev.preventDefault();
      var that = this;
      var title = this.$('input[name="title"]').val();
      var parent = parseInt(this.$('select[name="parent"]').val());

      this.model.save({
          title: title,
          parent: parent
        }, {
        success: function() {
          app.categories.collection.fetch();
          app.track.click('Operator created new kb category', {
            title: title,
            parentCategory: parent
          });
        }
      });
    }

  });

  return Modal;
});
