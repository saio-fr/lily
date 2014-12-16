/*========================================
      LOGS SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      utils = require('statistics'),
      LogCollection = require('backoffice/profile/collections/logCollection'),
      LogView = require('backoffice/profile/views/activities/logs/logView'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '#logs',
    template: _.template($('#activitiesLogsSkeletonTpl').html()),

    events: {
      'hide.daterangepicker' : 'range',
      'click .sort-menu li': 'sort'
    },

    initialize: function() {
      this.filtered = new LogCollection();
      this.sortBy = 'all';
      this.filtered.reset(this.collection.toJSON());
      this.$el.html(this.template());
      utils.daterangepicker(this);
      this.render();
    },
    
    render: function () {
      var that = this;
      $('.logs-list').empty();
      this.filtered.each(this.add, this);
	    if (!this.filtered.length) {
		    $('.logs-list').html("<li class='list-group-item view'><h6>Aucun log d'activité.</h6></li>");
	    }
      $('.loader').fadeOut();
    },
    
    add: function (log) {
      this.view = new LogView({model: log});
      $('.logs-list').append(this.view.render().el);
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
    }

  });

  return SkeletonView;
});
