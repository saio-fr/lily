/*======================================
          MODAL Alert
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    config = require('config'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    NotifsCollection = require('components/notifications/notifsCollection'),
    NotifView = require('components/notifications/notifView'),
    Models = require('components/notifications/models'),

    // Object wrapper returned as a module
    NotifsView;


  NotifsView = Backbone.View.extend({

    className: 'pull-left hidden-xs header-widget notifications-menu',
    tagName: 'li',
    template: _.template($('#notifsListTpl').html()),

    initialize: function(options) {

      this.model = new Models.NotifsModel();
      // Create a collection of this view notifications
      this.notifs = new NotifsCollection();

      this.model.set('count', this.notifs.length);

      // Events related to the collection of notifications
      this.listenTo(this.notifs, 'change:seen', this.processSeen, this);
      this.listenTo(this.notifs, 'remove',      this.onCollectionRemove);
      this.listenTo(this.notifs, 'reset',       this.render);
      this.listenTo(this.notifs, 'add',         this.onNewNotif);

      // Events related to the parent itself
      this.listenTo(this.model, 'change', this.render);

      // Events coming from outside to trigger notification creation / update / deletion
      this.listenTo(app, 'conversation:stateChange', this.onConversationStateChange);
      this.listenTo(app, 'conversation:stopFollow',  this.onConversationStopFollow);
      this.listenTo(app, 'conversation:selected',    this.onConversationSelected);
      this.listenTo(app, 'notification:click',       this.onNotificationClicked);

      // Create a child view container
      this.childViews = new Backbone.ChildViewContainer();

      this.render();
    },

    render: function() {
      var container = $('.js-navbar');
      var that = this;

      // Remove any existing child view first:
      this.childViews.call("remove");

      // Render parent view:
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.prependTo(container);

      // Create and render children views (notification views):
      if (this.notifs && this.notifs.length > 0) {

        this.notifs.each(function(item) {
          that.addChildView(item);
        });
      }

      return this;
    },

    // Here the "magic" happens: called when a state change was detected
    // in a conversation. check for existing notifications and cases for
    // which there shouldn't be any new notification added,
    // and add a new one otherwise:
    onConversationStateChange: function(notif) {

      var model;
      var relatedNotification = this.notifs.get(notif.id);
      var title = notif.state === "urgent" ?
        "messageUrgent" : "messageUnAnswered";

      if (!notif) { return; }

      // If the conversation has been answered, remove related notifications,
      // and don't create a new one:
      if (notif.state === "answered") {
        this.removeRelatedNotification(notif.id);
        return;
      }

      model = {
        title: config.notifications[title],
        state: notif.state,
        msg: notif.msg,
        id: notif.id,
        type: notif.type,
        name: notif.name,
      };

      // If state and msg are the same as a precedent notification,
      // don't create a new one:
      if (this.isSeen(model)) {
        return;
      }

      // If a notification already exists for the same conversation,
      // merge the new one with the old one, update existing sessionStorage
      // for that notification:
      if (relatedNotification) {
        relatedNotification.set(model);
        this.setNewState(relatedNotification);
        return;
      }

      // Create a new notification:
      this.notifs.add(model, {merge: true});
    },

    // Create a new notification child view:
    addChildView: function(model) {

      if (!model) { return; }
      var view = new NotifView({model: model}).render();

      this.childViews.add(view);
      return view;
    },

    // remove an existing notification child view,
    // update the notification count:
    removeChildView: function(view) {

      if (view) {
        view.remove();
        this.stopListening(view);
        this.childViews.remove(view);
      }

      return view;
    },

    // Update the notification count in the parent model
    // (triggers a re-render of the parent view), and the children views as a result
    // Could be improved with a subview containing the count label,
    // and another for the count sign, to prevent child views from being re-rendered.
    onNewNotif: function() {
      // Play an audio alert
      $('audio.new-chat-notification')[0].play();
      this.model.set('count', this.notifs.length);
    },

    // When a conversation is removed from the list of current / waiting conversations
    // Remove any related conversation and remove reference in sessionStorage:
    onConversationStopFollow: function(id) {
      this.removeRelatedNotification(id);
      this.unfollowConversation(id);
    },

    // Remove a notification carrying the same id:
    removeRelatedNotification: function(id) {
      var notification = this.notifs.get(id);
      if (notification) {
        this.notifs.remove(notification);
      }
    },

    // Remove the notification view when the model is removed
    // from the notifs collection
    onCollectionRemove: function(model) {
      var view = this.childViews.findByModel(model);
      this.removeChildView(view);
      this.model.set('count', this.notifs.length);
    },

    // NOT USED FOR NOW:
    // When a notification was clicked, show the relevant conversation
    // and set the notification as seen:
    onNotificationClicked: function(id) {
      var model = this.notifs.get(id);

      if (model.get('type') === "queued") {
        app.trigger('conversation:setCurrent', id, model);
      } else {
        app.trigger('conversation:select', id, model);
      }
      this.processSeen(model);
    },

    // When a conversation was seen, set the relevant notification
    // as seen:
    onConversationSelected: function(id) {
      var model = this.notifs.get(id);
      this.processSeen(model);
    },

    // The notification that was seen is removed from the collection,
    // set as seen in sessionStorage, and the notifications count
    // is updated:
    processSeen: function(model) {
      this.setNewState(model, true);
      this.notifs.remove(model);
      this.model.set('count', this.notifs.length);
    },

    // Check if a similar (same id, state and msg) notification
    // was already seen:
    isSeen: function(notif) {
      var id = notif.id;
      var prev = this.getPreviousState(id);

      return (prev &&
              prev.state === notif.state &&
              prev.msg   === notif.msg &&
              prev.seen);
    },

    // Set notification seen state (boolean) and save it in sessionStorage:
    setNewState: function(model, seen) {
      if(!model) { return; }
      var id = model.get('id');

      if (seen) { model.set('seen', seen); }
      return window.sessionStorage.setItem(id, serialize(model));

      function serialize(item) {
        return _.isObject(item) ? JSON.stringify(item) : item;
      }
    },

    // Get a notification by id in sesstionStorage:
    getPreviousState: function(id) {
      var notif = window.sessionStorage.getItem(id);
      return deserialize(notif);

      function deserialize(data) {
        return data && JSON.parse(data);
      }
    },

    unfollowConversation: function(id) {
      window.sessionStorage.removeItem(id);
    }

  });

  return NotifsView;
});
