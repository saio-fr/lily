/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),

    // Object wrapper returned as a module
    NotifView;


  NotifView = Backbone.View.extend({

    tagName: 'li',
    className: 'chat chat-notification js-notification',
    template: _.template($('#notifsItemTpl').html()),

    events: {
      'click': 'notifClickAction'
    },

    initialize: function(options) {
      // NOT RENDERING CHILD VIEWS
      // this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      var container = $('.notifications-list');

      this.$el.html(this.template(this.model.toJSON()));
      container.prepend(this.$el);
      return this;
    },

    notifClickAction: function(e) {
      e.preventDefault();
      app.trigger('notification:click', this.model.get('id'));
    },

  });

  return NotifView;
});
