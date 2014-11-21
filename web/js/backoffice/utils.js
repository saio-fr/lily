define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var Utils = {};

  Utils.closeModelView = function () {
    this.model = undefined;
    this.$el.empty();
    this.stopListening();
    return this;
  }

  Utils.closeCollectionView = function () {
    this.model = undefined;
    this.$el.empty();
    this.stopListening();
    return this;
  }

  return Utils;
});
