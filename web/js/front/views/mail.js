/* ===========================
        Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _        = require('underscore'),
      app      = require('front/app'),
      config   = require('front/config'),
      Models   = require('front/data/models'),
      api      = require('front/data/api'),
      PageView = require('front/views/page'),
      moment   = require('moment'),
      momentFr = require('moment-fr'),
      Pikaday  = require('pikaday'),
      Validation = require('backbone-validation');

  // Object wrapper returned as a module
  var MailPage = PageView.extend({

    submitStatusTime : 1500,
    submitionStatus: 0,

    events: {
      'click .btn-close': 'goBack',
      'click .btn-submit': 'onSubmitButtonClick',
      'submit .lily-contact-form': 'onSubmitEvent',
      'keypress input.form-input': 'onSubmitEvent',
      'focus .form-date': 'onFocusDate',
      'click .redirection-type-switch-wrapper input': 'onRedirectionTypeChange'
    },

    model: Models.Mail,
    template: _.template($('#lily-page-mail-template').html()),

    initialize: function() {
      var that = this;

      this.listenTo(this, 'page:transitionnedIn', this.setupForm);
      this.listenTo(this.model, 'change:isRedirectionTel', this.onRedirectionTypeChanged);

      $(this.render({ page: true }).el).appendTo('#lily-wrapper-page');
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return PageView.prototype.render.apply(this, arguments);
    },

    setupForm: function() {
      var that = this;

      this.$submitButton = this.$('.btn-submit');
      this.$form = this.$('.lily-contact-form');
      this.$inputDate = this.$('.form-date');

      this.$redirectionTypeSwitch = $('.redirection-type-switch-wrapper input');

      this.prepareSendingButton();

      Backbone.Validation.bind(this, {
        valid: that.onFormValid.bind(that),
        invalid: that.onFormInvalid.bind(that),
        attributes: function(view) {
          if (that.model.get('isRedirectionTel')) {
            return ['tel', 'date', 'time', 'message'];
          }
          return ['email', 'message'];
        }
      });

      // Not so nice, but backbone-validation requires the validation config object
      // to be a property of the model, not a model attribute.
      // We want to pass the whole config object to the model, including validation,
      // and not have any config in the model declaration.
      // So we have to do the following:
      this.model.validation = this.model.get('validation');

      _.extend(Backbone.Validation.messages, this.model.get('validationMessages'));
    },

    onRedirectionTypeChange: function(ev) {
      this.model.set('isRedirectionTel', ev.currentTarget.checked || false);
    },

    onRedirectionTypeChanged: function() {
      this.render();
      this.transitionIn();
    },

    onSubmitEvent: function(ev) {
      if (ev.which === 13 || ev.type === 'submit') {
        ev.preventDefault();
        this.onSubmitButtonClick();
      }
    },

    onSubmitButtonClick: function(ev) {
      var that = this;

      var data = this.$form.serializeObject();
      this.model.set(data);

      if(this.model.isValid()){

        this.send(data);
        this.startSubmitButtonProgress();
      } else {
        this.hasValidationError = true;
        this.stopSubmitButtonProgress(-1);

        $('.lily-page').scrollTop(this.$form[0].scrollHeight);
      }
    },

    send: function(fields) {
      var that = this;

      that.submitionStatus = -1;
      that.isSubmitionComplete = false;

      api.sendMail(fields).then(function(res) {
        that.submitionStatus = 1;
        that.isSubmitionComplete = true;

        setTimeout(function() {
          app.router.navigate('home', {
            trigger: true
          });
        }, 800);
      }, function(err) {
        that.isSubmitionComplete = true;
      });
    },

    onFormValid: function(view, attr) {
      var $el = view.$('[name=' + attr + ']'),
          $group = $el.closest('.contact-form-item');

      $group
        .addClass('is-valid')
        .removeClass('is-invalid')
        .find('.validation-error-inline')
        .html('');
    },

    onFormInvalid: function(view, attr, error) {
      var $el = view.$('[name=' + attr + ']'),
          $group = $el.closest('.contact-form-item');

      $group
        .removeClass('is-valid')
        .addClass('is-invalid')
        .find('.validation-error-inline')
        .html(error);
    },

    onFocusDate: function() {
      if (this.datePicker) {
        return;
      }

      this.datePicker = new Pikaday({
        field: this.$inputDate[0],
        onSelect: this.onDateSelect.bind(this),
        i18n: config.dateFr
      });
    },

    onDateSelect: function(date) {
      this.$inputDate.val(moment(date).format('Do MMMM YYYY'));
    },


    prepareSendingButton: function() {
      var content = this.$submitButton.html();

      var $textEl = $('<span></span>')
        .addClass('content')
        .html(content);

      var $progressEl = $('<span></span>')
        .addClass('progress');

      var $progressInnerEl = $('<span></span>')
        .addClass('progress-inner')
        .appendTo($progressEl);

      // clear content
      this.$submitButton.html('');
      this.$submitButton
        .append($textEl)
        .append($progressEl);

      // the element that serves as the progress bar
      this.$progressInnerEl = $progressInnerEl;

      this.$submitButton.removeAttr('disabled');

      this.isButtonReady = true;
    },

    startSubmitButtonProgress: function() {
      var that = this;

      this.$submitButton.attr('disabled', '');
      this.$progressInnerEl.removeClass('notransition');
      this.$submitButton.addClass('state-loading');

      setTimeout(function() {
        var progress = 0;
        var interval = setInterval(function() {
          progress = Math.min(progress + Math.random() * 0.1, 1);
          that._setProgress(progress);

          if (progress === 1 || that.isSubmitionComplete) {
            that._setProgress(1);
            that.stopSubmitButtonProgress(that.submitionStatus || 1);
            clearInterval(interval);
          }
        }, 200);
      }, 0);
    },

    stopSubmitButtonProgress: function(status) {
      var that = this;

      setTimeout(function() {
        // fade out progress bar
        that.$progressInnerEl.css('opacity', '0');

        var onEndTransFn = function(ev) {
          if (config.supportTransitions &&
            ev.originalEvent.propertyName !== 'opacity') {
            return;
          }
          that.$progressInnerEl
            .off(config.transEndEventName, onEndTransFn);
          that.$progressInnerEl
            .addClass('notransition')
            .css({
              'width': '0%',
              'opacity': '1'
            });
        };

        if (config.supportTransitions) {
          that.$progressInnerEl
            .on(config.transEndEventName, onEndTransFn);
        } else {
          onEndTransFn.call();
        }

        // add class state-success to the button
        if (typeof status === 'number') {
          var statusClass = status >= 0 ?
            'state-success' : 'state-error';
          that.$submitButton.addClass(statusClass);

          // after options.statusTime remove status
          setTimeout( function() {
            that.$submitButton.removeClass(statusClass);
            that.$submitButton.removeAttr('disabled');
          }, that.submitStatusTime);
        } else {
          this.$submitButton.removeAttr('disabled');
        }

        // remove class state-loading from the button
        that.$submitButton.removeClass('state-loading');
        that._setProgress(0);
      }, 100);
    },

    _setProgress: function(progress) {
      this.$progressInnerEl.css('width', 100 * progress + '%');
    },

    goBack: function() {
      return window.history.back();
    },

    remove: function() {
      if (this.datePicker && this.datePicker.destroy) {
        this.datePicker.destroy();
      }

      Backbone.Validation.unbind(this, {
        model: this.model
      });

      Backbone.View.prototype.remove.apply(this);
    }

  });

  return MailPage;
});
