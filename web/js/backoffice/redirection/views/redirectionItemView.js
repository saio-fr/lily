/*========================================
      Redirection View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      globals = require('backoffice/globals'),
      RedirectionModel = require('backoffice/redirection/models/redirectionModel'),
      ModalView = require('components/modals/modalAlertView'),
      ModalModel = require('components/modals/modalAlertModel'),

      // Object wrapper returned as a module
      RedirectionItemView;

    RedirectionItemView = Backbone.View.extend({

    model: RedirectionModel,

    tagName: 'li',
    className: 'list-group-item animated bounceInLeft padder-xl',

    template: _.template($('#listTpl').html()),

    events: {
      'click .icon-remove': 'todelete',
      'click span' : 'select',
      'click .icon-sign-blank' : 'selectdefault',
    },

    initialize: function() {

      this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));

      if (this.model.get('bydefault') === true) {
        this.$el
          .find('.icon-sign-blank')
          .removeClass('icon-sign-blank')
          .addClass('icon-check-sign default');
      }

      return this;
    },

    select: function() {

      if (app.skeleton.editView) {
        app.skeleton.editView.close();
      }

      app.trigger('itemView:select', this.model);

      this.$el
        .parent()
        .find('.active')
        .removeClass('active');

      this.$el.addClass('active');
    },

    selectdefault: function() {

      if (this.model.get('bydefault') === false) {

        this.$el
          .find('.icon-sign-blank')
          .removeClass('icon-sign-blank')
          .addClass('icon-check-sign default');

        var active = app.skeleton.getActiveItem();

        if (active.length !== 0) {
          active[0].set({ 'bydefault': false });
          active[0].save();
        }

        this.model.set({ 'bydefault': true });
        this.model.save();
      }
    },

    todelete: function () {

      var modalModel = new ModalModel(globals.modalAlert.redirection);

      // Can't delete a default redirection.
      // Showing an alert modal.
      if (this.model.get('bydefault') === true) {
        if (!app.skeleton.modalView) {
          app.skeleton.modalView = new ModalView({
            model: modalModel ,
            appendEl: "#redirection"
          });
        }

        app.skeleton.modalView.$el.modal('show');
        return false;
      }

      app.skeleton.collection.remove(this.model);
      this.model.destroy();

      this.remove();
    },
  });

  return RedirectionItemView;
});
