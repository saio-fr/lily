/*========================================
      SKELETON APP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      GroupModel = require('backoffice/users/models/groupModel'),
      GroupEditView = require('backoffice/users/views/groups/groupEditView'),
      g = require('globals'),

      // Object wrapper returned as a module
      SkeletonView;

  SkeletonView = Backbone.View.extend({

    el: '.js-groups-container',
    template: _.template($('#groupsSkeletonTpl').html()),

    events: {
      "click .add-group" : "create"
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.removeClass('hide');
      this.$el.html(this.template());

      return this;
    },

    create: function () {
      
      app.trigger('closeEditView', this);
      var model = this.collection.create({}, { wait:true });
      $('#group-list .active').removeClass('active');
    },

    close: function () {
      utils.closeModelView(this);
    }
  });

  return SkeletonView;
});
