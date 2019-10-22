import { Injectable } from '@angular/core';
import { Headers, RequestOptions  } from '@angular/http';
import { environment } from '../environments/environment';

Injectable()
export class Globals {
    serviceUrl: string = environment.serviceUrl;

    constructor() {
    }

    /**
     * Used in each http request as request header
     */
    globalHttpHeader() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept':'application/json',
        });
        let options = new RequestOptions ({headers: headers });

        return options;
    }

    /**
     * Used in each http request as request header with token
     */
    globalHttpHeaderToken() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Accept':'application/json',
            //'token':JSON.parse( localStorage.getItem( 'currentUser' ) )['token']
        });
        let options = new RequestOptions ({headers: headers });

        return options;
    }

}
