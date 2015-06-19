define(function(require) {

  'use strict';

  var $            = require('jquery'),
      isMobile     = require('isMobile'),
      app          = require('front/app'),
      config       = require('front/globals'),
      SkeletonView = require('front/views/skeleton');

  app.init = function() {
    config.isMobile = isMobile;
    app.skeleton = new SkeletonView();

    if (config.isMobile) {
      app.onShowIframe();
    }
  };

  config.sid = app.getSessionId();
  if (!config.sid) {
    // We were unable to store an uniqid
    // We won't show the widget
    // To do: track this event;
    console.log('unable to generate uniqid');
    return;
  }

  app.wsConnect(function(result) {
    app.isConnectionActive = true;
    app.showContactForm = result.showContactForm;
    app.setIsConversationClosed(result.isConversationClosed);
    app.init();
  });

  app.onLoadApp();

  // On Dom loaded
  $(function() {

    // App loading in an iframe (on the host website)
    function appInIframe () {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }

    if (appInIframe()) {
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