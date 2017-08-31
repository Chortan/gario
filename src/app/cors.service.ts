import { Injectable, isDevMode } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class CorsService {
  host : string = isDevMode() ? '127.0.0.1' : 'cors.roimarmier.xyz';
  port : number = isDevMode() ? 8080 : 80;
  corsApi = "http://"+this.host+":"+this.port+"/";
  corsImageApi = this.corsApi+ "images"

  constructor(private http:Http) { }

  isOpen() : Observable<boolean>{
    return this.http.get(this.corsApi).map(this.extractData);
  }

  extractData(res:Response):boolean{
    return res.status>=200;
  }

  extractDataJson(res:Response):Data{
     if (res.status < 200 || res.status >= 400) {
        throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body ;
  }

  getData() : Observable<Data>{
  return this.http.get("/assets/data.json").map(this.extractDataJson);
}

}




export class RequestCORS{
    url:string;
    apikey:string;
    
    constructor(url:string,apikey:string){
        this.url = url;
        this.apikey = apikey;
    }
  
}

export class Data{
  from:string;
  to:string;
  trashes : Trash[] =[]; 
}

export class Trash{
  dayWeek : number;
  evenWeeks : boolean;
  oddWeeks : boolean;
  name : string;
  color : string;
  type : number;
}