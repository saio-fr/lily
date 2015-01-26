/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
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
      'click .js-notification': 'notifClickAction'
    },

    initialize: function(options) {
      this.render();

      // Create a collection of this view notifications
      this.notifs = new NotifsCollection();

      this.listenTo(this.notifs, 'add', this.processNotifs);
      this.listenTo(this.notifs, 'change:seen', this.processSeen, this);
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(app, 'add:notif', this.onNewNotif);

      // Create a child view container
      this.childViews = new Backbone.ChildViewContainer();
    },

    render: function() {
      var container = $('.js-navbar');

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo(container);
      return this;
    },

    onNewNotif: function(notif) {
      this.notifs.set(notif);
      this.model.set('count', this.notifs.length);
    },

    processNotifs: function(notifs) {

    },

    processSeen: function(model) {
      // Notifications that were seen are removed from the collection
      if (model.get('seen') === true) {
        this.notifs.remove(model);
      }
      this.model.set('count', this.notifs.length);
    },

    addNotif: function(notif) {
      var view = new NotifView(notif);
      this.childViews.add(view);
      this.model.set('count', this.notifs.unseenCount);
    },

  });

  return NotifsView;
});
