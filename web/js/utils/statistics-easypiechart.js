define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Utils = require('utils/default'),
      Easypiechart = require('easypiechart'),
      
      Statistics = {};

  _.extend(Statistics, Utils);

  Statistics.chatLoading = function (el) {

  	// Show a graph representing the load of the chat, depending on numbers of visitors & operators
  	var barColor = el.data("barColor") || function(percent) {
      percent /= 100;
      return "rgb(" + Math.round(255 * percent) + 
        ", " + Math.round(255 * (1-percent)) + ", 0)";
    },
		trackColor = el.data("trackColor") || "#c8d2db",
		scaleColor = el.data("scaleColor"),
		lineWidth = el.data("lineWidth") || 12,
		size = el.data("size") || 130,
		animate = el.data("animate") || 1000;

		el.easyPieChart({
      barColor: barColor,
      trackColor: trackColor,
      scaleColor: scaleColor,
      lineCap: 'butt',
      lineWidth: lineWidth,
      size: size,
      animate: animate,
      onStart: function(from, to, value) {
        el.find('span').text(parseInt(to) + ' %');
      }
    });
  };

  return Statistics;
});