/*======================================
             GLOBAL VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('backoffice/app'),
    g = require('config'),

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

      // MAINTENANCE
      this.maintenance = !$('input[name="maintenance"]').is(':checked');
      this.model.set({'maintenance': this.maintenance});

      // CHAT SERVICE
      if (g.client.chat) {
        this.chat = this.$el.find('input[name="chat"]').is(':checked');
        this.model.set({'chat.active': this.chat});
      }

      // AVI SERVICE
      if (g.client.avi) {
        this.avi = this.$el.find('input[name="avi"]').is(':checked');
        this.model.set({'avi.active': this.avi});
      }

      // APP HOME PAGE
      if (g.client.chat && g.client.avi) {
        if ( this.$el.find('input[name="home"]').is(':checked') ) this.home = 'chat';
        else this.home = 'avi';
      } else {
        if (g.client.avi) { this.home = 'avi'; }
        if (g.client.chat) { this.home = 'chat'; }
      }
      this.model.set({'home': this.home});

    }

  });
  return GlobalView;
});
