import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';

@Injectable()
export class MyAutomationService {
    constructor(private http: Http, private globals: Globals) {
    }

    getPolicies() {
        return this.http.get('assets/json/eramp.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    getPoliciesCriterias() {
        return this.http.get('assets/json/eramp-policies-criterias.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }
}
