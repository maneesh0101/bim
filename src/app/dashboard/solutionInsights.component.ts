import {Component,OnInit,ComponentFactoryResolver} from '@angular/core';
import * as Highcharts from 'highcharts-more-node';
import { MyConsoleService, AlertService } from '../services/index';

@Component({
  selector: 'solution-insights',
  templateUrl: 'solutionInsights.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class SolutionInsightsComponent implements OnInit {
  gaugeData;
  constructor(private myConsoleService: MyConsoleService, private alertService: AlertService) {}
  ngOnInit() {
      this.myConsoleService.getSolutionData().subscribe(data => {
          if (data) {
              this.gaugeData = Array.of(data);
              var self = this;
              Array.prototype.forEach.call(document.getElementsByClassName('consumption'), function(el) {
              Highcharts.chart({
                      chart: {
                          renderTo: el,
                          type: 'gauge',
                      },
                      title: {
                          text: 'WiFi'
                      },
                      pane: {
                          startAngle: -90,
                          endAngle: 90,
                          background: [{
                              backgroundColor: {
                                  linearGradient: {
                                      x1: 0,
                                      y1: 0,
                                      x2: 0,
                                      y2: 1
                                  },
                                  stops: [
                                      [0, '#9A2E58'],
                                      [1, '#9A2E58']
                                  ]
                              },
                              outerRadius: '140%'
                          }]
                      },
                      yAxis: {
                          min: 0,
                          max: 100,
                          lineWidth: 0,
                          minorTickInterval: 'auto',
                          minorTickWidth: 10,
                          minorTickLength: 10,
                          minorTickPosition: 'inside',
                          minorTickColor: '#fff',
                          borderWidth: 1,
                          tickPixelInterval: 300,
                          tickColor: '#5r5BF3B', // green
                          dataLabels: {
                              visible: false
                          },
                          labels: {
                              enabled: false,
                          }
                      },
                      plotOptions: {
                          gauge: {
                              dial: {
                                  radius: "90%",
                                  backgroundColor: "#fff",
                                  borderColor: "#fff",
                                  borderWidth: 1,
                                  baseWidth: 6,
                                  topWidth: 1,
                                  baseLength: "10%",
                                  rearLength: "0%"
                              },
                              pivot: {
                                  radius: 6,
                                  borderWidth: 3,
                                  borderColor: '#ffffff',
                                  backgroundColor: '#55BF3B'
                              }
                          }
                      },

                      series: [{
                          name: 'WiFi',
                          data: self.gaugeData[0].T01,
                          dataLabels: {
                              borderWidth: 0,
                              borderColor: "#F46D43",
                              format: '<div style="text-align:center"><span style="font-size:12px;color:#fff;font-weight:400;text-shadow:none;">{y}</span>'
                          }
                      }],
                      credits: {
                          enabled: false
                      }
                  })
                });
                Array.prototype.forEach.call(document.getElementsByClassName('users'), function(el1) {
                  Highcharts.chart({
                      chart: {
                          renderTo: el1,
                          type: 'gauge',
                      },
                      title: {
                          text: 'Network'
                      },
                      pane: {
                          startAngle: -90,
                          endAngle: 90,
                          background: [{
                              backgroundColor: {
                                  linearGradient: {
                                      x1: 0,
                                      y1: 0,
                                      x2: 0,
                                      y2: 1
                                  },
                                  stops: [
                                      [0, '#197214'],
                                      [1, '#197214']
                                  ]
                              },
                              outerRadius: '140%'
                          }]
                      },
                      yAxis: {
                          min: 0,
                          max: 100,
                          lineWidth: 0,
                          minorTickInterval: 'auto',
                          minorTickWidth: 10,
                          minorTickLength: 10,
                          minorTickPosition: 'inside',
                          minorTickColor: '#fff',
                          borderWidth: 1,
                          tickPixelInterval: 300,
                          tickColor: '#5r5BF3B', // green
                          dataLabels: {
                              visible: false
                          },
                          labels: {
                              enabled: false,
                          }
                      },
                      plotOptions: {
                          gauge: {
                              dial: {
                                  radius: "90%",
                                  backgroundColor: "#fff",
                                  borderColor: "#fff",
                                  borderWidth: 1,
                                  baseWidth: 6,
                                  topWidth: 1,
                                  baseLength: "10%",
                                  rearLength: "0%"
                              },
                              pivot: {
                                  radius: 6,
                                  borderWidth: 3,
                                  borderColor: '#ffffff',
                                  backgroundColor: '#55BF3B'
                              }
                          }
                      },

                      series: [{
                          name: 'Network',
                          data: self.gaugeData[0].T02,
                          dataLabels: {
                              borderWidth: 0,
                              borderColor: "#F46D43",
                              format: '<div style="text-align:center"><span style="font-size:12px;color:#fff;font-weight:400;text-shadow:none;">{y}</span>'
                          }
                      }],
                      credits: {
                          enabled: false
                      }
                  })
                });
                Array.prototype.forEach.call(document.getElementsByClassName('alarm'), function(el) {
                  Highcharts.chart({
                      chart: {
                          renderTo: el,
                          type: 'gauge',
                      },
                      title: {
                          text: 'Voice'
                      },
                      pane: {
                          startAngle: -90,
                          endAngle: 90,
                          background: [{
                              backgroundColor: {
                                  linearGradient: {
                                      x1: 0,
                                      y1: 0,
                                      x2: 0,
                                      y2: 1
                                  },
                                  stops: [
                                      [0, '#DE5400'],
                                      [1, '#DE5400']
                                  ]
                              },
                              outerRadius: '140%'
                          }]
                      },
                      yAxis: {
                          min: 0,
                          max: 100,
                          lineWidth: 0,
                          minorTickInterval: 'auto',
                          minorTickWidth: 10,
                          minorTickLength: 10,
                          minorTickPosition: 'inside',
                          minorTickColor: '#fff',
                          borderWidth: 1,
                          tickPixelInterval: 300,
                          tickColor: '#5r5BF3B', // green
                          dataLabels: {
                              visible: false
                          },
                          labels: {
                              enabled: false,
                          }
                      },
                      plotOptions: {
                          gauge: {
                              dial: {
                                  radius: "90%",
                                  backgroundColor: "#fff",
                                  borderColor: "#fff",
                                  borderWidth: 1,
                                  baseWidth: 6,
                                  topWidth: 1,
                                  baseLength: "10%",
                                  rearLength: "0%"
                              },
                              pivot: {
                                  radius: 6,
                                  borderWidth: 3,
                                  borderColor: '#ffffff',
                                  backgroundColor: '#55BF3B'
                              }
                          }
                      },

                      series: [{
                          name: 'Voice',
                          data: self.gaugeData[0].T03,
                          dataLabels: {
                              borderWidth: 0,
                              borderColor: "#F46D43",
                              format: '<div style="text-align:center"><span style="font-size:12px;color:#fff;font-weight:400;text-shadow:none;">{y}</span>'
                          }
                      }],
                      credits: {
                          enabled: false
                      }
                  })
                });
                Array.prototype.forEach.call(document.getElementsByClassName('svcii'), function(el) {
                  Highcharts.chart({
                      chart: {
                          renderTo: el,
                          type: 'gauge',
                      },
                      title: {
                          text: 'Cloud App'
                      },
                      pane: {
                          startAngle: -90,
                          endAngle: 90,
                          background: [{
                              backgroundColor: {
                                  linearGradient: {
                                      x1: 0,
                                      y1: 0,
                                      x2: 0,
                                      y2: 1
                                  },
                                  stops: [
                                      [0, '#008DAA'],
                                      [1, '#008DAA']
                                  ]
                              },
                              outerRadius: '140%'
                          }]
                      },
                      yAxis: {
                          min: 0,
                          max: 100,
                          lineWidth: 0,
                          minorTickInterval: 'auto',
                          minorTickWidth: 10,
                          minorTickLength: 10,
                          minorTickPosition: 'inside',
                          minorTickColor: '#fff',
                          borderWidth: 1,
                          tickPixelInterval: 300,
                          tickColor: '#5r5BF3B', // green
                          dataLabels: {
                              visible: false
                          },
                          labels: {
                              enabled: false,
                          }
                      },
                      plotOptions: {
                          gauge: {
                              dial: {
                                  radius: "90%",
                                  backgroundColor: "#fff",
                                  borderColor: "#fff",
                                  borderWidth: 1,
                                  baseWidth: 6,
                                  topWidth: 1,
                                  baseLength: "10%",
                                  rearLength: "0%"
                              },
                              pivot: {
                                  radius: 6,
                                  borderWidth: 3,
                                  borderColor: '#ffffff',
                                  backgroundColor: '#55BF3B'
                              }
                          }
                      },

                      series: [{
                          name: 'Cloud App',
                          data: self.gaugeData[0].T04,
                          dataLabels: {
                              borderWidth: 0,
                              borderColor: "#F46D43",
                              format: '<div style="text-align:center"><span style="font-size:12px;color:#fff;font-weight:400;text-shadow:none;">{y}</span>'
                          }
                      }],
                      credits: {
                          enabled: false
                      }
                  })
                });
                Array.prototype.forEach.call(document.getElementsByClassName('billlusage'), function(el) {
                  Highcharts.chart({
                      chart: {
                          renderTo: el,
                          type: 'gauge',
                      },
                      title: {
                          text: 'DC App'
                      },
                      pane: {
                          startAngle: -90,
                          endAngle: 90,
                          background: [{
                              backgroundColor: {
                                  linearGradient: {
                                      x1: 0,
                                      y1: 0,
                                      x2: 0,
                                      y2: 1
                                  },
                                  stops: [
                                      [0, '#EBBA02'],
                                      [1, '#EBBA02']
                                  ]
                              },
                              outerRadius: '140%'
                          }]
                      },
                      yAxis: {
                          min: 0,
                          max: 100,
                          lineWidth: 0,
                          minorTickInterval: 'auto',
                          minorTickWidth: 10,
                          minorTickLength: 10,
                          minorTickPosition: 'inside',
                          minorTickColor: '#fff',
                          borderWidth: 1,
                          tickPixelInterval: 300,
                          tickColor: '#5r5BF3B', // green
                          dataLabels: {
                              visible: false
                          },
                          labels: {
                              enabled: false,
                          }
                      },
                      plotOptions: {
                          gauge: {
                              dial: {
                                  radius: "90%",
                                  backgroundColor: "#fff",
                                  borderColor: "#fff",
                                  borderWidth: 1,
                                  baseWidth: 6,
                                  topWidth: 1,
                                  baseLength: "10%",
                                  rearLength: "0%"
                              },
                              pivot: {
                                  radius: 6,
                                  borderWidth: 3,
                                  borderColor: '#ffffff',
                                  backgroundColor: '#55BF3B'
                              }
                          }
                      },

                      series: [{
                          name: 'DC App',
                          data: self.gaugeData[0].T05,
                          dataLabels: {
                              borderWidth: 0,
                              borderColor: "#F46D43",
                              format: '<div style="text-align:center"><span style="font-size:12px;color:#fff;font-weight:400;text-shadow:none;">{y}</span>'
                          }
                      }],
                      credits: {
                          enabled: false
                      }
                  })
                })
                
          }
      }, error => {
          this.alertService.error(error);
      })
  }

}