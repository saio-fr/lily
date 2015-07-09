
define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _         = require('underscore'),
      analytics = {};

  // Events categories
  var categories = {
    impression: 'Impressions',
    hover: 'UI Interactions',
    click: 'UI Interactions',
    submit: 'UI Interactions',
    funnel: 'Funnel Progressions',
    error: 'UI Errors',
    timing: 'Timing',
    other: 'Other Events',
  };

  return function(globals) {

    var defaults;

    if (globals.app === 'frontApp') {
      defaults = _.defaults({
        page: window.location.hash || '/',
      }, globals.hostOptions);
    } else {
      defaults = {
        page: window.location.pathname,
      };
    }

    // Use as follow: track[category](description, options)
    // where catagory is a key in categories
    // Or simply as track(description, options), to use the "other" category
    analytics.track = _.reduce(Object.keys(categories), function(memo, kind) {
      memo[kind] = function(description, options) {
        options = options || {};
        options.category = categories[kind] || categories.other;

        var nonInteraction = _.indexOf([
          'Funnel Progressions',
          'Impressions',
          'Timing'
        ], options.category) ? 1 : 0;

        // Format and Send mixpanel event
        if (typeof mixpanel !== 'undefined' && _.isFunction(mixpanel.track)) {
          _.defaults(options, defaults);
          mixpanel.track(description, options);
        }

        if (_.isFunction(ga)) {
          // Send google analytics event
          ga('send', {
            hitType: 'event',
            eventCategory: options.category,
            eventAction: description,
            eventLabel: options.label,
            nonInteraction: nonInteraction
          });
        }
      };

      return memo;
    }, {});

    analytics.trackPageView = function(title) {
      if (globals.app === 'frontApp' && !globals.isShown) {
        this.pageViewDelayed = title;
        return;
      }

      if (!_.isFunction(window.ga)) {
        return;
      }

      ga('send', 'pageview', {
        'title': title
      });

      // Track page view as an event
      this.track.impression(title);

      // Only log the pageView event when the app is actally visible
      if (this.pageViewDelayed) {
        var page = this.pageViewDelayed;
        this.pageViewDelayed = null;
        this.trackPageView(page);
      }
    };

    analytics.registerProperties = function(options) {
      if (typeof mixpanel !== 'undefined' && _.isFunction(mixpanel.register)) {
        mixpanel.register(options);
      }
    };

    analytics.registerUser = function(id, traits) {
      if (typeof mixpanel !== 'undefined' && _.isFunction(mixpanel.identify)) {
        mixpanel.people.set(traits);
        mixpanel.identify(id);
      }
    };

    return analytics;
  };
});
