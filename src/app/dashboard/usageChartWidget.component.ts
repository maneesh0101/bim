import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import * as Highcharts from 'highcharts/highstock';

@Component({
    selector: 'usageChart-Widget',
    templateUrl: 'usageChartWidget.component.html',
    styleUrls: ['./dashboard.component.css']
})

export class UsageChartComponent implements OnInit {
       items: object[];
  	   total:any = 0;
	     amountAvailable:any =0;
    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            [{
                    "Services": "Branch in a Box",
                    "Cost": 10000
                },
                {
                    "Services": "S D WAN",
                    "Cost": 5000
                },
                {
                    "Services": "Security",
                    "Cost": 2500
                },
                {
                    "Services": "Firewall",
                    "Cost": 2500
                }
            ],
            [{
                "Total": 30500.75
            }]
        ];
		// var chart1 = Highcharts.chart({
    //     chart: {
    //         renderTo: 'billUsage',
    //         type: 'pie',
		// 	      height: 367
    //     },
    //    title: {
    //         text: '$' + this.items[1][0].Total,
    //          verticalAlign: 'middle',
    //          floating: true
    //         },
		// 	credits: {
    //             enabled: false
    //         },
		// 	plotOptions: {
    //              series: {
    //                 dataLabels: {
    //                     enabled: false
    //                  }
    //             },
    //              pie: {
    //                 showInLegend: true
    //             }
    //          },
    //
		// series: [{
    //              innerSize: '70%',
    //             data: [{
    //                      name: 'Amount Used',
    //                      y: 70,
    //                      color: 'blue',
    //                      strokeWidth: 10
    //                  },
    //                  {
    //                      name: 'Amount Available',
    //                      y: 30,
    //                      color: 'green',
    //                      strokeWidth: 70
    //                  }
    //              ]
    //          }]
    // });
	// getTotal() {
         // this.temp = this.items[0];
          // for (var i = 0; i < this.temp.length; i++) {
                // this.total += this.temp[i].Cost;
            // };
          // return this.total;
    // }
	 // this.getAvailableAmount = new function() {
            // self.temp = self.items[1];
            // self.amountAvailable = self.temp[0].Total - self.total;
            // return self.amountAvailable;
         // };
}
}
