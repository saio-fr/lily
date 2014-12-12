/*========================================
      ACTIVITIES CHAT DETAILS VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      DetailsView;

  DetailsView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#activitiesChatsDetailsTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      this.$el.appendTo('.conversation-details');
    },
    
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
    }

  });

  return DetailsView;
});
