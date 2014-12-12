/*========================================
      ACTIVITIES LOGS/LOG VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      LogView;

  LogView = Backbone.View.extend({

    el: '.aside-activities',
    template: _.template($('#activitiesLogsLogTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template());
      return this;
    }

  });

  return LogView;
});
