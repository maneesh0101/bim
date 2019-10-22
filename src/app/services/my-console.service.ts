import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';

@Injectable()
export class MyConsoleService {
    constructor( private http: Http, private globals: Globals ) {
    }

    getConsoleData() {
        return this.http.get( 'assets/json/myConsole.json', this.globals.globalHttpHeader() ).map(( response: Response ) => response.json() );
    }

    getSolutionData() {
        return this.http.get('assets/json/solutionInsight.json', this.globals.globalHttpHeader() ).map(( response: Response ) => response.json() );
    }  
    getsendInviteData(sentInviteData)  
     {
     	console.log(JSON.stringify(sentInviteData));
        return this.http.post('//50.226.36.93/useraccessservice/apis/bimpaas/access',JSON.stringify(sentInviteData),this.globals.globalHttpHeader()).map(( response: Response ) => response.json() );
    }  
}
