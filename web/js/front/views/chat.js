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
    config                = require('front/config'),
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
      'keyup   .chat-input-component': 'isWriting',
      'submit  .chat-input-component': 'onUserInput',
      'keydown .chat-input':           'onUserInput',
      'click   .btn-sendmsg':          'onUserInput',
      'click   .js-reconnect-action':  'reconnect',
    },

    initialize: function() {

      this.collection = new Collections.Messages();
      this.childViews = new Backbone.ChildViewContainer();

      this.listenTo(this.collection, 'add', this.onCollectionAdd);

      this.listenTo(this.model, 'change:operator', this.onOperatorChange);

      this.listenTo(app, 'ws:subscribedToChat', this.onSubscribedChat, this);
      this.listenTo(app, 'chat:connected', this.onReconnected, this);
      this.listenTo(app, 'chat:sendMessage', this.receiveMsgFromSdk);
      this.listenTo(app, 'app:isShown', this.onAppShown);

      this.reconnectionMsgVisible = false;
      this.visitorMsgSent = 0;

      $(this.render().el).appendTo('#lily-wrapper-page');

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
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return PageView.prototype.render.apply(this, arguments);
    },

    onAppShown: function() {
      this.$input.focus();
    },

    onSubscribedChat: function(payload) {
      this.collection.set(payload);
    },

    onCollectionAdd: function(message) {
      switch (message.get('action')) {
        case 'inactivity':
          message.set({
            'msg': this.model.get('messages').inactivity,
            'userAction': this.model.get('messages').inactivityAction,
            'info': ''
          });

          app.track.funnel('Visitor was idle for more than 15 min');

          // Reset Conversation stats
          // (if a visitor reconnects, a new conversation will be created)
          this.visitorMsgSent = 0;
          break;
        case 'transfer':
          message.set('msg', this.model.get('messages').transfer);
          break;
        case 'ban':
          message.set({
            'msg': this.model.get('messages').ban,
            'info': ''
          });

          break;
        case 'close':
          this.onConversationClose(this.model.get('messages').notation);
          message.set('msg', this.model.get('messages').close);
          break;
        case undefined:
          break;
      }

      this.createMessageView(message);
    },

    createMessageView: function(message) {
      var messageView;

      // create an instance of the sub-view to render the single message item.
      switch (message.get('from')) {
        case 'visitor':
          messageView = new MessageChatVisitor({ model: message }).render();
          break;
        case 'operator':
          messageView = new MessageChatOperator({ model: message }).render();
          this.getOperatorInfos(message);
          break;
        case 'sdk':
          messageView = new MessageChatOperator({ model: message }).render();
          break;
        case 'server':

          switch (message.get('action')) {
            case 'inactivity':
              if (this.reconnectionMsgVisible) { return; }
              messageView = new MessageChatReconnect({ model: message }).render();
              this.reconnectionMsgVisible = true;
              break;
            case 'ban':
              messageView = new MessageChatBan({ model: message }).render();
              break;
            case 'close':
              messageView = new MessageChatClose({ model: message }).render();
              break;
            case 'transfer':
              messageView = new MessageChatTransfer({ model: message }).render();
              break;
            case 'notation':
              messageView = new MessageChatNotation({ model: message }).render();
              break;
          }

          break;
      }

      if (messageView) {
        this.childViews.add(messageView);
      }
    },

    trackMessage: function(message) {
      this.visitorMsgSent ++;

      app.track.funnel('Visitor sent a message', {
        message: message,
        visitorMsgSent: this.visitorMsgSent,
      });
    },

    sendMessage: function(message) {
      app.trigger('chat:send', message);
      this.trackMessage(message);
    },

    receiveMsgFromSdk: function(message) {
      var msg = message.body;
      var type = message.type;

      this.collection.add({
        from: 'sdk',
        msg: msg,
        operator: null,
      });
    },

    getOperatorInfos: function(message) {
      this.model.set('operator', message.get('operator'));
    },

    onOperatorChange: function(model, operator) {
      app.trigger('chat.operatorChange', operator);
    },

    isWriting: function() {
      var isWriting = !!this.$input.val().trim();

      app.trigger('chat:isWriting', isWriting);

      if (typeof this.writingTimeout === 'number') {
        window.clearTimeout(this.writingTimeout);
        delete this.writingTimeout;
      }

      // User may have started writing a message in chat,
      // but has been idle for a while
      this.writingTimeout = window.setTimeout(function() {
        app.trigger('chat:isWriting', false);
      }, 10000);
    },

    onUserInput: function(ev) {

      // The method was triggered by the "submit" event handler
      if (ev && ev.type === 'submit') {
        ev.preventDefault();
      }

      // if key pressed is not Enter, don't submit
      if (ev && ev.keyCode && ev.keyCode !== 13) {
        return;
      }

      if (ev && ev.keyCode && ev.keyCode === 13) {
        ev.preventDefault();
      }

      var message = this.$input
        .val()
        .trim()
        .replace(/<\/?(\w+)\s*[\w\W]*?>/g, '');

      if (message.length > 0) {
        // On vérifie que le champ n'est pas vide
        // ou contient uniquement des espaces
        this.sendMessage(message);
      }

      // clear the search field
      this.clearInput();
      this.isWriting();
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

      this.createMessageView(model);
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
