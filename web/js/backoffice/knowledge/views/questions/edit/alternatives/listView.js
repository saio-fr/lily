/*========================================
          ALTERNATIVES EDIT LIST
=========================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app'),
    globals = require('globals'),
    when = require('when'),
    Models = require('backoffice/knowledge/data/models'),
    ChildViewContainer = require('utils/backbone-childviewcontainer'),
    AlternativeItemView = require('backoffice/knowledge/views/questions/edit/alternatives/itemView'),

    // Object wrapper returned as a module
    ListView;

  ListView = Backbone.View.extend({

    el: '.js-alternatives',

    events: {
      'click .add-alternative' : 'create'
    },

    initialize: function() {
      
      this.childViews = new Backbone.ChildViewContainer();
      this.listenTo(app, 'remove:alternativeView', this.removeChildView);
      this.render();
    },

    render: function() {
      var that = this
      var alternatives = this.model.get('alternatives');
      
      $.each(alternatives, function (index, alt) {
        console.log(alt);
        that.add(alt);
      });

      return this;
    },
    
    create: function () {
      this.add();
    },
      
    add: function (alt) {
      console.log(alt);
      var model = new Models.AlternativeQuestion();
      if (alt) {
        model.set(alt);
      }
      var altView = new AlternativeItemView({
        model: model
      });
      $('.js-alternatives-list').append(altView.render().el);
      this.childViews.add(altView);
    },

    update: function () {
      var that = this;
      var alternatives = [];
      
      this.childViews.forEach(function(view) {
        alternatives.push(view.model.toJSON());
      });
      console.log(alternatives);
      this.model.set({
        alternatives: alternatives
      });
      
      return when(this.model.get('alternatives'));
    },
    
    removeChildView: function (view) {
      
      var childView = this.childViews.findByCid(view.cid);
      
      if (typeof(childView) !== 'undefined') {
        this.childViews.remove(childView);
        childView.remove();
      }
    },

    
    remove: function () {
      
      var that = this;
      
      this.childViews.forEach(function (view) {
        // delete index for that view
        that.childViews.remove(view);
        // remove the view
        view.remove();
      });
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return ListView;
});
