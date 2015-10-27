define(function(require) {

  'use strict';

  var $            = require('jquery'),
      Backbone     = require('backbone'),
      isMobile     = require('isMobile'),
      app          = require('front/app'),
      config       = require('front/globals'),
      SkeletonView = require('front/views/skeleton');

  app.bootstrap = function() {
    config.isMobile = isMobile;
    var configModel = new Backbone.Model(config);
    app.skeleton = new SkeletonView({ model: configModel });
  };

  app.init();

  // On Dom loaded
  $(function() {

    if (!config.standaloneMode) {
      // Remove reduce icon
      $('body').addClass('embedded');
    }

    // Ugly, uuuuuugly hack to allow a div with contenteditable set to "true"
    // to work with typeahead:
    $.valHooks['contenteditable'] = {
      get: function(el) {
        return $(el).text();
      },

      set: function(el, val) {
        $(el).text(val);
      }
    };

    $.fn.myedit = function() {
      this.each(function() {
        this.type = 'contenteditable';
      });

      return this;
    };

    // Log ajax errors in Bugsnag
    $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
      if (window.Bugsnag) {
        window.Bugsnag.notify('AjaxError', thrownError);
      }
    });

    // Placeholder hack for contenteditable
    $(document).on('change keydown keypress input', '*[data-placeholder]', function() {
      if (this.textContent) {
        this.setAttribute('data-div-placeholder-content', 'true');
      } else {
        this.removeAttribute('data-div-placeholder-content');
      }
    });
  });

  return {};

});
