import { Injectable, isDevMode } from '@angular/core';
import { Http,Response } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import {CorsService, RequestCORS} from "./cors.service";

@Injectable()
export class ImagesService {
  apiKey:string = isDevMode() ? "ge9cbyd3yfr256ttx88sqdg3" : "zygnj3zwcpgrvt3gpq97rq9y";
  searchImagesUrl:string = "https://api.gettyimages.com/v3/search/images";

  constructor(private http:Http, private corsService:CorsService) { }

  search(text:string) : Observable<ResultSearch>{
    return this.http.post(this.corsService.corsImageApi,new RequestCORS(
      this.searchImagesUrl+"?fields=id,title,thumb,referral_destinations&graphical_styles=photography&minimum_size=xx_large&number_of_people=none&orientations=Horizontal&sort_order=best&phrase="+text,
      this.apiKey
    )).map(this.extractData)
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


export class ResultSearch{
  result_count:number;
  images:Image[] = [];
}

export class Image{
  id:string;
  title:string;
  display_sizes : DisplaySize[] = [];
  referral_destinations : ReferralDestination[] = [];
}

export class DisplaySize{
  is_watermarked:boolean;
  name:string;
  uri:string;
}


export class ReferralDestination{
  site_name:string;
  uri:string;
}