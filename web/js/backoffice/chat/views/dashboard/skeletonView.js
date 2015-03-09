/*========================================
      DASHBOARD SKELETON VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    ConnectedListView = require('backoffice/chat/views/dashboard/connected/listView'),
    LoadingView = require('backoffice/chat/views/dashboard/loadingView'),
    OperatorsView = require('backoffice/chat/views/dashboard/operatorsView'),
    VisitorsView = require('backoffice/chat/views/dashboard/visitorsView'),

    // Object wrapper returned as a module
    SkeletonView;

  SkeletonView = Backbone.View.extend({

    tagName: 'section',
    className: 'js-dashboard-container vbox',
    template: _.template($('#dashboardSkeletonTpl').html()),

    events: {},

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.render();

      var connectedView = new ConnectedListView({
        collection: this.collection
      });
      this.childViews.add(connectedView);
      
      var loadingView = new LoadingView();
      this.childViews.add(loadingView);
      
      var operatorsView = new OperatorsView();
      this.childViews.add(operatorsView);
      
      var visitorsView = new VisitorsView();
      this.childViews.add(visitorsView);

      this.listenTo(this.collection, 'add', this.update);
      this.listenTo(this.collection, 'change', this.update);
      this.listenTo(this.collection, 'remove', this.update);
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('.js-skeleton-container');
      return this;
    },

    update: function() {

      var collection = {};
      collection.visitors = this.collection.where({
        type: 'visitor',
        closed: false,
        banned: false
      });

      collection.visitors.chatting = collection.visitors.filter(function(model) {
        var v = model.get('operator');
        return (typeof(v) !== 'undefined' && v);
      });

      collection.operators = this.collection.where({
        type: 'operator'
      });
      collection.available = this.collection.where({
        type: 'operator',
        available: true
      });

      this.childViews.call('update', collection);
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

  return SkeletonView;
});
