/*========================================
    DASHBOARD CONNECTED LIST VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    OperatorView = require('backoffice/chat/views/dashboard/connected/operator'),

    // Object wrapper returned as a module
    ListView;

  ListView = Backbone.View.extend({

    el: '.js-dashboard-connected',
    template: _.template($('#dashboardConnectedListTpl').html()),

    events: {},

    initialize: function() {
      this.render();
      this.listenTo(this.collection, 'add', this.add);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    add: function(user) {
      if (user.get('type') === 'operator') {
        var view = new OperatorView({
          model: user
        });
        this.$el.find('ul').append(view.$el);
      }
    }

  });

  return ListView;
});
