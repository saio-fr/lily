/*========================================
      RECORD CURRENT VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    Backbone = require('backbone'),
    _ = require('underscore'),
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

      this.render();

      this.listenTo(this.model, 'change:operator', this.close);
      this.listenTo(this.model, 'change:closed', this.close);
      this.listenTo(this.model, 'change:messages', this.status);
      this.listenTo(this.model, 'change:name', this.render);
      // The visitor has been waiting over 2 minutes without reply
      this.listenTo(this.model, 'change:status', this.changeStatus);
      // After an 20min of inactivity, the model is removed on the server
      this.listenTo(this.model, 'remove', this.remove);

      this.id = this.model.get('id');
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.list-waiting');

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
      app.trigger('conversation:setCurrent', this.id, this.model);
    },

    close: function() {

      this.remove();
      app.trigger('conversation:stopFollow', this.id);
    }

  });

  _.extend(RecordView.prototype, StatusHelpers);

  return RecordView;
});
