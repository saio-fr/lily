/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone  = require('backbone'),
    Router      = require('front/router'),
    config      = require('front/config'),
    Snap        = require('Snap'),
    app         = require('front/app'),
    Collections = require('front/data/collections'),
    PageView    = require('front/views/page'),

    // Object wrapper returned as a module
    Skeleton;

  Skeleton = PageView.extend({

    className: 'app-wrapper',
    template: _.template($('#lily-base-template').html()),

    initialize: function() {
      this.render();

      if (config.isMobile) {
        this.initRouter();
      }

      this.listenTo(app, 'app:isShown', this.initRouter);
      this.messages = new Collections.Messages();

      /***********************
      MENU (Snap.js)
      ***********************/

      // Snap is global on the window object
      var snapper = new window.Snap({
        element: document.getElementById('lily-wrapper-page'),
        disable: 'right',
        slideIntent: 30,
        minDragDistance: 50,
        touchToDrag: false,
        maxPosition: 230,
        minPosition: -230,
        transitionSpeed: 0.25,
        easing: 'cubic-bezier(0.28, 0.33, 0, 1.41)'
      });

      $('.app-wrapper').on('click', '.lily-bt-menu', function() {
        if (snapper.state().state === 'left') {
          snapper.close();
        } else {
          snapper.open('left');
          app.track.click('Openned menu by clicking the hamburger button');
        }
      });

      $('#lily-wrapper-page').on('click', function() {
        if (snapper.state().state === 'left') {
          snapper.close();
        }
      });

      $('.lily-menu-body li a').click(function() {
        snapper.close();
      });

      $('#lily-toolbar-icons').click(function() {
        app.onReduceClick();
      });

      // Event listener for mobile
      if (config.isMobile.phone) {
        $('#icon-iframe-close').click(function() {
          open('/', '_self').close();
        });

        $('#icon-iframe-fullscreen').css('display', 'none');
      }
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');
      return this;
    },

    initRouter: function() {
      if (!app.router) {
        app.router = new Router();
        Backbone.history.start();
      }
    }

  });

  return Skeleton;
});
