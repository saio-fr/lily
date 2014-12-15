/*========================================
      Redirection Collection View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      RedirectionItemView = require('backoffice/redirection/views/redirectionItemView'),
      ChildViewContainer = require('utils/backbone-childviewcontainer'),

      // Object wrapper returned as a module
      CollectionView;

  CollectionView = Backbone.View.extend({

    el: '#redirection',

    events: {
      'click #redirection-new': 'add',
    },

    initialize: function (collection) {
      this.collection = collection;
      this.childViews = new Backbone.ChildViewContainer();
      this.render();
    },

    render: function () {

      this.collection.each(function (item) {
        this.show(item);
      }, this);

      return this;
    },

    show: function (item) {

      var redirectionView = new RedirectionItemView({
        model: item
      });

      this.childViews.add(redirectionView);

      this.$el
        .find('#redirections-list')
        .append( redirectionView.render().el );
    },

    add: function () {

      var model = this.collection.create({
        "title": "Nouvelle redirection",
        "frequency": 0,
        "phone": "+33 4 00 00 00 00",
        "mail": "Email@exemple.com",
        "object":"Objet du mail"
      }, {
        wait:true
      });

      this.show(model);
    },

    closeChildren: function () {
      var self = this;
      this.childViews.forEach(function (view){
        // delete index for that view
        self.childViews.remove(view);
        // remove the view
        view.remove();
      });
    },

  });

  return CollectionView;
});

