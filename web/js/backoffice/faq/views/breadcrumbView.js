/*======================================
    Vue BREADCRUMB
  =========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('app'),

      // Object wrapper returned as a module
      BreadcrumbView;

  BreadcrumbView = Backbone.View.extend({

    tagName:  "li",

    template: _.template($('#breadcrumbView').html()),

    events: {
      'click' : 'navigate',
    },

    initialize: function () {

      this.listenTo(this.model, 'remove', this.remove);
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    navigate: function () {

      app.router.navigate(this.model.get('link'), {
        trigger: true
      });
    }

  });

return BreadcrumbView;
});