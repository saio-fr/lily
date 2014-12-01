/*======================================
             GLOBAL VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),

    // Object wrapper returned as a module
    GlobalView;

  GlobalView = Backbone.View.extend({

    tagName: "section",
    className: "tab-pane active",
    id: "global",
    template: _.template($('#globalTpl').html()),

    initialize: function () {
      this.render();
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.tab-content');
    },

    update: function () {

    }

  });
  return GlobalView;
});