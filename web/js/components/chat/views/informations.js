/*========================================
      LIVE INFORMATIONS VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    // Object wrapper returned as a module
    InformationsView;

  InformationsView = Backbone.View.extend({

    tagName: 'aside',
    className: 'vbox bg-white aside-chat-right animated fadeInRight',
    template: _.template($('#liveInformationsTpl').html()),

    events: {
      'click .informations-header .icon-angle-right': 'reduce',
      'click .informations-header .icon-angle-left': 'expand',
      'focusout input': 'update'
    },

    initialize: function() {

      // Change the informations view if pages or questions changed
      this.listenTo(this.model, 'change:pages', this.render);
      this.listenTo(this.model, 'change:questions', this.render);

      this.render();
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.js-chat-container');

      app.liveChatSkeleton.showInformations ? this.extend() : this.reduce();

      return this;
    },

    reduce: function() {

      this.$el.find('.informations-header h5').addClass('hide');
      this.$el.find('.informations-section').addClass('hide');
      this.$el.find('.informations-header .icon-angle-right').addClass('hide');
      this.$el.find('.informations-header .icon-angle-left').removeClass('hide');
      this.$el.width('50');

      app.liveChatSkeleton.showInformations = false;
    },

    expand: function() {

      this.$el.find('.informations-header h5').removeClass('hide');
      this.$el.find('.informations-section').removeClass('hide');
      this.$el.find('.informations-header .icon-angle-right').removeClass('hide');
      this.$el.find('.informations-header .icon-angle-left').addClass('hide');
      this.$el.width('275');

      app.liveChatSkeleton.showInformations = true;
    },

    update: function(e) {

      this.firstname = this.$el.find('input[name="firstname"]').val();
      this.lastname = this.$el.find('input[name="lastname"]').val();
      this.email = this.$el.find('input[name="email"]').val();

      app.trigger("operator:updateInfos", {
        sid: this.model.get('id'),
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      });
    }

  });

  return InformationsView;
});
