import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildMySolutionService, AlertService } from '../services/index';

@Component({
    templateUrl: 'bill-material.component.html',
    styleUrls: ['./bill-material.css']
})

export class BillMaterialComponent implements OnInit {
    model: any = {};
    bomData: any;
    stepNumber: string = '2';
    bomTemplate: string = 'T01';
    bomTemplateData: any;
    bomTemplateImage: string = 'bom-image-t1.png';
    getTemplateDetail: any = {}
    total: any = {
        'T01': '$ 322',
        'T02': '$ 442',
        'T03': '$ 637',
        'T04': '$ 732',
        'T05': '$ 827',
        'T06': '$ 1377'
    };
    calculatedTotal: string;

    constructor(private router: Router, private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) {
    }

    ngOnInit() {
        var template = sessionStorage.getItem('bomTemplate');
        if (template) {
            this.bomTemplate = template;
            this.bomTemplateData = JSON.parse(sessionStorage.getItem('bomTemplateData'));
            this.bomData = this.bomTemplateData.products;
            this.calculatedTotal = this.total[this.bomTemplate];
        }

        if (this.bomTemplate == 'T02') {
            this.bomTemplateImage = 'bom-image-t2.png';
        }
        if (this.bomTemplate == 'T03') {
            this.bomTemplateImage = 'bom-image-t3.png';
        }
        if (this.bomTemplate == 'T04') {
            this.bomTemplateImage = 'bom-image-t4.png';
        }
        if (this.bomTemplate == 'T05') {
            this.bomTemplateImage = 'bom-image-t5.png';
        }
        if (this.bomTemplate == 'T06') {
            this.bomTemplateImage = 'bom-image-t6.png';
        }
    }

    save() {
        this.router.navigate(['/build-my-solution/place-order']);
    }


}
