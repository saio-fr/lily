/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    NotifView = require('components/notifs/notifView'),
    NotifsCollection = require('components/notifs/notifsCollection'),

    // Object wrapper returned as a module
    NotifsView;


  NotifsView = Backbone.View.extend({

    className: 'chat pull-left hidden-xs',
    tagName: 'li',
    template: _.template($('#notifsListTpl').html()),

    events: {
      'click': 'remove'
    },

    initialize: function(options) {
      this.render();

      // Create a collection of this view notifications
      this.notifs = new NotifsCollection();

      this.listenTo(this.notifs, 'add', this.addNotif);
      this.listenTo(this.model, 'change', this.render);

      // Create a child view container
      this.childViews = new Backbone.ChildViewContainer();
    },

    render: function() {
      var container = $('.js-navbar');

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo(container);
      return this;
    },

    addNotif: function(notif) {
      var view = new NotifView(notif);
      this.childViews.add(view);
      this.model.set('count', this.notifs.unseenCount);
    },

  });

  return NotifsView;
});
