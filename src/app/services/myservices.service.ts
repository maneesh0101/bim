import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';

@Injectable()
export class MyservicesService {
    constructor( private http: Http, private globals: Globals ) {
    }

    getServices() {
        return this.http.get('assets/json/slaDashboard.json', this.globals.globalHttpHeader() ).map(( response: Response ) => response.json() );
    }

}
