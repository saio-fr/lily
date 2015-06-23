/*========================================
      LOGS SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),
      utils = require('statistics'),
      LogCollection = require('backoffice/profile/collections/logCollection'),
      LogView = require('backoffice/profile/views/activities/logs/logView'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),

      // Object wrapper returned as a modules
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#logs',
    template: _.template($('#activitiesLogsSkeletonTpl').html()),

    events: {
      'hide.daterangepicker' : 'range',
      'click .sort-menu li': 'sort'
    },

    initialize: function() {
      this.childViews = new Backbone.ChildViewContainer();
      this.filtered = new LogCollection();
      this.sortBy = 'all';
      this.filtered.reset(this.collection.toJSON());
      this.$el.html(this.template());
      utils.daterangepicker(this);
      this.render();
    },
    
    render: function () {
      var that = this;
      this.closeChildren();
      this.filtered.each(this.add, this);
	    if (!this.filtered.length) {
		    $('.logs-list').html('<li class="list-group-item view"><h6>Aucun logs.</h6></li>');
	    }
      $('.loader').fadeOut();
    },
    
    add: function (log) {
      var view = new LogView({model: log});
      this.childViews.add(view);
      $('.logs-list').append(view.render().el);
    },
    
    range: function () {
      var that = this;
      $('.loader').fadeIn();   
      this.collection.fetch({          
        success: function() {
          that.sort();
          that.render();
        }   
      });
    },
    
    sort: function(e) {
      // If the element is clicked
      if (e !== undefined) {
        var target = $(e.target);
        target.parent().find('.active').removeClass('active');
        target.addClass('active');
        this.sortBy = target.data('criteria');
      }

      if (this.sortBy !== 'all') {
        this.filtered.reset(this.collection.where({type: this.sortBy}));
      } else {
        this.filtered.reset(this.collection.toJSON());
      }
      this.render();
    },
    
    closeChildren: function () {

      var self = this;
      this.childViews.forEach(function (view){
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },

  });

  return SkeletonView;
});
