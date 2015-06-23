/*======================================
            Search methods
=======================================*/

define(function(require) {

  'use strict';

  // Require CommonJS like includes
  var _                = require('underscore'),
      SynapseSuggest   = require('synapse'),
      typeahead        = require('typeahead');

  return {

    specialKeyCodeMap: {
      9: 'tab',
      37: 'left',
      39: 'right',
      38: 'up',
      40: 'down'
    },

    /**
     * Get the credentials from config,
     * Init synapse module, setup bloodhound
     *
     * @return {undefined}
     */
    setupSynapse: function(options) {
      var credentials = options.credentials || {},
          typeaheadOptions = options.typeahead || null,
          url = options.url || null;

      this.suggest = new SynapseSuggest(credentials, url, typeaheadOptions);
    },

    /**
     * Init Typeahead
     * Trigger all typeahead events bound to the input using Backbone events
     *
     * @return {undefined}
     */
    setupTypeahead: function(selector) {
      var that = this;

      $(selector).typeahead('destroy');

      // Init Typeahead on '.avi-input'
      this.suggest.addSuggestionsToInput(selector, 'suggestions', 3, 3);

      // Listen to typeahead events and translate them into backbone events
      _.each(['active', 'idle', 'open', 'close', 'change', 'render', 'select',
        'autocomplete', 'cursorchange', 'asyncrequest', 'asynccancel', 'asyncreceive'
      ], function(action) {
        $(selector).on('typeahead:' + action, function() {
          var args = Array.prototype.slice.call(arguments);
          args.unshift('search:' + action);
          that.trigger.apply(that, args);
        });
      });
    },

  };

});
