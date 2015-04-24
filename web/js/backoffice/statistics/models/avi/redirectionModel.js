/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      RedirectionModel;


  RedirectionModel = Backbone.Model.extend({

    id: '',
    url: '/statistics/avi/redirections',

    initialize: function () {
    }

  });

  return RedirectionModel;
});

