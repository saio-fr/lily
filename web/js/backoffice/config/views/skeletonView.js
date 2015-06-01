/*======================================
             SKELETON VIEW
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),

    // Object wrapper returned as a module
    Skeleton;

  Skeleton = Backbone.View.extend({

    tagName:  'section',
    className: 'vbox',
    template: _.template($('#skeletonTpl').html()),

    events: {
      'click #save': 'save'
    },

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      this.$el.appendTo('.js-app');
    },

    save: function() {

      // Call the children view to set new model attributes
      this.globalView.update();

      if (globals.client.avi) this.aviView.update();
      if (globals.client.chat) this.chatView.update();

      this.model.save(null, {
        success: function() {
          app.createModal.alert(globals.modalAlert.configSucess, 3000);
        }
      });
    }

  });

  return Skeleton;
});
