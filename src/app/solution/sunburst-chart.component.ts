import { Component, OnInit, Input } from '@angular/core';
import { BuildMySolutionService, AlertService } from '../services/index';

@Component({
    selector: 'sunburst-chart',
    inputs: ['inputBomTemplate', 'inputBomTemplateData'],
    templateUrl: 'sunburst-chart.component.html',
    styleUrls: ['./sunburst-chart.component.css']
})

export class SunburstChartComponent implements OnInit {
    @Input() inputBomTemplate: any;
    @Input() inputBomTemplateData: any;
    bomData: any;
    options: any;
    data: any;
    bomTemplate: string = 'T01';
    bomTemplateData: any;
    costType: string = 'MRC';
    cMrcJson: any = [];
    cNrcJson: any = [];

    total: any = {
        'T01': '$ 322',
        'T02': '$ 442',
        'T03': '$ 637',
        'T04': '$ 732',
        'T05': '$ 827',
        'T06': '$ 1377'
    };
    totalNRC: any = {
        'T01': '$ 2665',
        'T02': '$ 3440',
        'T03': '$ 3440',
        'T04': '$ 3990',
        'T05': '$ 5190',
        'T06': '$ 6515'
    };
    calculatedTotal: string;
    calculatedTotalnrc: string;

    constructor(private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) { }

    ngOnInit() {
        this.bomTemplate = this.inputBomTemplate;
        this.bomTemplateData = this.inputBomTemplateData;
        this.calculatedTotal = this.total[this.bomTemplate];
        this.calculatedTotalnrc = this.totalNRC[this.bomTemplate];

        this.options = {
            chart: {
                type: 'sunburstChart',
                height: 250,
                mode: "value",
                margin: {
                    top: 1,
                    right: 1,
                    bottom: 10,
                    left: 1
                },
                tooltip: {
                    contentGenerator: function (e) {
                        var series = e.series[0];
                        if (series.value === null) return;
                        var header =
                            "<thead>" +
                            "<tr>" +
                            "<td class='key'><strong style='font-size:18px;'>" + series.key + ' ' + series.value + "</strong></td>" +
                            "</tr>" +
                            "</thead>";

                        document.getElementsByClassName("sunBurstToolText")[0].innerHTML =
                            "<table>" +
                            header +
                            "</table>"
                    }
                },
                callback: function (chart) {
                    chart.sunburst.dispatch.on('elementMouseout', function (e) {
                        document.getElementsByClassName("sunBurstToolText")[0].innerHTML = "";
                    });
                }

            }
        };

        this.createChartData();
    }

    createChartData() {
        this.cMrcJson = [];
        this.cNrcJson = [];
        this.cMrcJson.push({ "name": "Total", "color": "#ffffff", "children": [] });
        this.cNrcJson.push({ "name": "Total", "color": "#ffffff", "children": [] });
        for (let family of this.bomTemplateData.products) {
            var childMrc = [];
            var childNrc = [];
            for (let item of family.items) {
                childMrc.push({ "name": item.itemName, "size": item.monthlyRecurring });
                childNrc.push({ "name": item.itemName, "size": item.oneTimeCharge });
            }
            this.cMrcJson[0]["children"].push({ "name": family.family, "children": childMrc });
            this.cNrcJson[0]["children"].push({ "name": family.family, "children": childNrc });
        }
        this.setCostType('MRC');
    }

    ngOnChanges(changes: any) {
        if (changes.inputBomTemplate.previousValue && changes.inputBomTemplate.currentValue !== changes.inputBomTemplate.previousValue) {
            this.bomTemplate = changes.inputBomTemplate.currentValue;
            this.bomTemplateData = changes.inputBomTemplateData.currentValue;
            this.createChartData();
            if (this.costType == "MRC") {
                this.data = this.cMrcJson;
            } else {
                this.data = this.cNrcJson;
            }
            this.calculatedTotal = this.total[this.bomTemplate];
            this.calculatedTotalnrc = this.totalNRC[this.bomTemplate];
        }
    }

    setCostType(type) {
        if (type == "MRC") {
            this.data = this.cMrcJson;
            this.costType = "MRC";
        } else {
            this.data = this.cNrcJson;
            this.costType = "NRC";
        }
    }

}
