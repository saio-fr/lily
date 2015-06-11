/*========================================
      LIVE CONVERSATION VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('app'),
    _ = require('underscore'),
    globals = require('globals'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    Collections =        require('components/chat/data/collections'),
    MessagesView =       require('components/chat/views/messagesView'),
    InformationsView =   require('components/chat/views/informationsView'),
    OperatorView =       require('components/chat/views/transfer/operatorView'),
    ShellView =          require('components/chat/views/shell/skeletonView'),
    StatusHelpers =      require('components/chat/utils/status'),
    Timers =             require('components/chat/utils/timers'),

    // Object wrapper returned as a module
    ConversationView;

  ConversationView = Backbone.View.extend({

    tagName: 'section',
    className: 'vbox animated fadeInRight',
    template: _.template($('#liveConversationTpl').html()),

    events: {
      'click': 'select',
      'click .conversation-close': 'close',
      'click .conversation-minus': 'minus',
      'click .ban': 'ban',
      'click .transfer': 'transfer',
      'blur input[name=name]': 'changeName',
      'keypress input[name=name]': 'changeNameOnEnter'
    },

    initialize: function() {

      var that = this;

      this.id = this.model.get('id');

      // Render the view
      $(this.render().el).prependTo('.conversations');

      // Create a collection of this view messages
      this.messages = new Collections.Messages();

      // Listen to new messages
      this.listenTo(this.model, 'change:messages', this.getMessages);
      this.listenTo(this.model, 'change:writing', this.writing);
      this.listenTo(this.model, 'change:status', this.changeStatus);
      this.listenTo(this.model, 'minus', this.minus);
      this.listenTo(this.messages, 'add', this.addMsg);
      this.listenTo(this.messages, 'add', this.status);

      this.listenTo(app, 'search:copyToChat', this.onCopyToChat);

      // If the visitor is writing, show it
      this.$writing = this.$el.find('.alert-writing');
      // Create a child view container
      this.childViews = new Backbone.ChildViewContainer();
      // Create shell view
      this.renderShell();
      // Check conversation status :
      this.status();
      // Create the informations view and select the window
      this.select();
      // Get the messages
      this.getMessages();
      // Is the user writting?
      this.writing();
      // Check conversation status
      Timers.status(this, 'lastMsg');

      // The conversation was selected. (Will notify the notification module)
      app.trigger('conversation:selected', this.id);

      this.$editor  = $('.editor');
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    renderShell: function () {

      var appendEl = this.$('.js-conversation-shell');

      var shellView = new ShellView({
        appendEl: appendEl,
        model: this.model
      });
      this.childViews.add(shellView, 'shellView');
    },

    getMessages: function() {
      this.messages.set(this.model.get('messages'));
    },

    onCopyToChat: function(msg) {
      if (this.model.get('active') && this.model.get('selected')) {
        this.$editor
          .html(msg.trim().replace(/<\/?(\w+)\s*[\w\W]*?>/g, ''))
          .focus();
      }
    },

    addMsg: function(msg) {
      var view,
        conversations = this.$el.find('.conversation-section-list');
      // create an instance of the sub-view to render the single message item.
      switch (msg.get('from')) {

        case 'operator':
          msg.convertAvatar();
          view = new MessagesView.Operator({
            model: msg
          }).render(conversations);
          break;

        case 'visitor':
          view = new MessagesView.Visitor({
            model: msg
          }).render(conversations);
          break;

        case 'server':
          view = new MessagesView.Server({
            model: msg
          }).render(conversations);
          break;
      }

      this.childViews.add(view);

      // Scroll to bottom of chat
      var conversation = this.$el.find('.conversation-section');
      conversation.scrollTop(conversation[0].scrollHeight);
    },

    // Todo: abstract dom logic in skeleton
    select: function() {
      if (!this.model.get('selected')) {

        $('.conversations .selected').removeClass('selected');
        this.$el.addClass('selected');

        var live = app.liveChatSkeleton;

        // Unselect current window & select this one
        live.windows.call('unselect');
        this.model.set({selected: true});

        if (live.informations && live.informations.model.get('id') !== this.id) {
          live.informations.remove();
        }

        if (!live.informations && live.windows.length <= 1) {
          live.informations = new InformationsView({
            model: this.model
          });
        }

        app.trigger('change:windows');
        app.trigger('conversation:selected', this.id);
      }
    },

    unselect: function () {
      this.model.set({selected: false});
    },

    minus: function(e) {
      if (typeof(e) !== 'undefined') {
        e.stopPropagation();
      }

      this.model.set({
        active: false,
        selected: false
      });

      app.trigger('conversation:unsetActive', this.cid);

      this.remove();
    },

    close: function() {
      var modal = app.createModal.confirm(globals.modalConfirm.chatClose);
      modal.promise.then(function (res) {
        if (res) {
          app.trigger('operator:close', this.id);
          this.minus();
        }
      }.bind(this));
    },

    ban: function() {
      var modal = app.createModal.confirm(globals.modalConfirm.chatBan);
      modal.promise.then(function (res) {
        if (res) {
          app.trigger('operator:ban', this.id);
          this.minus();
        }
      }.bind(this));
    },

    transfer: function() {
      var that = this;

      var operators = app.chatUsers.filter(function(model) {
        return model.get('type') === 'operator' &&
          model.get('available') &&
          model.get('id') !== parseInt(globals.userId, 10);
      });

      var transferModalView = app.createModal.app(globals.modalApp.chatTransfer);

      if (_.isEmpty(operators)) {
        transferModalView.$el.find('.modal-body').html('Aucun opérateur disponible.');
      } else {

        _.each(operators, function(operator) { // iterate through the collection
          var view = new OperatorView({
            model: operator,
            visitor: that.model
          });
          transferModalView.childViews.add(view);
          transferModalView.$el.find('.modal-body').append(view.el);
        });
      }

    },

    writing: function() {
      // Todo: Stop using show(), use css class in a smarter way.
      // see: https://github.com/jquery/jquery.com/issues/88#issuecomment-72400007
      if (this.model.get('writing')) {
        this.$writing.removeClass('fadeOut').addClass('fadeIn');
        this.$writing.show();
      } else {
        this.$writing.removeClass('fadeIn').addClass('fadeOut');
      }
    },

    changeNameOnEnter: function(ev) {
      if (ev.keyCode === 13 && !ev.shiftKey) {
        this.$el.find('input[name=name]').blur();
        this.$el.find('input[name=name]').focusout();
      }
    },

    changeName: function() {
      var name = this.$el.find('input[name="name"]').val();
      // Todo: listen to that event somewher maybe ?
      app.trigger('operator:changeName', this.id, name);
    },

    remove: function() {
      var self = this,
      live = app.liveChatSkeleton;

      if (live.informations &&
        live.informations.model.get('id') === this.model.get('id')) {

        live.informations.remove();
        live.informations = undefined;
      }

      this.childViews.forEach(function(view) {
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });

      Backbone.View.prototype.remove.call(this);
    }

  });

  _.extend(ConversationView.prototype, StatusHelpers);

  return ConversationView;
});
