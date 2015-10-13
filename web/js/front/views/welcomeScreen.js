/* ===========================
    	Chat welcome screen
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _      = require('underscore'),
    Models   = require('front/data/models'),
    PageView = require('front/views/page'),
    config   = require('front/globals'),
    app      = require('front/app'),
    // Object wrapper returned as a module
    ChatWelcomeScreen;

  ChatWelcomeScreen = PageView.extend({

    events: {
      'click .js-submit-welcome-form': 'chat',
      'click .lily-skip-link': 'chat',
    },

    model: Models.Mail,
    template: _.template($('#lily-page-chat-welcome-screen').html()),

    initialize: function() {

      this.errors = {};
      this.errors.firstname = false;
      this.errors.lastname = false;
      this.errors.email = false;
      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
    },

    render: function() {

      this.$el.html(this.template());
      return PageView.prototype.render.apply(this, arguments);
    },

    chat: function() {

      var $labeFirst = this.$el.find('label.firstname'),
        $inputFirst = this.$el.find('input#firstname'),
        $labeLast = this.$el.find('label.lastname'),
        $inputLast = this.$el.find('input#lastname'),
        $labeMail = this.$el.find('label.email'),
        $inputMail = this.$el.find('input#email'),

        firstName = $inputFirst.val() || null,
        lastName = $inputLast.val() || null,
        email = $inputMail.val() || null;

      if (!config.chat.contactFormAvoidable) {
        if (config.chat.contactFirstNameField) {
          if (firstName === null) {
            $labeFirst.show();
            $inputFirst.addClass('warning');
            this.errors.firstname = true;
          } else {
            $inputFirst.removeClass('warning');
            $labeFirst.hide();
            this.errors.firstname = false;
          }
        }
        if (config.chat.contactLastNameField) {
          if (lastName === null) {
            $labeLast.show();
            $inputLast.addClass('warning');
            this.errors.lastname = true;
          } else {
            $inputLast.removeClass('warning');
            $labeLast.hide();
            this.errors.lastname = false;
          }
        }
        if (config.chat.contactEmailField) {
          if (email === null) {
            $labeMail.show();
            $inputMail.addClass('warning');
            this.errors.email = true;
          } else {
            $inputMail.removeClass('warning');
            $labeMail.hide();
            this.errors.email = false;
          }
        }
      }

      if (this.errors.firstname || this.errors.lastname || this.errors.email) {
        return;
      }

      var returnValues = {};
      if (firstName) returnValue.firstName = firstName;
      if (lastName) returnValue.lastName = lastName;
      if (email) returnValue.email = email;

      if (email || firstName || lastName) {
        app.trigger('welcomeScreen:submit', {
          firstName: firstName,
          lastName: lastName,
          email: email
        });
      } else if (config.chat.contactFormAvoidable) {
        app.showContactForm = false;
        app.router.navigate('chat', {
          trigger: true
        });
      }
    }

  });

  return ChatWelcomeScreen;
});
