/* ===========================
    Chat Visitor Message View
   ========================== */

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _         = require('underscore'),
      Backbone  = require('backbone'),
      app       = require('front/app'),
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

      var that = this;

      that.$el.find('a')
        .on('touch click', function(ev) {
          /* On regarde data-transition et data-reverse sur le lien cliqué*/
          that.setNextTransition(this);
        });

      return this;

    },

    setNextTransition: function(el) {

      this.nextTransition.type = $(el).attr('data-transition');
      this.nextTransition.reverse = $(el).attr('data-reverse');
    },

    transitionIn: function(previous, transition, reverse, callback) {

      var that = this,
        $nextPage = that.$el.find('.lily-page-cont'),
        $currPage = (previous) ? previous.$el.find('.lily-page-cont') : null,

        // inClass = reverse !== 'true' ? 'lily-page-moveFromRight ' : 'lily-page-moveFromLeft ',
        inClass = reverse !== 'true' ? 'fadeInUp ' : 'fadeInUp ',
        visible = 'lily-page-visible',
        data = {
          $currPage: $currPage,
          $nextPage: $nextPage,
          previous: previous,
          view: that,
          inClass: inClass,
          callback: callback
        };

      this.whileTransitioning();

      $nextPage.addClass(inClass + visible);
      app.onAnimEnd($nextPage, this.onTransitionIn, data, this);
    },

    onTransitionIn: function(data) {

      app.endNextPage = true;
      FastClick.attach(document.body);

      if (_.isFunction(data.callback)) {
        data.callback();
      }

      if (data.$currPage) {
        data.previous.remove();
      }

      if (data.$nextPage) {
        data.$nextPage.removeClass(data.inClass);
      }

      this.stopLinksClickPreventing();

      data.view.trigger('page:transitionnedIn');
    },

    transitionOut: function(transition, reverse, callback) {

      var that = this,
        $currPage = that.$el.find('.lily-page-cont'),
        outClass = reverse !== 'true' ? 'lily-page-moveToLeft' : 'lily-page-moveToRight',
        data = {
          $currPage: $currPage,
          outClass: outClass,
          previous: that,
          callback: callback
        };

      this.whileTransitioning();

      $currPage.addClass(outClass);
      app.onAnimEnd($currPage, this.onTransitionOut, data, this);
    },

    onTransitionOut: function(data) { // Browser support for onEndAnim event
      if (_.isFunction(data.callback)) {
        data.callback();
      }

      data.previous.$el
        .find('.lily-page-cont')
        .removeClass('lily-page-visible');

      data.previous.remove();

      this.stopLinksClickPreventing();
    },

    whileTransitioning: function() {
      $('.lily-page a').on('click', this.preventLinkClicks);
    },

    preventLinkClicks: function(event) {
      event.preventDefault();
    },

    stopLinksClickPreventing: function() {
      $('.lily-page a').off('click', this.preventLinkClicks);
    }

  });

  return PageView;
});
