/*========================================
    DASHBOARD CONNECTED LIST VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    OperatorView = require('backoffice/chat/views/dashboard/connected/operatorView'),

    // Object wrapper returned as a module
    ListView;

  ListView = Backbone.View.extend({

    el: '.js-dashboard-connected',
    template: _.template($('#dashboardConnectedListTpl').html()),

    events: {},

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
      this.listenTo(this.collection, 'add', this.add);
    },

    render: function() {
      var that = this;
      
      this.$el.html(this.template());
      this.collection.each(function (operator) {
        that.add(operator);
      });
      return this;
    },

    add: function(user) {
      if (user.get('type') === 'operator') {
        var view = new OperatorView({
          model: user
        });
        this.childViews.add(view);
        this.$el.find('ul').append(view.$el);
      }
    },

    remove: function () {
      var that = this;
      
      this.childViews.forEach(function (view){
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }

  });

  return ListView;
});
