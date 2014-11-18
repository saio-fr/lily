'use strict';

var UserModule = {},
    app,
	AppRouter = require('router');

UserModule.closeModelView = function () {
  this.model = undefined;
  this.$el.empty();
  this.stopListening();
  return this;
}

UserModule.closeCollectionView = function () {
  this.model = undefined;
  this.$el.empty();
  this.stopListening();
  return this;
}

$(function () {
  $.ajaxPrefilter( function (options) {
    options.url = root + options.url;
  });
});

// Start app router
//
app = new UserModule.AppRouter();
Backbone.history.start();
