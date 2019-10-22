import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService, AlertService } from '../../services/index';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DataService } from '../../services/dataservice';
import { Country } from '../../models/country';
import { State } from '../../models/state';

@Component({
  inputs: ['step2Selection'],
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.css'],
  providers: [DataService]
})
export class Step2Component implements OnInit {
  model: any = { address1: '', address2: '', country: '', stateDropdown: '', state: '', city: '', zipcode: '' };
  loading: boolean = false;
  step2Selection: string = 'companySelection';
  isAgreeCheck: boolean = false;
  step: string = 'step2';
  countries: Country[];
  states: State[];
  sessionCustomerDetails: any = {};

  constructor(private router: Router, private modalService: BsModalService, private _dataService: DataService, private registrationService: RegistrationService, private alertService: AlertService) {
    //get country list
    this._dataService.getCountries().subscribe(data => {
      this.countries = data;
    }, error => {
      this.alertService.error(error);
    });
  }

  ngOnInit() {
    //state dropdown
    this.onSelect('US');
    this.model = {
      country: 'US'
    };

    //Auto populate data
    this.sessionCustomerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    if (this.sessionCustomerDetails.customerName) {
      this.model = this.sessionCustomerDetails;
      if (this.model.country == 'US') {
        this.model.stateDropdown = this.sessionCustomerDetails.state;
        this.model.state = '';
      } else {
        this.model.stateDropdown = '';
        this.model.state = this.sessionCustomerDetails.state;
      }

      if (this.sessionCustomerDetails.customerCompanyName == '') {
        this.step2Selection = 'personalSelection';
      } else {
        this.step2Selection = 'companySelection';
      }
    }
  }

  onSelect(countryCode) {
    this._dataService.getStates(countryCode).subscribe(response => {
      this.states = response;
    }, error => {
      this.alertService.error(error);
    });
  }

  toggleAgreeCheck(e) {
    if (e.target.checked) {
      this.isAgreeCheck = true;
    } else {
      this.isAgreeCheck = false;
    }
  }

  save() {
    this.loading = true;
    if (this.step2Selection == 'personalSelection') {
      this.model.customerCompanyName = '';
    }
    this.model.state = (this.model.country == 'US') ? this.model.stateDropdown : this.model.state;
    var customerDetails = Object.assign(this.sessionCustomerDetails, this.model);

    this.registrationService.createProfile(customerDetails).subscribe(response => {
      if (response.result == 'success') {
        sessionStorage.setItem('customerDetails', JSON.stringify(customerDetails));
        if (this.step2Selection == 'companySelection') {
          this.router.navigate(['/step-03']);
        } else {
          this.router.navigate(['/step-03-ccv']);
        }
      } else {
        this.alertService.error(response.data);
      }
      this.loading = false;
    }, error => {
      var errorMessage = JSON.parse(error['_body'])['data'];
      this.alertService.error(errorMessage);
      this.loading = false;
    });
  }
}
