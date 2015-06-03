/*======================================
              Group VIEW
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var app = require('app'),
      globals = require('globals'),
      GroupEditView = require('backoffice/users/views/groups/groupEditView'),

      // Object wrapper returned as a module
      GroupView;

  GroupView = Backbone.View.extend({

    tagName:  "li",
    className: "list-group-item hover animated bounceInLeft",
    template: _.template($('#groupTpl').html()),

    events: {
      'click .destroy' : 'destroy',
      'click' : 'edit'
    },
    
    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.render();    
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    destroy: function (e) {

      e.stopPropagation();
      
      var that = this;
      
      var modal = app.createModal.confirm(globals.modalConfirm.groupTrash);
      modal.promise.then(function (res) {
        if (res) {
          this.model.destroy();
          this.remove();          
        }
      }.bind(this));
    },

    edit: function() {
      app.trigger('closeEditView', this);
      app.skeleton.editView = new GroupEditView({
        model: this.model
      });

      this.$el.parent().find('li.active').removeClass('active');
      this.$el.addClass('active');
      return this;
    }
    
  });

  return GroupView;
});
