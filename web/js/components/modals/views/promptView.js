/*======================================
          MODAL PROMPT
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      _ = require('underscore'),
      ModalLayoutView = require('components/modals/views/layoutView'),

      // Object wrapper returned as a module
      ModalPrompt;


  ModalPrompt = ModalLayoutView.extend({

    className: 'modal',
    template: _.template($('#modalPromptTpl').html()),

    initialize: function() {
      this.render();
      this.open();
    },

    render: function() {

      this.$el.html(this.template(this.model.toJSON()));
      this.$el.appendTo('body');
      return this;
    },

    remove: function() {
      this.model.destroy();
      Backbone.View.prototype.remove.apply(this, arguments);
    }
  });

  return ModalPrompt;
});
