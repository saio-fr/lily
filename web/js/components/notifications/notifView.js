/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),

    // Object wrapper returned as a module
    NotifsView;


  NotifsView = Backbone.View.extend({

    className: 'chat pull-left hidden-xs',
    tagName: 'li',
    template: _.template($('#notifsItemTpl').html()),

    events: {
      'click': 'remove'
    },

    initialize: function(options) {
      this.render();
      this.$el.modal('show');
    },

    render: function() {
      var container = $('.js-notifications-list');

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo(container);
      return this;
    },

  });

  return NotifsView;
});
