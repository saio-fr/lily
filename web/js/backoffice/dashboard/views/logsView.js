/*========================================
      ACTIVITIES CHAT VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      LogsView;

  LogsView = Backbone.View.extend({

    el:  '.logs-wrapper',
    template: _.template($('#logsTpl').html()),

    events: {
    },

    initialize: function() {
      this.collection.reset(this.collection.first(5));
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template({
        collection: this.collection.toJSON()
        })
      );
      return this;
    }

  });

  return LogsView;
});
