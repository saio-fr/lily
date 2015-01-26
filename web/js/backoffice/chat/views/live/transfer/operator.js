/*======================================
          TRANSFER TO OPERATOR
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    Backbone = require('backbone'),
    _ = require('underscore'),

    // Object wrapper returned as a module
    TransferOperator;


  TransferOperator = Backbone.View.extend({

    tagName: 'li',
    className: 'list-group-item',

    events: {
      'click .media': 'select',
      'click .btn-danger': 'unselect',
      'click .btn-success': 'transfer'
    },

    initialize: function(options) {
      this.visitor = options.visitor;
      this.render();
    },

    render: function() {
      var template = _.template($('#modalTransferOperatorTpl').html());
      this.$el.html(template(this.model.toJSON()));
    },

    select: function() {
      this.$el.find('.media').addClass('hide');
      this.$el.find('.validate').removeClass('hide');
    },

    unselect: function() {
      this.$el.find('.media').removeClass('hide');
      this.$el.find('.validate').addClass('hide');
    },

    transfer: function() {
      var that = this;
      app.trigger('operator:transfer', that.visitor.get('id'), that.model.get('id'));
      this.visitor.trigger('minus');
    }

  });

  return TransferOperator;
});
