/* ===========================
          APP
   ========================== */

/*
** Main module: serves as namespace and EventBus
*/
define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = {};

  _.extend( app, Backbone.Events );

  return app;
});
