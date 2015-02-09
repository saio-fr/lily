/*========================================
          CATEGORIES EDIT
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),

    // Object wrapper returned as a module
    EditView;

  EditView = Backbone.View.extend({

    tagName: "section",
    className: "vbox",

    template: _.template($('#categoriesEditTpl').html()),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
    },

    initialize: function() {
    },

    render: function() {
    },

    update: function() {
    },

    cancel: function() {
      this.hide();
      this.remove();
    }
    
  });

  return EditView;
});
