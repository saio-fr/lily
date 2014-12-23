define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var _ = require('underscore'),
      Backbone = require('backbone'),
      Utils = require('utils/default'),
      Daterangepicker = require('daterangepicker'),
      flot = require('flot'),
      flotResize = require('flot-resize'),
      flotTooltip = require('flot-tooltip'),
      flotTime = require('flot-time'),
      flotPie = require('flot-pie'),
      moment = require('moment'),
      Statistics = {};

  _.extend(Statistics, Utils);

  Statistics.date = {
    // Default period used to datepick
    start: moment().subtract(6, 'days'),
    end: moment().endOf('day'),
  };

  // Daterange picker
  Statistics.daterangepicker = function (view) {
    var el = view.$el.find('.reportrange');
    el.daterangepicker({
      locale: {
        customRangeLabel: 'Personnaliser'
      },
      ranges: {
         'Cette semaine': [moment().subtract(6, 'days'), moment()],
         'Ce mois': [moment().subtract(30, 'days'), moment()],
         'Ce semestre': [moment().subtract(4, 'month').startOf('month'), moment()],
         'Cette année': [moment().subtract(12, 'month'), moment()]
        },
        startDate: moment().subtract(6, 'days'),
        endDate: moment(),
        dateLimit: { months: 36 }
      },
      function(start, end) {
        el.find('span').html(start.format('D MMMM YYYY') + ' - ' + end.format('D MMMM YYYY'));

        if (view.model instanceof Backbone.Model) {
          view.model.start = start;
          view.model.end = end;
        }

        if (view.collection instanceof Backbone.Collection) {
          view.collection.start = start;
          view.collection.end = end;
        }

        if (view.model &&
          view.model.graph instanceof Backbone.Model) {
            view.model.graph.start = start;
            view.model.graph.end = end;
        }

        if (view.model &&
          view.model.footer instanceof Backbone.Model) {
            view.model.footer.start = start;
            view.model.footer.end = end;
        }
      }
    );
    el.find('span').html(Statistics.date.start.format('D MMMM YYYY') + ' - ' + Statistics.date.end.format('D MMMM YYYY'));
  };

  Statistics.renderFooter = function (view) {
    view.model.footer.fetch({
      success: function(data) {
        view.$el.find('footer').remove();
        view.$el.append(view.templateFooter(view.model.footer.toJSON()));
        view.$el.find('[data-type='+view.model.graph.type+']').addClass('active');
      }
    });
  };

  // Render footer and plot graph
  Statistics.renderGraph = function (view, spinner) {
    // Show loader
    spinner.fadeIn();
    // Fetch data
    view.model.graph.fetch({
      success: function(data) {
        var el = view.$el.find('.graph');
        Statistics.plot(data, el);
        // Remove loader
        spinner.fadeOut();
      }
    });
  }

  Statistics.renderPie = function (view) {
    // Show loader
    $('.icon-spinner').fadeIn();
    // Fetch data
    view.model.fetch({
      success: function(data) {
        var el = view.$el.find('.redirections');
        Statistics.plotPie(data, el);
        // Remove loader
        $('.icon-spinner').fadeOut();
      }
    });
  };

  Statistics.plotPie = function (data, el) {
    var da = [];
		for (var i = 0; i < 2; i++) {
			da[i] = {
				label: data.attributes[i].label,
				data: data.attributes[i].data
			};
		}

		var options = Statistics.plotPieOptions();
		$.plot(el, da, options);
  };

  Statistics.plotPieOptions = function () {
    var options = {
			series: {
				pie: {
					combine: {
						color: "#999",
						threshold: 0.05
					},
					show: true,
					label: {
						show: true,
						formatter: function(label, series) {
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:#4c5567;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
						},
					},
				}
			},
			colors: ["#aeb6cb", "#f3f5f9"],
			legend: {
				show: false
			},
			grid: {
				hoverable: false,
				clickable: false
			},
			tooltip: true,
			tooltipOpts: {
				content: "%s: %p.0%"
			}
		};
    return options;
  }

  // Plot graph
  Statistics.plot = function (data, el) {
    var d = [];
    var tables = [];
    var i = 0;

    while (typeof data.attributes.values[i] != 'undefined') {
      d[i] = [];
      var j = 0;
      while (typeof data.attributes.values[i][j] != 'undefined') {
        d[i].push([data.attributes.values[i][j][0], data.attributes.values[i][j][1]]);
        j++;
      }
      tables.push({ data: d[i] });
      i++;
    }

    var options = Statistics.plotOptions(data, d[0]);

    $.plot(el, tables, options);
    return this;
  };

  // Plot options
  Statistics.plotOptions = function (data, d) {

    var type = data.attributes.type;
    var period = data.attributes.period;

    var options = {
      series: {
        lines: {
          show: true,
          lineWidth: 2,
          fill: true,
          fillColor: {
            colors: [{ opacity: 0.0 }, { opacity: 0.2 }]
          }
        },
        points: {
          radius: 5,
          show: true
        },
        shadowSize: 2
      },
      grid: {
        color: "#fff",
        hoverable: true,
        clickable: true,
        tickColor: "#fafafa",
        borderWidth: 0
      },
      colors: ["#6eaee8", "#92d050"],
      xaxis: {
        min: d[0][0],
        max: d[d.length - 1][0],
        mode: "time",
        tickSize: [data.attributes.step, data.attributes.period],
        tickLength: 0,
        monthNames: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
        dayNames: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
      },
      yaxis: {
        min: 0,
        ticks: 2,
        tickDecimals: 0,
        tickFormatter: yAxisTickFormatter,
      },
      tooltip: true,
      tooltipOpts: {
        content: getTooltip,
        defaultTheme: false,
        shifts: {
          x: 0,
          y: 20
        },
      }
    };

    // Set labels in tooltips
    function getTooltip(label, x, y) {
      var value;
      switch(type) {
        case 'int':
          value = parseFloat(y).toFixed(2);
          break;
        case 'time':
          value = parseInt(y / 60) + ' min ' + parseInt(y % 60)  + ' s';
          break;
        case '%':
          value = parseInt(y * 100) + '%';
          break;
        default:
          console.warn('Data type not recognized in getTooltip : ' + type);
        break;
      }

      switch(period) {
        case 'houd':
          var date = moment(x / 1000, 'X').format('HH');
          return value + " à " + date + " heures";
        case 'day':
          var date = moment(x / 1000, 'X').format('DD/MM/YYYY');
          return value + " le " + date;
        case 'month':
          var date = moment(x / 1000, 'X').format('MMMM');
          return value + " en " + date;
      }
      return value;
    }

    // Change y axis
    function yAxisTickFormatter(y, axis) {
      var value;
      switch(type) {
        case 'int':
          value = parseFloat(y)
          break;
        case 'time':
          value = parseInt(y / 60) + ' min ' + parseInt(y % 60)  + ' s';
          break;
        case 'time':
          value = parseInt(y / 60) + ' min ' + parseInt(y % 60)  + ' s';
          break;
        case '%':
          value = parseInt(y * 100) + '%';
          break;
        default:
          console.warn('Data type not recognized in yAxisTickFormatter : ' + type);
      }
      return value;
    }

    // More options depandings on data type
    if(type == '%') {
      options.yaxis.max = 1;
      options.yaxis.tickSize = 1;
    }

    if(type == 'time') {
      options.xaxis.timeformat = '%H:%M';
    }
    else {
      options.xaxis.timeformat = '%d %b';
    }

    return options;
  };

  return Statistics;
});