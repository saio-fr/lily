/*========================================
      ACTIVITIES CHAT VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      LogView;

  LogView = Backbone.View.extend({

    tagName:  'li',
    className: 'list-group-item clear',
    template: _.template($('#usersActivitiesLogsLogTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      $('.logs-list').append(this.$el);
      return this;
    }

  });

  return LogView;
});
