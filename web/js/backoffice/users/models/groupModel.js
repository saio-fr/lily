/*================================
          MODEL GROUP
=================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var NestedModel = require('backbone-nested'),
      moment = require('moment'),
      g = require('config'),

      // Object wrapper returned as a module
      GroupModel;


  GroupModel = Backbone.NestedModel.extend({

    defaults: {
      'name'  : 'Nouveau groupe',
      'color' : '#4c5566'
    },

    validation: {
      'name': {
        required: true,
        msg: 'Veuillez renseiger un nom'
      }
    },

    initialize: function () {
      this.urlRoot = "/groups";
    }
  });

  return GroupModel;
});

