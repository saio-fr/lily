/*======================================
              USER VIEW
=======================================*/

'use strict';

var UserModule = UserModule || {};

UserModule.UserView = Backbone.View.extend({

  tagName:  "li",
  className: "list-group-item hover",
  template: _.template($('#user').html()),

  events: {
    'click .destroy': 'destroy',
    'click .view'   : 'edit'
  },

  setModel:function (model) {

    if ( this.model !== model ) {
      this.model = model,
        this.listenTo(this.model, 'select', this.select);
      this.listenTo(this.model, 'render', this.render);
      this.render();
    }

    return this;
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSONWithComputedValues()));
    return this;
  },

  destroy: function (e) {

    e.stopPropagation();

    new UserModule.ModalDelete();

    var that = this;

    $('.modal-close-confirm').click(function() {

      that.model.url = "/rest/" + that.model.id;
      that.model.destroy();
      that.remove();

    });

  },

  edit: function(e) {
    e.preventDefault();
    e.stopPropagation();
    var id = $(e.currentTarget).parent().data("id");

    if ( typeof(UserModule.userEditView) === "undefined" ) {
      UserModule.userEditView = new UserModule.UserEditView();
    }

    UserModule.userEditView.setModel(this.model)

    this.$el.parent().find('li.active').removeClass('active');
    this.$el.addClass('active');
    return this;
  },

  close: UserModule.closeModelView,
});
