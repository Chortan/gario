import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class CorsService {
  corsApi = "http://127.0.0.1:8080/"
  corsImageApi = "http://127.0.0.1:8080/images"

  constructor(private http:Http) { }

  isOpen() : Observable<boolean>{
    return this.http.get(this.corsApi).map(this.extractData);
  }

  extractData(res:Response):boolean{
    return res.status>=200;
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