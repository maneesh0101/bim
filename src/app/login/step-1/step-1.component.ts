import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService, AlertService } from '../../services/index';

@Component({
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.css']
})
export class Step1Component implements OnInit {
  model: any = {};
  step: string = 'step1';
  passwordFocus: boolean = false;
  dataId: string;
  sessionCustomerDetails: any = {};
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private registrationService: RegistrationService, private alertService: AlertService) { }

  ngOnInit() {
    //get id from the url
    this.activatedRoute.paramMap.subscribe(params => {
      this.dataId = params.get('id');
    });
    if (this.dataId) {
      this.registrationService.getLogin().subscribe(data => {
        if (data) {
          this.model = data;
          this.model.confirmPassword = data.password;
        }
      }, error => {
        this.alertService.error(error);
      });
    }

    //Auto populate data from session storage
    this.sessionCustomerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    if (this.sessionCustomerDetails) {
      this.model = this.sessionCustomerDetails;
    }
  }

  save() {
    if (this.model.confirmPassword != this.model.password) {
      return false;
    }

    this.loading = true;
	sessionStorage.setItem('customerDetails', JSON.stringify(this.model));
    this.router.navigate(['/step-02']);

    /*this.registrationService.checkUserExist(this.model.customerAccountName, this.model.customerEmailId).subscribe(response => {
      if (response.result == 'success') {
        sessionStorage.setItem('customerDetails', JSON.stringify(this.model));
        this.router.navigate(['/step-02']);
      } else {
        this.alertService.error(response.data);
      }

      this.loading = false;
    }, error => {
      var errorMessage = JSON.parse(error['_body'])['data'];
      this.alertService.error(errorMessage);
      this.loading = false;
    });*/

  }
}
