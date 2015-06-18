/*========================================
            Alert VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    app = require('backoffice/app'),
    _ = require('underscore'),
    
    // Object wrapper returned as a module
    AlertView;

  AlertView = Backbone.View.extend({

    className: 'shell-alert',
    template: _.template($('#liveConversationShellAlertTpl').html()),

    events: {
    },

    initialize: function(options) {
      var title = options.title;
      this.render(title);
    },

    render: function(title) {
      var that = this;
      this.$el.html(this.template({title: title}));
      setTimeout(function () {
        that.remove();
      }, 3000);
      return this;
    }

  });

  return AlertView;
});
