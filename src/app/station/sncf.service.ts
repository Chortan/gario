import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Http, Response } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import {Sncf,StopArea,Link} from './station';
import { RequestCORS } from  "../cors-api";
import { CorsService } from  "../cors.service";

@Injectable()
export class SncfService {

  private headers:Headers;
  private requestOptions:RequestOptions;

  private apikey:string = "8fcce52d-6830-47da-982a-97eba1e856c5";
  private apiVersion = "v1";
  private apiUrl:string = "https://"+this.apikey+"@api.sncf.com/"+this.apiVersion+"/";

  private stationUrl:string = this.apiUrl+"coverage/sncf/places";
  private travelUrl:string = this.apiUrl+"coverage/sncf/journeys";
  private requestCors:RequestCORS;

  constructor(private http:Http, private cors:CorsService) {
    this.headers = new Headers();
    this.requestOptions = new RequestOptions({ headers: this.headers });
    this.headers.append('Authorization', btoa(this.apikey));
    this.headers.append('Content-Type', 'application/json');
   }

   

  getStation(stationName:string): Observable<Sncf>{
    this.requestCors = new RequestCORS(this.stationUrl+"?q="+stationName,this.apikey);
    return this.http.post(this.cors.corsApi,this.requestCors)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getTravel(from:StopArea, to:StopArea,nb_travel:number,date_time:string): Observable<any>{
    this.requestCors = new RequestCORS(this.travelUrl+"?from="+from.id+"&to="+to.id+"&=nb_sections="+nb_travel+"&max_nb_transfers=0"+"&datetime="+date_time,this.apikey);
    return this.http.post(this.cors.corsApi,this.requestCors)
    .map(this.extractData)
    .catch(this.handleError);
  }

  getFromLink(link:Link) : Observable<any>{
    this.requestCors = new RequestCORS(link.href,this.apikey);
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
        console.log(errMsg);
        return Observable.throw(errMsg);
    }  

}


