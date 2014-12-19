define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var _ = require('underscore'),
      Utils = require('utils/default'),
      morris = require('morris'),
      Statistics = {};

  _.extend(Statistics, Utils);
  
  Statistics.renderBars = function (view) {
    view.model.fetch({
				success: function(data) {
					var d = [];
					var i = 0;
					while (typeof data.attributes[i] != 'undefined') {
						d.push([data.attributes[i]['x'], data.attributes[i]['y']]);
						i++;
					}
					
					var plot = function() {
						Morris.Bar({
				  		element: 'bar-charts',
							data: d,
              xkey: 0,
  						ykeys: [1],
							labels: [''],
              barRatio: 0.4,
							hideHover: 'auto',
              barColors: ['#aeb6cb'],
						});
				  }
				  
					plot();
					$(window).on('resize', function() {
						view.$el.find('#bar-charts').empty();
						plot();
					});
				}
			});
  }

  
  return Statistics;
});