import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BuildMySolutionService, AlertService } from '../services/index';

@Component({
  selector: 'svc-widget',
  templateUrl: './svc-widget.component.html',
  styleUrls: ['./svc-widget.css']
})
export class SvcWidgetComponent implements OnInit {
  @Output() bomTemplateEventEmitterFunc = new EventEmitter();
  svc: any;
  bomTemplate: string = 'T01';
  bomData: any;
  bomTemplateData: any;

  model: any = {
    'svc_1': {},
    'svc_2': {},
    'svc_3': {},
    'svc_4': {}
  };

  constructor(private router: Router, private buildMySolutionService: BuildMySolutionService, private alertService: AlertService) { }

  ngOnInit() {
    //getting bom template data
    this.buildMySolutionService.getSvc().subscribe(response => {
      this.svc = response;
    }, error => {
      this.alertService.error(error);
    });

    //getting bom template data
    this.buildMySolutionService.getBom().subscribe(response => {
      if (response) {
        //var jsonBomData = Array.of(data);
        //this.bomData = jsonBomData[0].data.bomTemplates;
        this.bomData = response.data.bomTemplates;
        this.determineBOMTemplate();
      }
    }, error => {
      this.alertService.error(error);
    });

    var selectSvcData = JSON.parse(sessionStorage.getItem('selectSvcData'));
    if (selectSvcData) {
      //console.log(JSON.stringify(selectSvcData));
      //console.log(selectSvcData);
      this.model = selectSvcData;
    } else {

      this.model['svc_1'] = {};
      this.model['svc_1']['chk_svc_1'] = false;
      this.model['svc_1']['needVes'] = {};
      this.model['svc_1']['needVes']['yes'] = {};
      this.model['svc_1']['needVes']['no'] = {};
      this.model['svc_1']['radNeedVes'] = "no";
      this.model['svc_1']['needVes']['yes']['selectEquipment'] = 'CISCO';
      this.model['svc_1']['needVes']['no']['userNumber'] = '99';
      this.model['svc_1']['needVes']['no']['conferenceAreas'] = '2';
      this.model['svc_1']['needVes']['no']['receptions'] = '2';
      this.model['svc_1']['needVes']['no']['commonAreas'] = '2';
      this.model['svc_1']['needVes']['no']['voiceCarrier'] = 'Other';

      this.model['svc_2'] = {};
      this.model['svc_2']['chk_svc_2'] = false;
      this.model['svc_2']['needVes'] = {};
      this.model['svc_2']['needVes']['yes'] = {};
      this.model['svc_2']['needVes']['no'] = {};
      this.model['svc_2']['radNeedVes'] = "no";
      this.model['svc_2']['needVes']['yes']['selectEquipment'] = 'CISCO';
      this.model['svc_2']['needVes']['no']['userNumber'] = '99';
      this.model['svc_2']['needVes']['no']['conferenceAreas'] = '2';
      this.model['svc_2']['needVes']['no']['receptions'] = '2';
      this.model['svc_2']['needVes']['no']['commonAreas'] = '2';
      this.model['svc_2']['needVes']['no']['lanProvider'] = 'Other';

      this.model['svc_3'] = {};
      this.model['svc_3']['chk_svc_3'] = false;
      this.model['svc_3']['needVes'] = {};
      this.model['svc_3']['needVes']['yes'] = {};
      this.model['svc_3']['needVes']['no'] = {};
      this.model['svc_3']['radNeedVes'] = "no";
      this.model['svc_3']['needVes']['yes']['floorNumber'] = '2';
      this.model['svc_3']['needVes']['yes']['areasOfEachFloor'] = '2k';
      this.model['svc_3']['needVes']['yes']['permanentUserNumber'] = '99';
      this.model['svc_3']['needVes']['yes']['visitorsNumber'] = '99';
      this.model['svc_3']['needVes']['yes']['ssidsNumber'] = '4';
      this.model['svc_3']['needVes']['no']['permanentUserNumber'] = '99';
      this.model['svc_3']['needVes']['no']['visitorsNumber'] = '99';
      this.model['svc_3']['needVes']['no']['ssidsNumber'] = '4';

      this.model['svc_4'] = {};
      this.model['svc_4']['chk_svc_4'] = false;
      this.model['svc_4']['radOwnDataCenterRemoteAccess'] = 'no';
      this.model['svc_4']['radAwsHostedRemoteAccess'] = 'no';
      this.model['svc_4']['radSfdcHostedRemoteAccess'] = 'no';
      this.model['svc_4']['radInternetBasedApplicationAccess'] = 'yes';
      this.model['svc_4']['needVes'] = {};
      this.model['svc_4']['needVes']['yes'] = {};
      this.model['svc_4']['needVes']['yes']['concurrentUsersOwnDataCenterRemoteAccess'] = '99';
      this.model['svc_4']['needVes']['yes']['concurrentUsersAwsHostedRemoteAccess'] = '99';
      this.model['svc_4']['needVes']['yes']['concurrentUsersSfdcHostedRemoteAccess'] = '99';
      this.model['svc_4']['needVes']['yes']['concurrentUsersInternetBasedApplicationAccess'] = '99';
    }
  }

  determineBOMTemplate() {
    this.calculateBOMTemplate();
    this.bomTemplateEventEmitterFunc.emit({ 'bomTemplate': this.bomTemplate, 'bomTemplateData': this.bomTemplateData });
  }

  calculateBOMTemplate() {
    this.bomTemplate = 'T01';

    if (this.model.svc_3.chk_svc_3 == true) {
      //console.log('Wifi is selected');
      this.bomTemplate = 'T02';
    }
    if (this.model.svc_1.chk_svc_1 == true && this.model.svc_1.radNeedVes == 'no') {
      //console.log('Voice is selected. No need VES service');
      this.bomTemplate = 'T03';
    }
    if (this.model.svc_4.chk_svc_4 == true && this.model.svc_4.radSfdcHostedRemoteAccess == 'yes') {
      //console.log('WAN is selected. Need SFDC Hosted Remote Access');
      this.bomTemplate = 'T04';
    }
    if (this.model.svc_4.chk_svc_4 == true && this.model.svc_4.radOwnDataCenterRemoteAccess == 'yes') {
      //console.log('WAN is selected. Need Own Data Center Remote Access');
      this.bomTemplate = 'T05';
    }
    if (this.model.svc_1.chk_svc_1 == true && this.model.svc_1.radNeedVes == 'yes') {
      //console.log('Voice is selected. No need VES service');
      this.bomTemplate = 'T06';
    }

    var index = this.bomData.map(function (d) { return d['bomTemplateId']; }).indexOf(this.bomTemplate);
    this.bomTemplateData = this.bomData[index];
  }

  save() {
    //adding svc question json to the model
    for (let service of this.svc) {
      this.model[service.model]['svc_display_json'] = service;
    }

    sessionStorage.removeItem('selectSvcData');
    sessionStorage.setItem('selectSvcData', JSON.stringify(this.model));

    sessionStorage.removeItem('bomTemplate');
    sessionStorage.setItem('bomTemplate', this.bomTemplate);

    sessionStorage.removeItem('bomTemplateData');
    sessionStorage.setItem('bomTemplateData', JSON.stringify(this.bomTemplateData));

    this.router.navigate(['/build-my-solution/bill-of-material']);
  }

}
