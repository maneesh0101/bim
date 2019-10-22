import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';

@Injectable()
export class BuildMySolutionService {
    constructor(private http: Http, private globals: Globals) {
    }

    getSvc() {
        return this.http.get('assets/json/svc-selection.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }

    getBom() {
        return this.http.get( 'assets/json/bomlist.json', this.globals.globalHttpHeader() ).map(( response: Response ) => response.json() );
    }
    
    getPlaceOrder() {
        return this.http.get( 'assets/json/placeOrder.json', this.globals.globalHttpHeader() ).map(( response: Response ) => response.json() );
    }

    getTrackOrder() {
        return this.http.get('assets/json/track-order.json', this.globals.globalHttpHeader()).map((response: Response) => response.json());
    }
}
