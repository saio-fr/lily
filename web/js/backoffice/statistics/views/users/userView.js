/*========================================
      ACTIVITIES/SKELETON VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('backoffice/app'),

      // Object wrapper returned as a module
      UserView;

  UserView = Backbone.View.extend({

    tagName: 'li',
    className: 'users-list-item',
    template: _.template($('#usersUserTpl').html()),

    events: {
      'click' : 'select'
    },

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.js-users-list');
      return this;
    },
    
    select: function (user) {
      $('.users-list-item').removeClass('active');
      this.$el.addClass('active');
      this.model.trigger('select', this.model);
    }

  });

  return UserView;
});
