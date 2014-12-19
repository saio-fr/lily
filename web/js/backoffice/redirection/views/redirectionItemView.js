/*========================================
      Redirection View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),
      RedirectionModel = require('backoffice/redirection/models/redirectionModel'),

      // Object wrapper returned as a module
      RedirectionItemView;

    RedirectionItemView = Backbone.View.extend({

    model: RedirectionModel,

    tagName: 'li',
    className: 'list-group-item redirection-view animated bounceInLeft padder-xl',

    template: _.template($('#listTpl').html()),

    events: {
      'click': 'select',
      'click .icon-remove': 'todelete',
      'click .icon-sign-blank': 'selectdefault',
    },

    initialize: function () {

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

    select: function (e) {
      if ( !e.target.classList.contains('icon-check-sign') &&
           !e.target.classList.contains('delete-action') ) {
        app.trigger('itemView:select', this.model);

        this.$el
          .parent()
          .find('.active')
          .removeClass('active');

        this.$el.addClass('active');
      }
    },

    selectdefault: function () {

      if (this.model.get('bydefault') === false) {
        var active = app.skeleton.getActiveItem();

        if (active.length !== 0) {
          active[0].set({ 'bydefault': false });
        }
        this.model.set({ 'bydefault': true });
        // change icon to reflect state
        this.$el
          .find('.icon-sign-blank')
          .removeClass('icon-sign-blank')
          .addClass('icon-check-sign default');
      }
    },

    todelete: function () {
      // Can't delete a default redirection.
      // Showing an alert modal.
      if (this.model.get('bydefault') === true) {
        app.trigger('itemView:deletePrevented', this.model);
        return false;
      }
      // Else delete element
      app.skeleton.collection.remove(this.model);
      this.model.destroy();

      this.remove();
    },
  });

  return RedirectionItemView;
});
