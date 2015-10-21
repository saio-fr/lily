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
      Validate = require('validate'),

    // Object wrapper returned as a module
    MailPage;

  MailPage = PageView.extend({

    submitStatusTime : 1500,
    submitionStatus: 0,

    events: {
      'click .btn-close': 'goBack',
      'click .btn-submit': 'onFormSubmit',
      'focus .form-date': 'onFocusDate',
    },

    model: Models.Mail,
    template: _.template($('#lily-page-mail-template').html()),

    initialize: function() {
      var that = this;

      $(this.render({ page: true }).el).appendTo('#lily-wrapper-page');
      this.errors = {};

      this.$submitButton = $('.btn-submit');
      this.$inputDate = $('.form-date');

      this.setupForm();
      this.prepareSendingButton();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return PageView.prototype.render.apply(this, arguments);
    },

    setupForm: function() {
      var that = this;

      // Validate doesn't support AMD. Get it from the window object
      this.validator = new window.FormValidator('contact_form', [{
        name: 'visitor_email',
        rules: 'valid_email|required'
      }, {
        name: 'message_object',
        rules: 'alpha_numeric|required'
      }, {
        name: 'message_content',
        rules: 'alpha_numeric|required'
      }], function(errors, event) {
        if (errors.length > 0) {
          // Show the errors
          var errorMsg = '';
          _.forEach(errors, function(error) {
            errorMsg += (error.message + '\n');
          });
          app.showInfo("error", errorMsg);
        }
      });
    },

    onFocusDate: function() {
      if (this.datePicker) {
        return;
      }

      this.datePicker = new Pikaday({
        field: this.$inputDate[0],
        onSelect: this.onDateSelect.bind(this)
      });
    },

    onDateSelect: function(date) {
      this.$inputDate.val(moment(date).format('Do MMMM YYYY'));
    },

    onFormSubmit: function(ev) {
      this.startSubmitButtonProgress();
      this.send({
        'mail': 'coucou@coucou.com'
      });
    },

    send: function(fields) {
      var that = this;

      api.sendMail(fields).then(function(res) {
        // app.showInfo("success", config.mail.mailSentMsg);
        that.submitionStatus = 1;
        that.isSubmitionComplete = true;

        setTimeout(function() {
          app.router.navigate('home', {
            trigger: true
          });
        }, 800);
      }, function(err) {
        that.submitionStatus = -1;
        that.isSubmitionComplete = true;
        app.showInfo("error", config.mail.mailSentError);
      });
    },

    showErrors: function(errors) {

    },

    startSubmitButtonProgress: function() {
      var that = this;
      this.$submitButton.attr('disabled', '');
      this.$progressInnerEl.removeClass('notransition');
      this.$submitButton.addClass('state-loading');

      setTimeout(function() {
        var progress = 0;
        var interval = setInterval(function() {
          progress = Math.min( progress + Math.random() * 0.1, 1 );
          _setProgress( progress );

          if (progress === 1 || that.isSubmitionComplete) {
            that.stopSubmitButtonProgress(that.submitionStatus || 1);
            clearInterval(interval);
          }
        }, 200);
      }, 0);

      function _setProgress(progress) {
        that.$progressInnerEl.css('width', 100 * progress + '%');
      }
    },

    stopSubmitButtonProgress: function(status) {
      var that = this;

      setTimeout(function() {
        // fade out progress bar
        that.$progressInnerEl.css('opacity', '0');

        var onEndTransFn = function(ev) {
          if (config.supportTransitions && ev.propertyName !== 'opacity' ) return;
          that.$progressInnerEl
            .off(config.transEndEventName, onEndTransFn);
          that.$progressInnerEl
            .addClass('notransition')
            .css({
              'width': '0%',
              'opacity': '0'
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
      }, 100);
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
    },

    goBack: function() {
      return window.history.back();
    },

    remove: function() {
      if (this.datePicker && this.datePicker.destroy) {
        this.datePicker.destroy();
      }

      Backbone.View.prototype.remove.apply(this);
    }

  });

  return MailPage;
});
