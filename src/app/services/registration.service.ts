import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';
import { environment } from '../../environments/environment';

@Injectable()
export class RegistrationService {
    constructor(private http: Http, private globals: Globals) {
    }

    getLogin() {
        return this.http.get('assets/json/login.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    getCreateProfile() {
        return this.http.get('assets/json/profile.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    getCreditCard() {
        return this.http.get('assets/json/creditCard.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    checkUserExist(accountName, emailId) {
        return this.http.get(environment.webservices.registerIfExist + '?accountName=' + accountName + '&emailId=' + emailId, this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    createProfile(model) {
        return this.http.post(environment.webservices.registerUser, JSON.stringify(model), this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    /*generateOtp(otpModel) {
        return this.http.post(this.globals.serviceUrl + 'customer/otp/generate', JSON.stringify(otpModel), this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }*/

    verifyOtp(verifyOtpModel) {
        return this.http.post(environment.webservices.verifyOtp, JSON.stringify(verifyOtpModel), this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    verifyCreditCard(model) {
        return this.http.post(environment.webservices.registerCcVerify, JSON.stringify(model), this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }
}
