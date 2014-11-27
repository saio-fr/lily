define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var Backbone = require('backbone'),
      Utils = {};

  Utils.closeModelView = function (context) {

    // COMPLETELY UNBIND THE VIEW
    context.undelegateEvents();

    context.$el.removeData().unbind();

    context.stopListening();
    context.$el.empty();
  };

  Utils.closeCollectionView = function (context) {

    // COMPLETELY UNBIND THE VIEW
    context.undelegateEvents();

    context.$el.removeData().unbind();

    context.stopListening();
    context.$el.empty();
  };

  return Utils;
});
