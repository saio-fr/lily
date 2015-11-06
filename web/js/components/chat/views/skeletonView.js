/*========================================
      LIVE SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    config = require('config'),
    RecordCurrent = require('components/chat/views/records/currentView'),
    RecordWaiting = require('components/chat/views/records/waitingView'),
    InformationsView =   require('components/chat/views/informationsView'),
    ConversationView = require('components/chat/views/conversationView'),
    ModalLayoutView = require('components/modals/views/layoutView'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = ModalLayoutView.extend({

    tagName: 'section',
    className: 'chatModal',
    template: _.template($('#liveSkeletonTpl').html()),
    events: {
      'click .windows-selector': 'setMaxWindows',
    },

    initialize: function() {

      this.collection = app.chatUsers;

      this.render();

      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'change:operator', this.add);
      this.listenTo(this.collection, 'change:closed', this.add);
      this.listenTo(this.collection, 'add change remove', this.counters);
      this.listenTo(app, 'change:windows', this.setWindows, this);
      this.listenTo(app, 'conversation:setActive', this.setActiveWindow, this);
      this.listenTo(app, 'conversation:unsetActive', this.unsetActiveWindow, this);
      this.listenTo(app, 'conversation:setCurrent', this.setCurrent, this);
      this.listenTo(app, 'chatWindow:open', this.openChatWindow, this);
      this.listenTo(app, 'chatWindow:close', this.close.bind(this), this);

      this.windows = new Backbone.ChildViewContainer();
      this.maxWindows = 1;
      this.counter = {};
      this.counter.current = 0;
      this.counter.waiting = 0;
      this.showInformations = true;

      var that = this;

      // Adjust windows on navigator resize:
      // And right away:
      // (skip a frame before calling setWindows to let the router finish
      // the app.liveChatSkeleton initialization - hacky :/ - )
      window.setTimeout(function() {
        that.setWindows.apply(that, arguments);
      });

      $(window).on('resize', function() {
        _.debounce(that.setWindows, 300, true).apply(that, arguments);
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('body');
      return this;
    },

    openChatWindow: function() {
      this.open({ removeOnClose: false });
    },

    add: function(user) {
      var recordView;

      if (user.get('type') === 'operator' || user.get('banned') || user.get('closed')) {
        return;
      }

      if (user.get('operator') === parseInt(config.userId, 10)) {
        recordView = new RecordCurrent({ model: user }).render();
      }

      if (!user.get('operator')) {
        recordView = new RecordWaiting({ model: user }).render();
      }
    },

    counters: function() {
      this.counter.current = this.$el.find('.list-current').children().length;
      this.$el.find('.header-current span').html(this.counter.current);

      this.counter.waiting = this.$el.find('.list-waiting').children().length;
      this.$el.find('.header-waiting span').html(this.counter.waiting);
    },

    setMaxWindows: function(e) {

      if (typeof(e) !== 'undefined') {

        e.preventDefault();
        this.maxWindows = parseInt($(e.target).attr('data'), 10) || 1;

        this.$el.find('.windows span').html(
          this.maxWindows === 1 ?
          this.maxWindows + ' Conversation' :
          this.maxWindows + ' Conversations'
        );
      }

      if (this.maxWindows < this.windows.length) {

        var diff = this.windows.length - this.maxWindows;
        for (var i = 0; i < diff; i++) {
          this.windows.findByIndex(this.windows.length - 1).model.trigger('minus');
        }
      }
    },

    setActiveWindow: function(id, model) {
      model = model || this.collection.get(id);

      var that = this,
          existingView = that.windows.findByModel(model),
          active = existingView ? true : false;

      if (!model) { return; }

      if ($(window).width() < 768) {
        $('.aside-chat-left').css({
          display: 'none'
        });
      }

      if (that.windows.length > 1 && that.informations) {
        that.informations.remove();
      }

      if (active) {
        // If the view already exists and only a view is show, do nothing
        if (that.windows.length <= 1) {
          return;
        }

        // If the view already exists, show it first in the view list
        that.windows.remove(existingView);
        existingView.remove();

        that.windows.add(
          new ConversationView({
            model: model
          })
        );

        that.setWindows();
        return;
      }

      if (that.windows.length < that.maxWindows)  {

        // Create a new conversation view
        that.windows.add(new ConversationView({
          model: model
        }));

      } else {

        // Delete the last conversation view
        that.windows.findByIndex(that.windows.length - 1).model.trigger('minus');

        // Create a new conversation view
        that.windows.add(new ConversationView({
          model: model
        }));
      }

      model.set({
        selected: true,
        active: true
      });

      that.setWindows();
    },

    unsetActiveWindow: function(cid) {
      var conversation = this.windows.findByCid(cid);
      this.windows.remove(conversation);
      this.setWindows();
    },

    setCurrent: function(id, model) {
      var that = this;
      model = model || this.collection.get(id);

      app.setOperator(id).then(function() {
        // Kinda ugly... But definitely works: Skipping a frame to wait for the change event
        // to trigger the "add" method again, causing the conversation to go
        // from waiting to current, before showing it with "setActiveWindow"
        window.setTimeout(function() {
          that.setActiveWindow(model.get('id'), model);
          that.setWindows();
        });
      },

      function(error) {
        console.warn(error);
      });
    },

    setWindows: function() {
      var $conversations = $('.conversations').children(),
          $conversationList = $('.aside-chat-left'),
          $infoPanel = $('.aside-chat-right'),
          $container = $('.js-chat-container'),
          $conversationsContainer = $('.conversations');

      /**
       * Logic to accomodate multiple chat windows
       **/
      if (this.windows.length > 1) {

        $conversations.addClass('multiple half-width');
        if (this.windows.length > 2) {
          $conversations.addClass('half-height');
        }
      } else {
        $conversations.removeClass('multiple half-width');
      }

      if (this.windows.length < 3) {
        $conversations.removeClass('half-height');
      }

      /**
       * Width and height concerns and rules:
       **/
      if ($container.width() > 1090) {
        $('.btn-group.windows').show();
      } else {
        $('.windows .dropdown-menu li:first-child a').trigger('click');
        $('.btn-group.windows').hide();
        $conversations.removeClass('multiple full-width half-width');
      }

      if ($container.height() < 900) {
        $('.windows .dropdown-menu li:nth-child(3) a').hide();
        if (this.maxWindows === 4) {
          $('.windows .dropdown-menu li:nth-child(2) a').trigger('click');
          $conversations.removeClass('half-height');
        }
      } else {
        $('.windows .dropdown-menu li:nth-child(3) a').show();
      }

      /**
       * Show/Hide the list of current conversations:
       **/
      if ($container.width() > 768) {
        $conversationList.css({ display: 'table-cell' });
        $conversationsContainer.addClass('show-conversation-list');
      } else {
        if (this.windows.length === 0) {
          $conversationList.css({ display: 'block' });
        } else {
          $conversationList.hide();
          $conversationsContainer.removeClass('show-conversation-list');
        }
      }

      /**
       * Show/Hide informations if the window is too small
       **/
      if ($container.width() < 950 ||
          $container.width() < 1300 &&
        $conversations.hasClass('multiple')) {

        $infoPanel.addClass('hide');
      } else {

        $infoPanel.removeClass('hide');
      }
    },

    remove: function() {
      $(window).off('resize', this.setWindows);

      this.windows.call('remove');
      this.close();

      //call the superclass remove method
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SkeletonView;
});
