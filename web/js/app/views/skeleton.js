/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Router = require('app/router'),
    config = require('app/globals'),
    app = require('app/app'),
    Collections = require('app/data/collections'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    Skeleton;

  Skeleton = PageView.extend({

    initialize: function() {
      app.router = new Router();
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
      });

      $('#lily-wrapper-page').on('click', '.lily-bt-menu', function() {
        if (snapper.state().state === "left") {
          snapper.close();
        } else {
          snapper.open('left');
        }

      });

      $('.lily-menu-body li a').click(function() {
        snapper.close();
      });

      $('.lily-icon-reduce').click(function() {
        app.onReduceClick();
      });

      // Event listener for mobile
      if (config.isMobile.phone) {
        $('#icon-iframe-close').click(function() {
          open("/", '_self').close();
        });
        $('#icon-iframe-fullscreen').css('display', 'none');
      }
    },

  });

  return Skeleton;
});
