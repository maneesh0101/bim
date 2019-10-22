import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService, AuthenticationService, AlertService } from '../../services/index';

@Component({
  selector: 'app-step-3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.css'],
  providers: [AuthenticationService]
})
export class Step3Component implements OnInit {
  model: any = {};
  loading: boolean = false;
  step: string = 'step3';

  constructor(private router: Router, private registrationService: RegistrationService, private authenticationService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit() {
  }

  save(isFormValid) {
    if(this.loading == true) {
      return false;
    }

    if (this.model.verCode.length != 4 || isFormValid != true) {
      return false;
    }

    this.loading = true;

    var sessionCustomerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));

    var verifyOtpModel = {
      "accountName": sessionCustomerDetails.customerAccountName,
      "emailId": sessionCustomerDetails.customerEmailId,
      "verificationCode": this.model.verCode
    }

    this.registrationService.verifyOtp(verifyOtpModel).subscribe(otpData => {
      if (otpData.result == 'success') {

        /*//Remove below: START
        var currentUser = {
          username: sessionCustomerDetails.customerAccountName,
          email: sessionCustomerDetails.customerEmailId
        };
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        sessionStorage.removeItem('customerDetails');
        this.router.navigate(['/homepage']);
        //Remove below: END
        */

        //login user
        this.authenticationService.login(sessionCustomerDetails.customerAccountName, sessionCustomerDetails.password).subscribe(response => {
          if (response.result == 'success') {
            var currentUser = {
              username: response.data.customerAccountName,
              email: response.data.customerEmailId
            };
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            sessionStorage.removeItem('customerDetails');
            this.router.navigate(['/homepage']);
          } else {
            this.alertService.error(response.data);
          }
          this.loading = false;
        }, error => {
          var errorMessage = JSON.parse(error['_body'])['data'];
          this.alertService.error(errorMessage);
          this.loading = false;
        });
      } else {
        this.alertService.error(otpData.data);
      }
      this.loading = false;
    }, error => {
      var errorMessage = JSON.parse(error['_body'])['data'];
      this.alertService.error(errorMessage);
      this.loading = false;
    });
  }

}
