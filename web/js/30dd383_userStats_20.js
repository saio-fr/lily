 function initChart(graphData) {
  var plot = $.plot($("#chart-userStat"), [{
          data: graphData
      }], 
      {
        series: {
            lines: {
                show: true,
                lineWidth: 2,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.0
                    }, {
                        opacity: 0.2
                    }]
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
            tickColor: "#f0f0f0",
            borderWidth: 0
        },
        colors: ["#5dcff3"],
        xaxis: {
            mode: "categories",
            tickDecimals: 0            
        },
        yaxis: {
            ticks: 5,
            tickDecimals: 0,            
        },
        tooltip: true,
        tooltipOpts: {
          content: "%y.4 le %x.1",
          defaultTheme: false,
          shifts: {
            x: 0,
            y: 20
          }
        }
      }
  );
};