
$(document).ready(function () {
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'School/University Students Travel By'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%'
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Vehicles',
            colorByPoint: true,
            data: [{
                name: 'Car',
                y: 20,
                sliced: true,
                selected: true
            }, {
                name: 'Bus',
                y: 30
            }, {
                name: 'Walking',
                y: 15
            }, {
                name: 'Bicycle',
                y: 35
            }]
        }]
    });

});