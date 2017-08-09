import { Component, OnInit } from '@angular/core';

import { CorsService } from "./cors.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  process : boolean = true;
  serviceAvailable : boolean = false;


  constructor(private service:CorsService){
    
  }


  checkService(){
    this.service.isOpen().subscribe((ok)=>{
      this.process = false;
      this.serviceAvailable = true;
    },(err)=>{
      this.process = false;
      this.timer();
    });
  }


  timer(){
    let timer = Observable.timer(2000);
    timer.subscribe(t=>this.checkService());
  }

  ngOnInit(){
    this.checkService();
  }
}
