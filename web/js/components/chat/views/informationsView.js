/*========================================
      LIVE INFORMATIONS VIEW
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    SearchView = require('components/chat/views/search/searchView'),
    // Object wrapper returned as a module
    InformationsView;

  InformationsView = Backbone.View.extend({

    tagName: 'aside',
    className: 'vbox aside-chat-right',
    template: _.template($('#liveInformationsTpl').html()),

    events: {
      'click .informations-header .icon-angle-right': 'reduce',
      'click .informations-header .icon-angle-left': 'expand',
      'focusout input': 'update'
    },

    initialize: function() {

      this.render();

      this.$informationsPanel = this.$('.informations-panel');
      this.$searchPanel       = this.$('.search-panel');

      this.searchView = new SearchView();

      // Change the informations view if pages or questions changed
      this.listenTo(this.model,      'change:pages', this.render);
      this.listenTo(this.model,      'change:questions', this.render);
      this.listenTo(this.searchView, 'search:resize', this.adjustPanelHeight.bind(this));

      this.adjustPanelHeight();
      $(window).resize(_.debounce(this.adjustPanelHeight.bind(this), 200));
    },

    render: function() {

      this.$el.html(this.template(_.extend(this.model.toJSON(), {
        'prettifyUrl': this.prettifyUrl
      })));
      this.$el.appendTo('.js-chat-container');

      app.liveChatSkeleton.showInformations ? this.expand() : this.reduce();

      return this;
    },

    reduce: function() {

      this.$el.find('.informations-header h5').addClass('hide');
      this.$el.find('.search-panel , .informations-panel').addClass('hide');
      this.$el.find('.informations-header .icon-angle-right').addClass('hide');
      this.$el.find('.informations-header .icon-angle-left').removeClass('hide');
      this.$el.width('50');

      app.liveChatSkeleton.showInformations = false;
    },

    expand: function() {

      this.$el.find('.informations-header h5').removeClass('hide');
      this.$el.find('.search-panel , .informations-panel').removeClass('hide');
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
    },

    adjustPanelHeight: function() {
      if (!this.$searchPanel || !this.$searchPanel) { return; }

      this.$informationsPanel
        .height(this.$el.height() - 50 - this.$searchPanel .height());

      if (!this.$('.wrapper-search') || !this.$('.wrapper-search').hasClass('collapse') &&
        this.$informationsPanel[0].scrollHeight > this.$informationsPanel[0].clientHeight) {
        this.$informationsPanel.addClass('scrollable');
      } else {
        this.$informationsPanel.removeClass('scrollable');
      }
    },

    prettifyUrl: function(url) {
      var link = document.createElement('a'),
          prettyUrl = '';

      link.href = url;
      prettyUrl = link.hostname + link.pathname;

      return link.hostname + link.pathname;
    }
  });

  return InformationsView;
});
