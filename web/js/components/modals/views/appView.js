/*======================================
              MODAL APP
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),
      ModalLayoutView = require('components/modals/views/layoutView'),

      // Object wrapper returned as a module
      ModalApp;


  ModalApp = ModalLayoutView.extend({

    className: 'modal',

    template: _.template($('#modalAppTpl').html()),

    initialize: function() {
      ModalLayoutView.prototype.initialize.apply(this, arguments);
      this.childViews = new Backbone.ChildViewContainer();
    },

    remove: function() {
      var that = this;
      this.childViews.forEach(function(view) {
        // delete index for that view
        that.childViews.remove(view);

        // remove the view
        view.remove();
      });

      ModalLayoutView.prototype.remove.call(this);
    }
  });

  return ModalApp;
});
