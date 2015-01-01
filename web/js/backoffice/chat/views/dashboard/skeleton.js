/*========================================
      DASHBOARD SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      ConnectedListView = require('backoffice/chat/views/dashboard/connected/list'),
      LoadingView = require('backoffice/chat/views/dashboard/loading'),
      OperatorsView = require('backoffice/chat/views/dashboard/operators'),
      VisitorsView = require('backoffice/chat/views/dashboard/visitors'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

	  tagName: 'section',
    className: 'js-dashboard-container vbox hide',
    template: _.template($('#dashboardSkeletonTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      
      this.connected = new ConnectedListView({
        collection: this.collection
      });
      this.loading = new LoadingView();
      this.operators = new OperatorsView();
      this.visitors = new VisitorsView();
      
      this.listenTo(this.collection, 'add', this.update);
      this.listenTo(this.collection, 'change', this.update);
      this.listenTo(this.collection, 'remove', this.update);
    },
    
    render: function () {
      this.$el.html(this.template());
      this.$el.appendTo('.js-main-container');
      return this;
    },
    
    update: function () {

      var collection = {};
  		collection.visitors = this.collection.where({
    		type: 'visitor', 
    		closed: false, 
    		banned: false
      });
      
  		collection.visitors.chatting = collection.visitors.filter(function (model) {
  			var v = model.get('operator');
  			return (typeof(v) !=='undefined' && v);
  		});		
  		
  		collection.operators = this.collection.where({ type: 'operator' });
  		collection.available = this.collection.where({ type: 'operator', available: true });
  		
  		this.loading.update(collection);
  		this.operators.update(collection);
  		this.visitors.update(collection);
  
    }

  });

  return SkeletonView;
});
