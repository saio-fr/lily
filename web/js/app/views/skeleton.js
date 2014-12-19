/* ===========================
    Chat Visitor Message View
   ========================== */

define(function (require) {

'use strict';

// Require CommonJS like includes
var _ = require('underscore'),
    Backbone = require('backbone'),
    Router = require('app/router'),
    config = require('app/globals'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    Skeleton;

Skeleton = PageView.extend({

  initialize: function () {
    this.router = new Router();
  },

});

return Skeleton;
});
