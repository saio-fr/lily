/*========================================
      LIVE SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    g = require('globals'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    RecordCurrent = require('components/chat/views/records/current'),
    RecordWaiting = require('components/chat/views/records/waiting'),
    ConversationView = require('components/chat/views/conversation'),
    Collections = require('components/chat/data/collections'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    id: 'chatModal',
    className: 'js-chat-container hbox stretch hide',
    template: _.template($('#liveSkeletonTpl').html()),

    events: {},

    initialize: function() {

      this.collection = app.chatUsers || new Collections.Users(app.chatUsersData || []);

      this.render();

      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'change:operator', this.add);
      this.listenTo(this.collection, 'change:closed', this.add);
      this.listenTo(this.collection, 'add', this.counters);
      this.listenTo(this.collection, 'change', this.counters);
      this.listenTo(this.collection, 'remove', this.counters);
      this.listenTo(app, "change:windows", this.setWindows, this);
      this.listenTo(app, "conversation:select", this.setActiveWindow, this);
      this.listenTo(app, "conversation:setCurrent", this.setCurrent, this);

      this.windows = [];
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

    add: function(user) {
      var recordView;

      if (user.get('type') === 'operator' || user.get('banned') || user.get('closed')) {
        return;
      }

      if (user.get('operator') === parseInt(g.userId, 10)) {
        recordView = new RecordCurrent({
          model: user
        });
        recordView.render();
      }

      if (!user.get('operator')) {
        recordView = new RecordWaiting({
          model: user
        });
        recordView.render();
      }

    },

    counters: function() {

      this.counter.current = this.$el.find('.list-current').children().length;
      this.$el.find('.header-current span').html(this.counter.current);

      this.counter.waiting = this.$el.find('.list-waiting').children().length;
      this.$el.find('.header-waiting span').html(this.counter.waiting);
    },

    setActiveWindow: function(active, id, model) {

      var live = this;

      model = model || this.collection.get(id);

      if (!model) { return; }

      if ($(window).width() < 768) {
        $('.aside-chat-left').css({
          display: 'none'
        });
      }

      if (active) {
        // If the view already exists and only a view is show, do nothing
        if (live.windows.length <= 1) {
          return;
        }
        // If the view already exists, show it first in the view list
        $.each(live.windows, function(index, item) {

          if (item.model.id === model.get('id')) {

            item.remove();
            live.windows.splice(index, 1);
            live.windows.unshift(
              new ConversationView({
                model: model
              })
            );

            live.setWindows();
            return;
          }
        });

        return;
      }

      if (live.windows.length < live.maxWindows)  {
        // Create a new conversation view
        live.windows.unshift(
          new ConversationView({
            model: model
          })
        );

      } else {
        // Delete the last conversation view
        live.windows[live.windows.length - 1].model.trigger('minus');
        // Create a new conversation view
        live.windows.unshift(new ConversationView({
          model: model
        }));
      }

      live.setWindows();
    },

    setCurrent: function(active, id, model) {

      var that = this;
      model = model || this.collection.get(id);

      app.setOperator(id).then(function() {
        // Will take care of displaying the conversation correctly:
        that.setActiveWindow(active, model.get('id'), model);
        that.setWindows();
      }, function(error) {
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

      if ($container.height() < 1024) {

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

        $conversationList.css({
          display: 'table-cell'
        });
        $conversationsContainer.addClass('show-conversation-list');
      } else {
        if (this.windows.length === 0) {
          $conversationList.css({
            display: 'block'
          });
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
      $(window).off("resize", this.setWindows);
      //call the superclass remove method
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return SkeletonView;
});
