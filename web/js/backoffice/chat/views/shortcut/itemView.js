/*========================================
      Item View
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    config = require('config'),

    // Object wrapper returned as a module
    ItemView;

  ItemView = Backbone.View.extend({

    tagName: 'li',
    className: 'list-group-item redirection-view animated bounceInLeft padder-xl',

    template: _.template($('#shortcutsItemTpl').html()),

    events: {
      'click': 'select',
      'click .icon-remove': 'todelete'
    },

    initialize: function() {

      this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'renderView', this.render);
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    select: function(e) {

      e.preventDefault();

      if (!e.target.classList.contains('icon-remove')) {
        app.trigger('itemView:select', this.model);

        this.$el
          .parent()
          .find('.active')
          .removeClass('active');

        this.$el.addClass('active');
      }
    },

    todelete: function() {

      var that = this;

      var modal = app.createModal.confirm(config.modalConfirm.shortcutTrash);
      modal.promise.then(function (res) {
        if (res) {
          this.model.destroy();
          this.remove();
        }
      }.bind(this));
    },
  });

  return ItemView;
});
