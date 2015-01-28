/* ===========================
    		Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/app'),
    config = require('app/globals'),
    Models = require('app/data/models'),
    Collections = require('app/data/collections'),
    PageView = require('app/views/page'),
    MessageChatOperator = require('app/views/messageChatOperator'),
    MessageChatVisitor = require('app/views/messageChatVisitor'),
    MessageChatReconnect = require('app/views/messageChatReconnect'),
    MessageChatTransfer = require('app/views/messageChatTransfer'),
    MessageChatBan = require('app/views/messageChatBan'),
    MessageChatClose = require('app/views/messageChatClose'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    // Object wrapper returned as a module
    ChatView;

  ChatView = PageView.extend({

    template: _.template($('#lily-page-chat-template').html()),

    events: {
      'keyup  #lily-search-form': 'writing',
      'submit #lily-search-form': 'doChat',
      'click  #lily-go': 'doChat',
      'click  .lily-icon-thumb-up': 'satisfaction',
      'click  .lily-icon-thumb-down': 'satisfaction',
      'click  .js-reconnect-action': 'reconnect'
    },

    initialize: function() {

      this.collection = new Collections.Messages();
      this.childViews = new Backbone.ChildViewContainer();

      this.listenTo(this.collection, 'add', this.processMessage);

      this.listenTo(app, 'ws:subscribedToChat', this.onSubscribedChat, this);
      this.listenTo(app, 'chat:reconnected', this.onReconnected, this);
      this.listenTo(app, 'chat:resetConversation', this.onResetConversation, this);
      this.listenTo(app, 'app:displayed', this.connectToChat);

      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
    },

    render: function() {

      this.$el.html(this.template());

      $('input, textarea').placeholder();
      this.$input = this.$el.find('#lily-search-form input.lily-search-input');

      return PageView.prototype.render.apply(this, arguments);
    },

    connectToChat: function() {
      app.trigger("chat:open");
    },

    onSubscribedChat: function(payload) {
      this.collection.set(payload);
    },

    processMessage: function(message) {
      switch (message.get("action")) {
        case "inactivity":
          message.set("msg", config.inactivityMsg);
          message.set("userAction", config.inactivityAction);
          message.set("info", "");
          break;
        case "transfer":
          message.set("msg", config.transferMsg);
          break;
        case "ban":
          message.set("msg", config.banMsg);
          message.set("info", "");
          break;
        case "close":
          message.set("msg", config.closeMsg);
          break;
        case undefined:
          break;
      }

      this.addItem(message);
    },

    addItem: function(message) {
      var messageView;
      // create an instance of the sub-view to render the single message item.
      switch (message.get('from')) {
        case 'visitor':
          messageView = new MessageChatVisitor({
            model: message,
          }).render();
          break;

        case 'operator':
          this.$el.find('.lily-msg-chat-wait').hide();

          messageView = new MessageChatOperator({
            model: message
          }).render();
          break;

        case 'server':

          switch (message.get("action")) {
            case "inactivity":
              messageView = new MessageChatReconnect({
                model: message
              }).render();
              break;

            case "ban":
              messageView = new MessageChatBan({
                model: message
              }).render();
              break;

            case "close":
              messageView = new MessageChatClose({
                model: message
              }).render();
              break;

            case "transfer":
              messageView = new MessageChatTransfer({
                model: message
              }).render();
              break;
          }
          break;
      }

      if (messageView) {
        this.childViews.add(messageView);
      }
    },

    send: function(message) {
      app.trigger('chat:send', message);
    },

    writing: function(e) {
      app.trigger('chat:writing', !!this.$input.val());
    },

    doChat: function(e) {
      e.preventDefault();

      var message = this.$input.val();
      if ($.trim(message)
        .length > 0) {
        // On vérifie que le champ n'est pas vide
        // ou contient uniquement des espaces
        this.send(message);
      }
      // clear the search field
      this.clearInput();
      this.writing();
    },

    clearInput: function() {

      // Automaticaly hide device keyboard
      if (config.isMobile.phone) {
        this.$input.val('')
          .blur();
      } else {
        this.$input.val('')
          .focus()
          .select();
      }
    },

    satisfaction: function(e) {

      var target = $(e.target),
        satisfaction;

      this.$el.find('#lily-chat-notation-wrapper i').removeClass('active');

      if (target.hasClass('lily-icon-thumb-up')) {
        this.$el.find('.lily-icon-thumb-up').addClass('active');
        satisfaction = true;
      } else {
        this.$el.find('.lily-icon-thumb-down').addClass('active');
        satisfaction = false;
      }

      app.trigger('chat:satisfaction', satisfaction);
    },

    reconnect: function() {
      this.$el.find(".lily-msg-reconnect").addClass("lily-async-action");
      app.trigger("chat:reconnect");
    },

    onReconnected: function() {
      var self = this;
      // Add a 500ms delay to show user something has happenned.
      window.setTimeout(function() {
        self.$el.find(".lily-msg-reconnect").hide();
      }, 500);
    },

    onResetConversation: function() {
      this.collection.reset();
      this.closeChildren();
    },

    closeChildren: function() {

      var self = this;
      this.childViews.forEach(function(view) {
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },

    remove: function() {
      this.closeChildren();
      // destroy models in collection, reset collection and delete reference;
      this.collection.reset();
      this.collection = null;
      app.off('ws:subscribedToChat', this.onSubscribedChat);
      // app.skeleton.chatCollection = null;
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return ChatView;
});
