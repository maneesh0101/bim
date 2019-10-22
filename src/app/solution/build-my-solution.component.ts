import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildMySolutionService, AlertService } from '../services/index';

@Component({
    templateUrl: 'build-my-solution.component.html',
    styleUrls: ['./build-my-solution.css']
})

export class BuildMySolutionComponent implements OnInit {
    bomTemplate: string;
    bomTemplateData: any;
    stepNumber: string = '1';

    constructor(private router: Router, private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) {
        //sessionStorage.clear();
    }

    ngOnInit() {
        /*var selectSvcData = JSON.parse(sessionStorage.getItem('selectSvcData'));
        if (selectSvcData) {
            this.bomTemplate = sessionStorage.getItem('bomTemplate');
            this.bomTemplateData = JSON.parse(sessionStorage.getItem('bomTemplateData'));
        }*/
    }

    getBOMTemplateFromWidget($event) {
        this.bomTemplate = $event.bomTemplate;
        this.bomTemplateData = $event.bomTemplateData;
    }
}
