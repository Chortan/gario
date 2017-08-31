import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http"

import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class TranslateService {

  api:string = "https://api.freetranslation.com/freetranslation/translations/text";

  constructor(private http:Http) { }

  translate(request:RequestTranslate): Observable<ResponseTranslate>{
    return this.http.post(this.api,request).map(this.extractData).catch(this.handleError);
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

export class RequestTranslate{
  text	: string;
  from  : string;
  to	  : string;
}

export class ResponseTranslate{
  from  :	string;
  to	  : string;
  wordCount :	number;
  charCount :	number;
  translation	: string;
  partialTranslation: boolean;
}