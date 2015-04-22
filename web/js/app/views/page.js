/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/app'),
    config = require('app/globals'),
    FastClick = require('FastClick'),
    // Object wrapper returned as a module
    PageView;

  app.isAnimating = false;
  app.endCurrPage = false;
  app.endNextPage = false;

  PageView = Backbone.View.extend({

    nextTransition: {
      type: '',
      reverse: ''
    },

    render: function(options) {

      options = options || {};

      if (options.page === true) {
        this.$el.find('.lily-page-cont').addClass('lily-page');
      }

      var view = this;

      view.$el.find("a").on("touch click", function(e) {
        /* On regarde data-transition et data-reverse sur le lien cliqué*/
        view.setNextTransition(this);
      });

      return this;

    },

    setNextTransition: function(el) {

      this.nextTransition.type = $(el).attr("data-transition");
      this.nextTransition.reverse = $(el).attr("data-reverse");
    },

    transitionIn: function(previous, transition, reverse, callback) {

      var view = this,
        $nextPage = view.$el.find('.lily-page-cont'),
        $currPage = (previous) ? previous.$el.find('.lily-page-cont') : null,
        // inClass = reverse !== 'true' ? 'lily-page-moveFromRight ' : 'lily-page-moveFromLeft ',
        inClass = reverse !== 'true' ? 'fadeInUp ' : 'fadeInUp',
        visible = 'lily-page-visible',
        data = {
          $currPage: $currPage,
          $nextPage: $nextPage,
          previous: previous,
          view: view,
          inClass: inClass,
          callback: callback,
        };

      if (config.support) { // Browser support for onEndAnim event
        $nextPage.addClass(inClass + visible)
          .on(config.animEndEventName, data, this.onTransitionIn);
      } else {
        $nextPage.addClass(inClass + visible);
        this.onTransitionIn({
          data: data
        });
      }

    },

    onTransitionIn: function(e) {

      $(this).off(config.animEndEventName);

      app.endNextPage = true;
      // TODO: have a look at that!
      FastClick.attach(document.body);

      if (_.isFunction(e.data.callback)) {
        e.data.callback();
      }
      if (e.data.$currPage) {
        e.data.previous.remove();
      }
      if (e.data.$nextPage) {
        e.data.$nextPage.removeClass(e.data.inClass);
      }

      e.data.view.trigger('page:transitionnedIn');
    },

    transitionOut: function(transition, reverse, callback) {

      var previous = this,
        $currPage = previous.$el.find('.lily-page-cont'),
        outClass = reverse !== 'true' ? 'lily-page-moveToLeft' : 'lily-page-moveToRight',
        data = {
          $currPage: $currPage,
          outClass: outClass,
          previous: previous,
          callback: callback
        };

      if (config.support) {
        $currPage.addClass(outClass)
          .on(config.animEndEventName, data, this.onTransitionOut);
      } else {
        $currPage.addClass(outClass);
        this.onTransitionOut({
          data: data
        });
      }

    },

    onTransitionOut: function(e) { // Browser support for onEndAnim event
      $(this).off(config.animEndEventName);
      if (_.isFunction(e.data.callback)) {
        e.data.callback();
      }

      e.data.previous.$el
        .find('.lily-page-cont')
        .removeClass('lily-page-visible');

      e.data.previous.remove();
    },

  });

  return PageView;
});
