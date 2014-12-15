define(function (require) {

  'use strict';

  // Object wrapper returned as a module
  var _ = require('underscore'),
      Utils = require('utils/default'),
      Daterangepicker = require('daterangepicker'),
      flot = require('flot'),
      flotResize = require('flot-resize'),
      flotTooltip = require('flot-tooltip'),
      flotTime = require('flot-time'),
      g = require('globals'),
      Statistics = {};

  _.extend(Statistics, Utils);
  
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
    el.find('span').html(g.date.start.format('D MMMM YYYY') + ' - ' + g.date.end.format('D MMMM YYYY'));
  }
  
  Statistics.renderFooter = function (view) {
    view.model.footer.fetch({
      success: function(data) {
        view.$el.find('footer').remove();
        view.$el.append(view.templateFooter(view.model.footer.toJSON()));
        view.$el.find('#'+view.model.graph.type).addClass('active');
      }
    });
  },
  
  // Render footer and plot graph
  Statistics.renderGraph = function (view) {
    // Show loader
    $('.icon-spinner').fadeIn();
    // Fetch data
    view.model.graph.fetch({
      success: function(data) {
        var el = view.$el.find('.graph');
        Statistics.plot(data, el);
        // Remove loader
        $('.icon-spinner').fadeOut();
      }
    });
  }
  
  // Plot graph
  Statistics.plot = function (data, el) {
    var d1 = [];
    var i = 0;
    while (typeof data.attributes.values[i] != 'undefined') {
      d1.push([data.attributes.values[i][0], data.attributes.values[i][1]]);
      i++;
    }
    
    var type = data.attributes.type;
    var period = data.attributes.period;
    
    var plotOptions={
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
      colors: ["#6eaee8"],
      xaxis: {
        min: d1[d1.length - 1][0],
        max: d1[0][0],
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
          value = parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
          break;
        case 'time':
          value = parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
          break;
        case '%':
          value = parseInt(y*100) + '%';
          break;
        default:
          console.warn('Data type not recognized in getTooltip : ' + type);
        break;
      }
      
      switch(period) {
        case 'houd':
          var date = moment(x/1000, 'X').format('HH');
          return value + " à " + date + " heures";
          break;
        case 'day':
          var date = moment(x/1000, 'X').format('DD/MM/YYYY');
          return value + " le " + date;
          break;
        case 'month':
          var date = moment(x/1000, 'X').format('MMMM');
          return value + " en " + date;
          break;
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
          value = parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
          break;
        case 'time':
          value = parseInt(y/60) + ' min ' + parseInt(y%60)  + ' s';
          break;
        case '%':
          value = parseInt(y*100) + '%';
          break;
        default:
          console.warn('Data type not recognized in yAxisTickFormatter : ' + type);
      }
      return value;
    }
    
    // More options depandings on data type
    if(type == '%') {
      plotOptions.yaxis.max = 1;
      plotOptions.yaxis.tickSize = 0.5;
    }

    if(type == 'time') {
      plotOptions.xaxis.timeformat = '%H:%M';
    }
    else {
      plotOptions.xaxis.timeformat = '%d %b';
    }
    
    $.plot(el,[{ data: d1 }], plotOptions);
    return this;
  }

  
  return Statistics;
});