/*========================================
      User Edit View
=========================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      utils = require('backoffice/utils'),
      UserModel = require('backoffice/users/models/useModel'),

      // Object wrapper returned as a module
      UserEditView;

  UserEditView = Backbone.View.extend({

    el: '#user-detail',
    template: _.template(
      $('#userEdit')
      .html()
      .replace(/<\\\/script/g, '</script')
    ),

    events: {
      'click .button-update': 'update',
      'click .button-cancel': 'cancel',
      'keyup input': 'checkIfValid',
      'submit #user-editor': 'noSubmit'
    },
    
    initialize: function () {
      Backbone.on('createNewUser', this.remove);
    },

    render: function () {

      if( $(document).find(this.$el).length === 0 ) {
        // parent view has been rebuild, we have to update our $el
        this.$el = $(this.__proto__.el);
        this.delegateEvents();
      }

      Backbone.trigger('userId:change', this.model.id);

      this.$el.removeClass('hide');
      this.$el.html(this.template(this.model.toJSON()));

      $('iframe#avatarWidget').load(function () {
        $('.loader').hide()
      });

      return this;
    },

    setModel: function (model) {

      var that = this;

      if ( this.model !== model ) {
        this.model = model;
        this.listenTo(this.model, 'destroy', this.remove);
        this.render();
        this.widget = this.$el.find('#avatarWidget');

        this.widget.load(function() {

          that.widget.contents().find('input').change(function() {
            that.changeAvatar();
          });
        });

      }

      return this;
    },

    changeAvatar: function () {
      this.widget.contents().find('#avatarWidgetForm').submit();
    },

    // TODO: Look into a better way to do that kind of data binding... OR/AND
    // Break into multiple subFunctions
    update: function (e) {

      if (this.model.get('id') === undefined) {
        $('#user-editor').jsFormValidator('validate', { recursive:true });
      }

      if( $('#user-editor')[0].jsFormValidator.isValid() ) {

        // Dirty Selectors for form inputs
        var classicInputs = $('#user-editor input:not([type="checkbox"]):not([type="password"]):not([name="avatar"]'),
            multipleChoicesInputs = $('#user-editor .dropdownSelect'),
            passwordInputFirst = $('#lily_userbundle_user_plainPassword_first'),
            passwordInputSecond = $('#lily_userbundle_user_plainPassword_second'),
            avatarUrl;

        // Fill model with values from classic inputs
        for ( var i = 0; i < classicInputs.length; i++ ) {
          this.model.set(classicInputs.eq(i).attr('name'), classicInputs.eq(i).val());
        }

        // Fill model with values from multiple choice inputs
        for ( var i = 0; i < multipleChoicesInputs.length; i++ ) {

          var multipleValues = [],
              multipleChoices = multipleChoicesInputs.eq(i).find(':checked');

          for ( var j = 0; j < multipleChoices.length; j++ ) {
            multipleValues.push(multipleChoices.eq(j).attr('name'));
          }

          this.model.set(multipleChoicesInputs.eq(i).data('name'), multipleValues);
        }

        // Fill model with avatar url
        avatarUrl = $('iframe#avatarWidget')
        .contents()
        .find('input#lily_userbundle_user_avatar')
        .val(); // au format url("url") ou url("data:@@;")

        this.model.set('avatar', avatarUrl);

        // Same with password
        this.model.set('plainPassword', {
          'first': passwordInputFirst.val(),
          'second': passwordInputSecond.val()
        });

        if ( this.model.get('id') === undefined ) {
          UserModule.listUser.create(this.model, { wait: true });

        } else {
          this.model.url = "/rest/"+this.model.get('id');
          this.model.save();
        }

        this.model.trigger('render');

        $('#user-list .active').removeClass('active');
        this.remove();

      }

      return this;
    },

    cancel: function () {
      $('#user-list .active').removeClass('active');
      this.remove();
    },

    noSubmit: function (e) {

      e.preventDefault();
      return this;
    },

    checkIfValid: function (e) {

      e.target.jsFormValidator.validate();
      return this;
    },

    remove: function () {
      Backbone.trigger('userId:change', this.model.id);
      this.$el.addClass('hide');
      this.close();
    },

    close: function () {
      Backbone.off('createNewUser', this.remove);
      utils.closeModelView();
    }
  });

  return UserEditView;
});

