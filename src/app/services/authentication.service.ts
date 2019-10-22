import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Globals } from '../app.globals';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    private serviceUrl: string;
    private token: string;
    constructor(private router: Router, private http: Http, private globals: Globals) {
        //this.serviceUrl = globals.serviceUrl;
    }

    login(username: string, password: string) {
        return this.http.post(environment.webservices.login, JSON.stringify({ customerAccountNameorEmailId: username, customerPassword: password }), this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    logout() {
        sessionStorage.clear();
    }
}
