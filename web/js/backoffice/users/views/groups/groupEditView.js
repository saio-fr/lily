/*========================================
      Group Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      app = require('backoffice/app'),
      utils = require('utils/default'),
      validation = require('utils/backbone-validation'),

      // Object wrapper returned as a module
      GroupEditView;

  GroupEditView = Backbone.View.extend({

    className: 'vbox',
    template: _.template($('#groupsEditTpl').html()),

    events: {
      'submit': 'noSubmit',
      'click .button-update': 'update',
      'keypress' : 'updateOnEnter',
      'click .button-cancel': 'close'
    },

    initialize: function () {

      Backbone.Validation.bind(this);

      app.on('closeEditView', _.bind(this.close, this));
      this.listenTo(this.model, 'destroy', this.close);

      this.render();
    },

    render: function () {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('.group-edit');
      $('.group-edit').removeClass('hide');

      return this;
    },

    update: function () {
      
      var that = this;

      var name = $('input[name="name"]').val();

      this.model.set({
        'name' : name,
      });

      if (this.model.isValid(true)) {

        app.skeletons.groups.collection.create(this.model, {
          wait: true,
          success: function (model) {
            that.close();
          }
        });
      }
    },
       
    updateOnEnter: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.update();
      }
    },

    noSubmit: function (e) {
      e.preventDefault();
    },

    close: function () {
      $('.js-groups-list .active').removeClass('active');
      $('.group-edit').addClass('hide');
      Backbone.Validation.unbind(this);
      this.remove();
    }

  });

  return GroupEditView;
});

