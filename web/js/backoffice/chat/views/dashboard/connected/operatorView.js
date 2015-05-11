/*========================================
      DASHBOARD CONNECTED OP VIEW
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),

      // Object wrapper returned as a module
      OperatorView;

  OperatorView = Backbone.View.extend({
  
  	tagName: 'li',
  	className: 'list-group-item',
    template: _.template($('#dashboardConnectedOperatorTpl').html()),

    events: {
    },

    initialize: function() {
      this.render();
      this.listenTo(this.model, 'remove', this.remove);
      this.listenTo(this.model, 'change', this.render);
    },
    
    render: function () {
	    this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return OperatorView;
});
