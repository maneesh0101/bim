import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyservicesService } from '../services/index';

@Component({
    templateUrl: 'myServices.component.html',
    styleUrls: ['./myServices.component.css']
})

export class MyServicesComponent implements OnInit {
    model: any = { 'serDropdown': '0' };
    slaData: any;
    slaMainData: any;
    totalItems: any;
    pageNo: number;
    activeTab: any = "Surge";

    dataElement: string = "data";
    timeline: any = 'Last 10 hour';
    space: any = "\n";

    //consumption details
    specificTimeline: Object;
    chartTimelineData: any[];

    //ng4-chart settings
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
        legend: {
            position: 'bottom'
        }
    };
    barChartLabels: any[];
    barChartData: any[] = [{ data: [] }];
    barChartCaption: any;

    public lineChartColors: Array<any> = [
        { //bar(blue)
            backgroundColor: 'rgba(12,164,255, 0.3)',
            pointBackgroundColor: 'rgba(213, 43, 30, 0.6)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { //line(yellow)
            backgroundColor: 'rgba(255,225,12,0.5)',
            borderColor: 'rgba(255,225,12,0.5)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        }
    ];

    itemList: any = [
        { 'value': '0', 'name': 'My Branch in a Box' },
        { 'value': '1', 'name': 'List Item 1' },
        { 'value': '2', 'name': 'List Item 2' },
        { 'value': '3', 'name': 'List Item 3' },
        { 'value': '4', 'name': 'List Item 4' },
    ];

    constructor(private router: Router, private myservicesService: MyservicesService) {
    }

    ngOnInit() {
        this.model.serDropdown = '0';
        this.myservicesService.getServices().subscribe(data => {
            if (data) {
                this.slaMainData = Array.of(data)[0];
                this.callFunction("wifi");
                this.pageNo = 1;
            }
        }, error => {
        });
    }

    callFunction(radioButton) {
        this.slaData = this.slaMainData[radioButton];
        this.timeline = 'Last 10 hour';
        this.dataElement = 'data';
        this.slaTabClick("Surge");
    }

    slaTabClick(tab) {
        this.activeTab = tab;
        var mainData = this.slaData;
        var labelIndex = mainData.map(function (d) { return d['label']; }).indexOf(tab);
        var timelineIndex = mainData[labelIndex].labelData.map(function (d) { return d['timeline']; }).indexOf(this.timeline);
        this.barChartLabels = mainData[labelIndex].labelData[timelineIndex].ngChartGraphData.labels;
        this.barChartData = mainData[labelIndex].labelData[timelineIndex].ngChartGraphData.chartData;
        this.barChartCaption = mainData[labelIndex].labelData[timelineIndex].ngChartGraphData.chart.caption;
    }

    chartClicked(e: any) {
        if (e.active[0] == undefined) {
            return false;
        }
        var clickedLabel = e.active[0]._model.label;
        var chartData = this.slaData;
        var tabIndex = chartData.map(function (d) { return d['label']; }).indexOf(this.activeTab);
        var chartTimelineIndex = chartData[tabIndex].labelData.map(function (d) { return d['timeline']; }).indexOf(this.timeline);
        if (this.dataElement == "data") {
            this.chartTimelineData = chartData[tabIndex].labelData[chartTimelineIndex].data;
        } else {
            this.chartTimelineData = chartData[tabIndex].labelData[chartTimelineIndex].data2;
        }
        var resultIndex = this.chartTimelineData.map(function (d) { return d['time']; }).indexOf(clickedLabel);
        this.getConsumptionDetails(this.chartTimelineData[resultIndex]);

    }

    getConsumptionDetails(record: any) {
        this.specificTimeline = record
    }

}


