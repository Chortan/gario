import { Injectable } from '@angular/core';

import { Response, Http} from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { CityWeather } from "./weather";
import { RequestCORS } from "../cors-api";

@Injectable()
export class WeatherService {
  private corsUrl : string = "http://127.0.0.1:8080"
  private apikey : string = "5d31621c9bda6b0627e940db30f9c5a8";

  private cityWeatherUrl : string = "http://api.openweathermap.org/data/2.5/weather"
  constructor(private http:Http) { }

  getWeather(city:string) : Observable<CityWeather>{
    let cors:RequestCORS = new RequestCORS(this.cityWeatherUrl+"?q=" + city + ",fr&appid="+this.apikey,"");
    return this.http.post(this.corsUrl,cors)
    .map(this.extractData)
    .catch(this.handleError);
  }

   private extractData(res: Response) {
        if (res.status < 200 || res.status >= 400) {
        throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body ;
    }
    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.log(errMsg);
        return Observable.throw(errMsg);
    }  
}
