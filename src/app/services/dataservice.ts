import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Globals } from '../app.globals';
import { environment } from '../../environments/environment';
import { Country } from '../models/country';
import { State } from '../models/state';

@Injectable()
export class DataService {

  constructor(private http: Http, private globals: Globals) {
  }

  getCountries() {
    return this.http.get(environment.webservices.getCountries, this.globals.globalHttpHeader()).map((response: Response) => {
      var countryJson = response.json();
      var countryObj = [];
      if (countryJson.result == 'success') {
        for (let country of countryJson.data) {
          countryObj.push(new Country(country.countryCode, country.countryName));
        }
      }
      return countryObj;
    });
  }

  getStates(countryCode) {
    return this.http.get(environment.webservices.getStates + '/' + countryCode, this.globals.globalHttpHeader()).map((response: Response) => {
      var stateJson = response.json();
      var stateObj = [];
      if (stateJson.result == 'success') {
        let i = 1;
        for (let state of stateJson.data) {
          stateObj.push(new State(state.countryCode, state.stateName, state.stateCode));
          i++;
        }
      }
      return stateObj;
    });
  }
}
