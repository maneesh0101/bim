import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BuildMySolutionService, AlertService } from '../services/index';

@Component({
  templateUrl: 'bms-track-order.component.html',
  styleUrls: ['./bms-track-order.css']
})

export class BmsTrackOrderComponent implements OnInit {
  stepNumber: string = '4';
  trackOrder: any;
  bomTemplate: string = 'T01';
  bomTemplateData: any;

  constructor(private router: Router, private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) {
  }

  ngOnInit() {
    var template = sessionStorage.getItem('bomTemplate');
    if (template) {
      this.bomTemplate = template;
      this.bomTemplateData = JSON.parse(sessionStorage.getItem('bomTemplateData'));
    }

    this.buildMySolutionService.getTrackOrder().subscribe(data => {
      if (data) {
        this.trackOrder = data[this.bomTemplate];
      }
    }, error => {

    });
  }
}
