/*======================================
          MODAL CATEGORIES
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    ModalView = require('components/modals/modal'),

    // Object wrapper returned as a modules
    Modal;


  Modal = ModalView.extend({

    templateModal: _.template($('#modalAppTpl').html()),
    templateEdit: _.template($('#categoriesEditTpl').html()),

    events: {
      'click .btn-update': 'update'
    },

    initialize: function(options) {
      this.category = options.category;

      this.render();
      this.open();
    },

    render: function() {

      this.$el.html(this.templateModal(this.model.toJSON()));
      this.$('.modal-body').append(this.templateEdit({
        category: this.category.toJSON(),
        collection: app.categories.collection.toJSON()
      }));
      this.$el.appendTo('body');
      return this;
    },

    update: function(ev) {
      if (ev) ev.preventDefault();
      var that = this;
      var title = this.$('input[name="title"]').val();
      var parent = parseInt(this.$('select[name="parent"]').val());

      this.category.save({
          title: title,
          parent: parent
        }, {
        success: function() {
          console.log(that.category);
          app.categories.collection.fetch({
            success: function() {
              that.close();
            }
          });
        }
      });
    },

    remove: function() {
      this.model.destroy();
      Backbone.View.prototype.remove.call(this);
    }

  });

  return Modal;
});
