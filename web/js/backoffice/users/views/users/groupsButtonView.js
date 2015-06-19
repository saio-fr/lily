/*======================================
          GROUPS BUTTON VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),

      // Object wrapper returned as a module
      GroupsButtonView;

  GroupsButtonView = Backbone.View.extend({

    el: '.btn-group.groups-widget',
    template: _.template($('#usersGroupsButtonTpl').html()),

    events: {
    },
    
    initialize: function () {
      this.listenTo(app, 'users:groups:select', this.select);
      this.listenTo(this.collection, 'add', this.render);
      this.listenTo(this.collection, 'change', this.render);
      this.listenTo(this.collection, 'remove', this.render);
      this.render();    
    },

    render: function () {
      this.$el.html(this.template({groups: this.collection.toJSON()}));
      return this;
    },
    
    select: function (id) {
      this.$el.find('input[data-id='+id+']').prop('checked', true);
    }
    
  });

  return GroupsButtonView;
});
