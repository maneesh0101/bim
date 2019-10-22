import {Injectable} from "@angular/core";
import {Task} from "../models/index";
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';
import {ExtractData, HandleError} from "./service-helper";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    constructor( private http: Http, private globals: Globals ) {
    }

    getGanttData(): Promise<Task[]> {
        return this.http.get('assets/json/track-order.json')
        .toPromise()
        .then(ExtractData)
        .catch(HandleError);        
    }

    /*get(): Promise<Task[]>{
        return Promise.resolve([
            {id: 1, text: "uCPE", start_date: "2017-04-15 00:00", duration: 3, progress: 0.6},
            {id: 2, text: "Basic Config", start_date: "2017-04-18 00:00", duration: 3, progress: 0.4},
            {id: 3, text: "Installation Service", start_date: "2017-04-19 00:00", duration: 3, progress: 0.4}
        ]);
    }*/
}