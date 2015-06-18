/* ===========================
    		Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _                   = require('underscore'),
    Backbone              = require('backbone'),
    isMobile              = require('isMobile'),
    app                   = require('front/app'),
    config                = require('front/globals'),
    Models                = require('front/data/models'),
    Collections           = require('front/data/collections'),
    PageView              = require('front/views/page'),
    MessageChatOperator   = require('front/views/messageChatOperator'),
    MessageChatVisitor    = require('front/views/messageChatVisitor'),
    MessageChatNotation   = require('front/views/messageChatNotation'),
    MessageChatReconnect  = require('front/views/messageChatReconnect'),
    MessageChatTransfer   = require('front/views/messageChatTransfer'),
    MessageChatBan        = require('front/views/messageChatBan'),
    MessageChatClose      = require('front/views/messageChatClose'),
    ChildViewContainer    = require('utils/backbone-childviewcontainer'),
    // Object wrapper returned as a module
    ChatView;

  ChatView = PageView.extend({

    template: _.template($('#lily-page-chat-template').html()),

    events: {
      'keyup  .chat-input-component': 'writing',
      'submit .chat-input-component': 'doChat',
      'keydown .chat-input':          'doChat',
      'click  .btn-sendmsg':          'doChat',
      'click  .js-reconnect-action': 'reconnect'
    },

    initialize: function() {

      this.collection = new Collections.Messages();
      this.childViews = new Backbone.ChildViewContainer();

      this.listenTo(this.collection, 'add', this.processMessage);

      this.listenTo(app, 'ws:subscribedToChat', this.onSubscribedChat, this);
      this.listenTo(app, 'chat:connected', this.onReconnected, this);

      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');

      // Post-render
      this.$input = this.$el.find('.chat-input').myedit();

      // fix bug where [contenteditable="true"] elements would not
      // take focus on touchend on iOS (Android ?) devices
      this.$input.on('touchstart', function(ev) {
        $(ev.currentTarget).focus();
        // force scroll to bottom when virtual keyboard scrolls into view
        if (!isMobile.apple) return;
        window.scrollTo(0,document.body.scrollHeight);
      });

      if (app.isConnectionActive && app.payload) {
        this.onSubscribedChat(app.payload);
      }

      this.reconnectionMsgVisible = false;
    },

    render: function() {

      this.$el.html(this.template());

      return PageView.prototype.render.apply(this, arguments);
    },

    onSubscribedChat: function(payload) {
      this.collection.set(payload);
    },

    processMessage: function(message) {
      switch (message.get('action')) {
        case 'inactivity':
          message.set('msg', config.chat.inactivityMsg);
          message.set('userAction', config.chat.inactivityAction);
          message.set('info', '');
          break;
        case 'transfer':
          message.set('msg', config.chat.transferMsg);
          break;
        case 'ban':
          message.set('msg', config.chat.banMsg);
          message.set('info', '');
          break;
        case 'close':
          this.onConversationClose(config.chat.notationMsg);
          message.set('msg', config.chat.closeMsg);
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
            model: message
          }).render();
          break;

        case 'operator':
          messageView = new MessageChatOperator({
            model: message
          }).render();
          break;

        case 'server':

          switch (message.get('action')) {
            case 'inactivity':
              if (this.reconnectionMsgVisible) {
                return;
              }

              messageView = new MessageChatReconnect({
                model: message
              }).render();
              this.reconnectionMsgVisible = true;
              break;

            case 'ban':
              messageView = new MessageChatBan({
                model: message
              }).render();
              break;

            case 'close':
              messageView = new MessageChatClose({
                model: message
              }).render();
              break;

            case 'transfer':
              messageView = new MessageChatTransfer({
                model: message
              }).render();
              break;

            case 'notation':
              messageView = new MessageChatNotation({
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

    writing: function() {
      var isWriting = !!this.$input.val().trim();

      app.trigger('chat:writing', isWriting);

      if (typeof this.writingTimeout === 'number') {
        window.clearTimeout(this.writingTimeout);
        delete this.writingTimeout;
      }

      // User may have started writing a message in chat,
      // but has been idle for a while
      this.writingTimeout = window.setTimeout(function() {
        app.trigger('chat:writing', false);
      }, 10000);
    },

    doChat: function(ev) {

      // The method was triggered by the "submit" event handler
      if (ev && ev.type === 'submit') {
        ev.preventDefault();
      }

      // if key pressed is not Enter, don't submit
      if (ev && ev.keyCode && ev.keyCode !== 13) {
        return;
      }
      
      if (ev && ev.keyCode && ev.keyCode == 13) {
        ev.preventDefault();
      }

      var message = this.$input
        .val()
        .trim()
        .replace(/<\/?(\w+)\s*[\w\W]*?>/g, '');

      if (message.length > 0) {
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
        this.$input.empty()
          .blur();
      } else {
        this.$input.empty()
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
      this.$el.find('.lily-msg-reconnect').addClass('lily-async-action');
      app.trigger('chat:reconnect');
    },

    onReconnected: function() {
      var that = this;
      
      // Add a 500ms delay to show user something has happenned.
      window.setTimeout(function() {
        that.$el.find('.lily-msg-reconnect').hide();
        that.reconnectionMsgVisible = false;
      }, 400);
    },

    onConversationClose: function(msg) {
      var model = new Models.ServerMessage({
        action: 'notation',
        from: 'server',
        msg: msg
      });
      this.addItem(model);
    },

    closeChildren: function() {

      var that = this;
      this.childViews.forEach(function(view) {

        // delete index for that view
        that.childViews.remove(view);

        // remove the view
        view.remove();
      });
    },

    remove: function() {
      this.closeChildren();

      // destroy models in collection, reset collection and delete reference;
      this.collection.reset();
      app.off('ws:subscribedToChat', this.onSubscribedChat);

      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return ChatView;
});
