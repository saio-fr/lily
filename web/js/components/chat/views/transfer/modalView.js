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

    // Object wrapper returned as a module
    TransferModal;


  TransferModal = Backbone.View.extend({

    attributes: {
      'tabindex': -1,
      'role': 'dialog',
      'aria-labelledby': 'close',
      'aria-hidden': 'true'
    },
    className: 'modal',
    template: _.template($('#modalAppTpl').html()),

    events: {
      'click': 'remove'
    },

    initialize: function(options) {
      this.appendEl = options.appendEl;
      this.visitor = options.visitor;
      this.childViews = new Backbone.ChildViewContainer();

      this.render();
      this.$el.modal('show');
    },

    render: function() {
      var container = $(this.appendEl);
      var self = this;

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.prependTo(container);

      if (_.isEmpty(this.collection)) {
        this.$el.find('.modal-body').html('Aucun opérateur disponible.');
      } else {

        $.each(self.collection, function(index, operator) { // iterate through the collection
          var view = new OperatorView({
            model: operator,
            visitor: self.visitor
          });
          self.childViews.add(view);
          self.$el.find('.modal-body').append(view.el);
        });
      }

      return this;
    },

    remove: function(e) {
      if (e.target.classList.contains('modal-backdrop') ||
        e.target.classList.contains('btn-success') ||
        e.target.classList.contains('close')) {

        // Bootstrap modal plugin takes care of the displaying non stuff,
        // so we just remove the view and model.
        var self = this;
        this.childViews.forEach(function(view) {
          // delete index for that view
          self.childViews.remove(view);
          // remove the view
          view.remove();
        });
        this.model.destroy();
        Backbone.View.prototype.remove.call(this);
      }
    }

  });

  return TransferModal;
});
