/*======================================
      		MODAL DELETE
=======================================*/

'use strict';

var UserModule = UserModule || {};

UserModule.ModalDelete = Backbone.View.extend({

  id: 'delete',
  className: 'modal fade',
  template: _.template( $('#modal-delete').html()),

  initialize: function() {
    this.render();
  },

  render: function() {

    this.$el.html(this.template());
    this.$el.appendTo('#users');
    this.$el.attr({
      'tabindex': '-1',
      'role': 'dialog',
      'aria-labelledby': 'close',
      'aria-hidden': 'true'
    });
    this.$el.modal('show');

    return this;
  }

});
