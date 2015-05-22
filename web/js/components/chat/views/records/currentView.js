/*========================================
      RECORD CURRENT VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Timers = require('components/chat/utils/timers'),
    StatusHelpers = require('components/chat/utils/status'),

    // Object wrapper returned as a module
    RecordView;

  RecordView = Backbone.View.extend({

    tagName: 'li',
    className: 'list-record-item animated fadeInUp',
    template: _.template($('#liveRecordTpl').html()),

    events: {
      'click': 'select'
    },

    initialize: function() {
      this.id = this.model.get('id');

      // Get the messages list
      this.listenTo(this.model, 'change:messages', this.status);
      this.listenTo(this.model, 'change:status',   this.changeStatus);
      this.listenTo(this.model, 'change:banned',   this.close);
      this.listenTo(this.model, 'change:operator', this.close);
      this.listenTo(this.model, 'change:closed',   this.close);
      this.listenTo(this.model, 'change:active',   this.onActiveChange);
      this.listenTo(this.model, 'change:name',     this.render);
      // After an half hour of inactivity, the model is removed on the server
      this.listenTo(this.model, 'remove', this.close);

      this.render();
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.list-current');

      this.timers();
      this.status();

      this.model.trigger('render');

      return this;
    },

    timers: function() {
      Timers.interval(this, 'chat');
      Timers.interval(this, 'lastMsg');
    },

    select: function(e) {
      e.preventDefault();
      app.trigger('conversation:setActive', this.id);
    },

    onActiveChange: function(model) {
      
      if (model.get('active') === true) {
        this.$el.addClass('active');
      } else {
        this.$el.removeClass('active');
      }
    },

    close: function() {
      app.trigger('conversation:stopFollow', this.id);
      this.model.trigger('minus');
      this.remove();
    }

  });

  _.extend(RecordView.prototype, StatusHelpers);

  return RecordView;
});
