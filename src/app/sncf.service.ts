import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import {Sncf} from './station/station';

import { CorsService } from "./cors.service";

@Injectable()
export class SncfService {

  private headers:Headers;
  private requestOptions:RequestOptions;

  private apikey:string = "8fcce52d-6830-47da-982a-97eba1e856c5";
  private apiVersion = "v1";
  private apiUrl:string = "https://"+this.apikey+"@api.sncf.com/"+this.apiVersion+"/";
  private corsServer : string;

  private stationUrl:string = this.apiUrl+"coverage/sncf/places";

  private requestCors:RequestCORS;

  constructor(private http:Http, private cors:CorsService) {
    console.log("url="+this.cors.corsApi)
    this.corsServer = this.cors.corsApi;
    this.headers = new Headers();
    this.requestOptions = new RequestOptions({ headers: this.headers });
    this.headers.append('Authorization', btoa(this.apikey));
    this.headers.append('Content-Type', 'application/json');

    this.requestCors = new RequestCORS();
    this.requestCors.apikey = this.apikey;
   }

   

  getStation(stationName:string): Observable<Sncf>{
    this.requestCors.url = this.stationUrl+"?q="+stationName;
    return this.http.post(this.cors.corsApi,this.requestCors)
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
        return Observable.throw(errMsg);
    }  

}


export class RequestCORS{
  url:string;
  apikey:string;
}