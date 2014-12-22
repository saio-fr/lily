/*================================
          MODEL STATISTICS
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),

      // Object wrapper returned as a module
      MediaModel;


  MediaModel = Backbone.Model.extend({

    id: '',
    url: '/media',

    initialize: function () {
    }

  });

  return MediaModel;
});

