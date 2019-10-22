import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../services/dataservice';
import { Country } from '../../models/country';
import { State } from '../../models/state';
import { RegistrationService, AlertService } from '../../services/index';

@Component({
  templateUrl: './step-3-ccv.component.html',
  styleUrls: ['./step-3-ccv.component.css'],
  providers: [DataService]
})
export class Step3CcvComponent implements OnInit {

  model: any = {};
  loading: boolean = false;
  step: string = 'step3';
  diffBillAddr: boolean = true;
  expCcCheckError: boolean = false;

  yearList: any = [];
  monthList: any = [];
  //state dropdown
  countries: Country[];
  states: State[];

  constructor(private _dataService: DataService, private router: Router, private registrationService: RegistrationService, private alertService: AlertService) {
    //get country list
    this._dataService.getCountries().subscribe(data => {
      this.countries = data;
    }, error => {
      this.alertService.error(error);
    });

    var curYear = (new Date()).getFullYear();
    for (var a = curYear; a <= (curYear + 10); a++) {
      this.yearList.push(a);
    }
  }

  onSelect(countryCode) {
    this._dataService.getStates(countryCode).subscribe(response => {
      this.states = response;
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
  }

  toggleDiffBillAddr(e) {
    if (e.target.checked) {
      this.diffBillAddr = false;
    } else {
      this.diffBillAddr = true;
    }
  }

  monthYearValidation(year, month) {
    if (!month) {
      this.expCcCheckError = true;
      return false;
    }
    var dateObj = new Date();
    var curMonth = dateObj.getUTCMonth();
    var curYear = dateObj.getUTCFullYear();
    //console.log(curMonth+'-'+curYear);
    var minusmonth = month - 1;
    var x = new Date(year, minusmonth, 1);
    var y = new Date(curYear, curMonth, 1);
    if (x < y) {
      this.expCcCheckError = true;
    } else {
      this.expCcCheckError = false;
    }
  }

  save() {
    this.loading = true;
    var sessionCustomerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));

    var ccData = {
      "accountName": sessionCustomerDetails.customerAccountName,
      "emailID": sessionCustomerDetails.customerEmailId,
      "creditCardHolderName": this.model.creditCardHolderName,
      "creditCardNumber": this.model.ccrNum1 + this.model.ccrNum2 + this.model.ccrNum3 + this.model.ccrNum4,
      "expiryDate": this.model.expMonth + '/' + this.model.expYear,
      "securityCode": this.model.securityCode,
      "address": {},
    }

    if (this.diffBillAddr == false) {
      ccData.address = {
        "address1": this.model.address1,
        "address2": this.model.address2,
        "city": this.model.city,
        "country": this.model.country,
        "state": (this.model.country == 'US') ? this.model.stateDropdown : this.model.state,
        "zipcode": this.model.zipcode
      }
    }

    this.registrationService.verifyCreditCard(ccData).subscribe(response => {
      if (response.result == 'success') {
        this.router.navigate(['/step-03']);
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
