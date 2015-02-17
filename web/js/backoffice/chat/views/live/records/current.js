/*========================================
      RECORD CURRENT VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Timers = require('backoffice/chat/utils/timers'),
    StatusHelpers = require('backoffice/chat/utils/status'),

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
      this.listenTo(this.model, 'change:status', this.changeStatus);
      this.listenTo(this.model, 'change:banned', this.close);
      this.listenTo(this.model, 'change:operator', this.close);
      this.listenTo(this.model, 'change:closed', this.close);
      this.listenTo(this.model, 'change:name', this.render);
      this.listenTo(this.model, 'unactive', this.unactive);
      this.listenTo(this.model, 'active', this.active);
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

    // Todo: consider a toggle active method instead
    active: function() {
      this.$el.addClass('active');
    },

    unactive: function() {
      this.$el.removeClass('active');
    },

    select: function() {
      var active = this.$el.hasClass('active');
      app.trigger('conversation:select', active, this.id);
    },

    close: function() {
      
      this.model.trigger('minus');
      this.remove();
      app.trigger('conversation:stopFollow', this.id);
    }

  });

  _.extend(RecordView.prototype, StatusHelpers);

  return RecordView;
});
