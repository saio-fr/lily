/* ===========================
        Faq Page
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    app = require('app/app'),
    config = require('app/globals'),
    Models = require('app/data/models'),
    api = require('app/data/api'),
    PageView = require('app/views/page'),
    // Object wrapper returned as a module
    MailPage;

  MailPage = PageView.extend({

    events: {
      'click button': 'send',
    },

    model: Models.Mail,
    template: _.template($('#lily-page-mail-template').html()),

    initialize: function() {
      $(this.render({
        page: true
      }).el).appendTo('#lily-wrapper-page');
      this.errors = {};
    },

    render: function() {
      this.$el.html(this.template());
      return PageView.prototype.render.apply(this, arguments);
    },

    send: function() {

      this.from = this.$el.find('#from').val() || null;
      this.object = this.$el.find('#object').val() || null;
      this.msg = this.$el.find('#msg').val() || null;
      this.day = this.$el.find('.form-day').val() || null;
      this.month = this.$el.find('.form-month').val() || null;
      this.time = this.$el.find('.form-time').val() || null;
      this.tel = this.$el.find('.form-tel').val() || null;

      var $labeFrom = this.$el.find('label.from'),
          $inputFrom = this.$el.find('input#from'),
          $labeObj = this.$el.find('label.object'),
          $inputObj = this.$el.find('input#object'),
          $labeMsg = this.$el.find('label.msg'),
          $inputMsg = this.$el.find('textarea#msg'),
          $labelDay = this.$el.find('label.day'),
          $labelTime = this.$el.find('label.time'),
          $inputDay = this.$el.find('label.form-day'),
          $inputTime = this.$el.find('label.form-time'),
          $inputTel = this.$el.find('input.tel'),
          $labelTel = this.$el.find('label.form-tel'),

          that = this;

      if (!this.from) {
        $labeFrom.show();
        $inputFrom.addClass('warning');
        this.errors.from = true;
      } else {
        $inputFrom.removeClass('warning');
        $labeFrom.hide();
        this.errors.from = false;
      }

      if (!this.object) {
        $labeObj.show();
        $inputObj.addClass('warning');
        this.errors.object = true;
      } else {
        $inputObj.removeClass('warning');
        $labeObj.hide();
        this.errors.object = false;
      }

      if (!this.msg) {
        $labeMsg.show();
        $inputMsg.addClass('warning');
        this.errors.msg = true;
      } else {
        $inputMsg.removeClass('warning');
        $labeMsg.hide();
        this.errors.msg = false;
      }

      if (!(this.day && this.month)) {
        $labelDay.show();
        $inputDay.addClass('warning');
        this.errors.msg = true;
      } else {
        $inputDay.removeClass('warning');
        $labelDay.hide();
        this.errors.msg = false;
      }

      if (!this.time) {
        $labelTime.show();
        $inputDay.addClass('warning');
        this.errors.msg = true;
      } else {
        $inputTime.removeClass('warning');
        $labelTime.hide();
        this.errors.msg = false;
      }

      if (!this.tel) {
        $labelTel.show();
        $inputTel.addClass('warning');
        this.errors.msg = true;
      } else {
        $inputTel.removeClass('warning');
        $labelTel.hide();
        this.errors.msg = false;
      }


      if (this.errors.from || this.errors.msg || this.errors.object) {
        return;
      }

      api.sendMail({
        from: that.from,
        object: that.object,
        msg: that.msg,
        date: that.day + ' ' + that.month,
        time: that.time,
        tel: that.tel
      }).then(function(res) {
        app.showInfo("success", config.mailSentMsg);
        if (app.mailOnly) {
          return;
        } else {
          app.router.navigate('home', {
            trigger: true
          });
          console.log(that.day + ' ' + that.month);
          console.log(that.time);
        }
      }, function(err) {
        app.showInfo("error", config.mailSentError);
      });
    }

  });

  return MailPage;
});
