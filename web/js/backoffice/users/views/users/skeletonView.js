/*========================================
      FOOTER USERS VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      g = require('globals'),

      // Object wrapper returned as a module
      FooterView;

  FooterView = Backbone.View.extend({

    el: '.js-users-container',
    template: _.template($('#skeletonTpl').html()),

    initialize: function() {
      this.render();
    },
    
    render: function () {
      this.$el.append(this.template());
      this.checkMaxUsers();
      return this;
    },
    
    checkMaxUsers: function() {
      if( this.collection.length >= g.maxusers ) {
        $('.max-users-reached-alert').show();
        $('.add-user').hide();
      } else {
        $('.max-users-reached-alert').hide();
        $('.add-user').show();
      }

      this.counter = this.collection.length +
        (this.collection.length <= 1 ? " compte" : " comptes") +
        " sur " + g.maxusers +
        (g.maxusers <= 1 ? " disponible" : " disponibles");

      $('.users-counter').text(this.counter);

    },
    
  });

  return FooterView;
});
