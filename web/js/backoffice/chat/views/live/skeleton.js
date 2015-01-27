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
    RecordCurrent = require('backoffice/chat/views/live/records/current'),
    RecordWaiting = require('backoffice/chat/views/live/records/waiting'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'js-live-container hbox stretch hide',
    template: _.template($('#liveSkeletonTpl').html()),

    events: {},

    initialize: function() {

      this.render();

      this.listenTo(this.collection, 'add', this.add);
      this.listenTo(this.collection, 'change:operator', this.add);
      this.listenTo(this.collection, 'change:closed', this.add);
      this.listenTo(this.collection, 'add', this.counters);
      this.listenTo(this.collection, 'change', this.counters);
      this.listenTo(this.collection, 'remove', this.counters);
      this.listenTo(app, "change:windows", this.setWindows, this);

      var that = this;
      this.windows = [];
      this.maxWindows = 1;
      this.counter = {};
      this.counter.current = 0;
      this.counter.waiting = 0;

      this.showInformations = true;

      // Adjust windows on navigator resize
      $(window).resize(function() {
        that.setWindows();
      });
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('.js-main-container');
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

    setWindows: function() {


      // If there is more 1 windows, add "multiple" class to show them all
      if (this.windows.length > 1) {

        $('.conversations').children().addClass('multiple');
        $('.conversations').children().addClass('half-width');
        if (this.windows.length > 2) {
          $('.conversations').children().addClass('half-height');
        }

      } else {

        $('.conversations').children().removeClass('multiple');
        $('.conversations').children().removeClass('half-width');
      }

      if (this.windows.length < 3) {
        $('.conversations').children().removeClass('half-height');
      }

      if ($('.js-live-container').width() > 1090) {

        $('.btn-group.windows').show();
      } else {

        $('.windows .dropdown-menu li:first-child a').trigger('click');
        $('.btn-group.windows').hide();
        $('.conversations').children().removeClass('multiple full-width half-width');
      }

      if ($('.js-live-container').height() < 750) {

        $('.windows .dropdown-select li:nth-child(3) a').hide();
        if (this.maxWindows === 4) {
          $('.windows .dropdown-select li:nth-child(2) a').trigger('click');
          $('.conversations').children().removeClass('half-height');
        }
      } else {
        $('.windows .dropdown-select li:nth-child(3) a').show();
      }

      if ($(window).width() > 768) {
        $('.aside-chat-left').css({
          display: 'table-cell'
        });
      } else {

        if (this.windows.length > 0) {
          $('.aside-chat-left').css({
            display: 'none'
          });
        } else {
          $('.aside-chat-left').css({
            display: 'block'
          });
        }
      }

      // Hide informations if the window is too small
      if ($('.js-live-container').width() < 950 ||
        $('.js-live-container').width() < 1300 &&
        $('.conversations').children().hasClass('multiple')) {

        $('.aside-chat-right').addClass('hide');
      } else {

        $('.aside-chat-right').removeClass('hide');
      }
    }


  });

  return SkeletonView;
});
