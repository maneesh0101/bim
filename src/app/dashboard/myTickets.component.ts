import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MyConsoleService,AlertService} from '../services/index';
import * as Highcharts from 'highcharts/highstock';

@Component({
    selector: 'my-Tickets-widget',
    templateUrl: 'myTickets.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class MyTicketsComponent implements OnInit {
    mySolutionData;
    constructor(private myConsoleService: MyConsoleService, private alertService: AlertService) {}
    ngOnInit() {
        let textX;
        let textY;
        this.myConsoleService.getConsoleData().subscribe(data => {
            if (data) {
                this.mySolutionData = Array.of(data);
                var self = this;
                Array.prototype.forEach.call(document.getElementsByClassName('tbStatus'), function(el) {
                Highcharts.chart({

                            chart: {
                                renderTo: el,
                                type: 'pie',
                                marginTop: 55
                            },
                            title: {
                                text: 'By Component'
                            },
                            credits: {
                                enabled: false
                            },                            
                            plotOptions: {
                                pie: {
                                    size: 200,
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true,
                                    borderWidth: 3,
                                    states: {
                                        hover: {
                                            enabled: true
                                        }
                                    },
                                    point: {
                                        events: {
                                            mouseOver: function() {
                                                this.series.chart.innerText.attr({
                                                    text: this.y
                                                });
                                            },
                                            mouseOut: function() {
                                                this.series.chart.innerText.attr({
                                                    text: this.series.total
                                                });
                                            }
                                        }
                                    }
                                }
                            },
                            legend: {
                                x: 10,
                                y: -55,
                            },
                            tooltip: {
                                pointFormat: '<b>{point.percentage}</b>'
                            },
                            series: [{
                                innerSize: '70%',
                                data: self.mySolutionData[0].T01
                            }]

                        },
                        function(chart) {
                            textX = this.series[0].chart.plotLeft + (this.series[0].chart.plotWidth * 0.35);
                            textY = this.series[0].chart.plotTop + (this.series[0].chart.plotHeight * 0.55);

                            let total = 0;
                            for (let i = 0, len = this.series[0].yData.length; i < len; i++) {
                                total += this.series[0].yData[i];
                            }
                            this.series[0].chart.innerText = chart.renderer.text('' + total, textX, textY).css({
                                color: '#4572A7',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                floating: true
                            }).attr({
                                zIndex: 999
                            }).add();
                        })
                    }),

                    Array.prototype.forEach.call(document.getElementsByClassName('tbLocation'), function(el) {
                    Highcharts.chart({
                        chart: {
                            renderTo: el,
                            type: 'pie'
                        },
                        title: {
                            text: 'By Status'
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            pie: {
                                size: 200,
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true,
                                borderWidth: 3,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                },
                                point: {
                                    events: {
                                        mouseOver: function() {
                                            this.series.chart.innerText.attr({
                                                text: this.y
                                            });
                                        },
                                        mouseOut: function() {
                                            this.series.chart.innerText.attr({
                                                text: this.series.total
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        tooltip: {
                            pointFormat: '<b>{point.percentage}</b>'
                        },
                        series: [{

                            innerSize: '70%',
                            data: self.mySolutionData[0].T02
                        }]
                    }, function(chart) {
                        textX = this.series[0].chart.plotLeft + (this.series[0].chart.plotWidth * 0.35);
                        textY = this.series[0].chart.plotTop + (this.series[0].chart.plotHeight * 0.55);
                        let total = 0;
                        for (let i = 0, len = this.series[0].yData.length; i < len; i++) {
                            total += this.series[0].yData[i];
                        }
                        this.series[0].chart.innerText = chart.renderer.text('' + total, textX, textY).css({
                            color: '#4572A7',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }).attr({
                            zIndex: 999
                        }).add();
                    })
                }),
                Array.prototype.forEach.call(document.getElementsByClassName('tbCategory'), function(el) {
                    Highcharts.chart({
                        chart: {
                            renderTo: el,
                            type: 'pie',
                            marginTop: 50
                        },
                        title: {
                            text: 'By Region'
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            x: 10,
                            y: -35,
                        },
                        plotOptions: {
                            pie: {
                                size: 200,
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true,
                                borderWidth: 3,
                                states: {
                                    hover: {
                                        enabled: true
                                    }
                                },
                                point: {
                                    events: {
                                        mouseOver: function() {
                                            this.series.chart.innerText.attr({
                                                text: this.y
                                            });
                                        },
                                        mouseOut: function() {
                                            this.series.chart.innerText.attr({
                                                text: this.series.total
                                            });
                                        }
                                    }
                                }
                            }
                        },
                        tooltip: {
                            pointFormat: '<b>{point.percentage}</b>'
                        },
                        series: [{
                            innerSize: '70%',
                            data: self.mySolutionData[0].T03
                        }]
                    }, function(chart) {
                        textX = this.series[0].chart.plotLeft + (this.series[0].chart.plotWidth * 0.35);
                        textY = this.series[0].chart.plotTop + (this.series[0].chart.plotHeight * 0.55);
                        let total = 0;
                        for (let i = 0, len = this.series[0].yData.length; i < len; i++) {
                            total += this.series[0].yData[i];
                        }
                        this.series[0].chart.innerText = chart.renderer.text('' + total, textX, textY).css({
                            color: '#4572A7',
                            fontSize: '30px',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }).attr({
                            zIndex: 999
                        }).add();
                    })
                })
            }
        }, error => {
            this.alertService.error(error);
        })

    }
}