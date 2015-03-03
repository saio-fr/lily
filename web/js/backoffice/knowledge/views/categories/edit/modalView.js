/*======================================
          MODAL CATEGORIES
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),

    // Object wrapper returned as a module
    ModalCategories;


  ModalCategories = Backbone.View.extend({

    attributes: {
      'tabindex': -1,
      'role': 'dialog',
      'aria-labelledby': 'close',
      'aria-hidden': 'true'
    },
    className: 'modal',
    templateModal: _.template($('#modalAppTpl').html()),
    templateEdit: _.template($('#categoriesEditTpl').html()),

    events: {
      'click': 'cancel',
      'click .btn-update': 'update'
    },

    initialize: function(options) {
      this.appendEl = options.appendEl;
      this.category = options.category;

      this.render();
      this.$el.modal('show');
    },

    render: function() {
      var container = $(this.appendEl);

      this.$el.html(this.templateModal(this.model.toJSON()));
      this.$('.modal-body').append(this.templateEdit({
        category: this.category.toJSON(),
        collection: app.categories.collection.toJSON()
      }));
      this.$el.prependTo(container);

      return this;
    },
    
    update: function () {
      var that = this;
      var title = this.$('input[name="title"]').val();
      var parent = parseInt(this.$('select[name="parent"]').val());
      
      this.category.save({
          title: title,
          parent: parent
        },{
        success: function () {
          console.log(that.category);
          app.categories.collection.fetch({
            success: function () {
              that.remove();
            }
          });            
        }
      });
    },
    
    cancel: function (e) {
      var classList = e.target.classList;
      if (classList.contains('modal-backdrop') || classList.contains('btn-cancel')) {
        this.remove();
      }  
    },

    remove: function() {
      this.model.destroy();
      Backbone.View.prototype.remove.call(this);
    }

  });

  return ModalCategories;
});
