/*======================================
          MODAL TRANSFERT
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    OperatorView = require('components/chat/views/transfer/operatorView'),
    ModalView = require('components/modals/modal'),

    // Object wrapper returned as a module
    TransferModal;


  TransferModal = ModalView.extend({

    template: _.template($('#modalAppTpl').html()),

    initialize: function(options) {
      this.visitor = options.visitor;
      this.childViews = new Backbone.ChildViewContainer();

      this.render();
      this.open();
    },

    render: function() {
      var that = this;

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');

      if (_.isEmpty(this.collection)) {
        this.$el.find('.modal-body').html('Aucun opérateur disponible.');
      } else {

        $.each(that.collection, function(index, operator) { // iterate through the collection
          var view = new OperatorView({
            model: operator,
            visitor: that.visitor
          });
          that.childViews.add(view);
          that.$el.find('.modal-body').append(view.el);
        });
      }

      return this;
    },

    remove: function() {
      var that = this;
      this.childViews.forEach(function(view) {
        // delete index for that view
        that.childViews.remove(view);

        // remove the view
        view.remove();
      });

      this.model.destroy();
      this.close();
      Backbone.View.prototype.remove.call(this);
    }
  });

  return TransferModal;
});
