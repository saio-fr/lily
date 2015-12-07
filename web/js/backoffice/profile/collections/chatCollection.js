/*======================================
        CONVERSATION COLLECTION
=======================================*/

define(function (require) {

  'use strict';

  // Require CommonJS like includes
  var Backbone = require('backbone'),
      g = require('config'),
      statistics = require('statistics'),

      // Object wrapper returned as a module
      ChatCollection;

  ChatCollection = Backbone.Collection.extend({

    sortCriteria : 'start',
    url: function () {
      return '/statistics/user/' + g.userId + '/history/chats/' + this.start + '/' + this.end;
    },

    initialize: function () {
      this.start = statistics.date.start;
      this.end = statistics.date.end;
    },

    comparator: function(item) {
			switch (this.sortCriteria) {
  			case 'start':
  			  return -moment(item.get('start')).unix();
        case 'duration':
          return moment(item.get('start')).unix() - moment(item.get('end')).unix();
        default:
          return -item.get(this.sortCriteria);
  		}
		}
  });

  return ChatCollection;
});
