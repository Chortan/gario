import { Component, OnInit } from '@angular/core';
import { SncfService } from "./sncf.service";
import { Sncf, StopArea, Place,Link,Journey } from "./station";


@Component({
  selector: 'app-station',
  templateUrl: './station.component.html',
  styleUrls: ['./station.component.css']
})
export class StationComponent implements OnInit {

  from: StopArea = new StopArea();
  to: StopArea = new StopArea();

  journeys:Journey[] = [new Journey()];

  fromRequested:boolean = false;
  toRequested:boolean = false;

  process:boolean=true;
  
  constructor(private sncf:SncfService) { }

  ngOnInit() {
    this.from.name="Benfeld";
    this.to.name="Strasbourg-Strasbourg";
    this.getGare();

    let truc:any[];

    
    
  }

  convertDate(dateString : string): string[]{
    let fullDateRegex = /([0-9]{4})([0-9]{2})([0-9]{2})T([0-9]{2})([0-9]{2})([0-9]{2})/
    let matches = fullDateRegex.exec(dateString);
    return matches;
  }

  getTravel(nb_travel:number){
    let timestamp =  new Date().getTime() + (3600*7);
    console.log("now:"+new Date().getTime()+" +7h = "+timestamp);
    this.sncf.getTravel(this.from,this.to,nb_travel,this.getDateTime(Date.now())).subscribe((event:Sncf)=>{
      
      if(event.journeys.length >= 1){
        this.journeys = event.journeys;
        this.sncf.getFromLink(event.journeys[0].links[0]).subscribe((finalTravels:Sncf)=>{
          this.journeys = finalTravels.journeys;
          this.process = false;
        });
      }
       
    });
  }

  click(){
    this.getTravel(15);
  }

  getDateTime(timestamp:number) : string{
    let d:Date = new Date(timestamp);
    let year:string = d.getFullYear()+"";
    let day:string = d.getDate()<10 ? "0"+d.getDate() : d.getDate()+"";
    let mounth:string =  d.getMonth()+1<10 ? "0"+(d.getMonth()+1) : (d.getMonth()+1)+"";
    let hours:string = d.getHours()<10 ? "0"+d.getHours() : d.getHours()+"";
    let minutes:string = d.getMinutes()<10 ? "0"+d.getMinutes() : d.getMinutes()+"";
    let secondes:string = d.getSeconds()<10 ? "0"+d.getSeconds() : d.getSeconds()+"";
    let timeSncfFormat:string=year+mounth+day+"T"+hours+minutes+secondes;
    console.log(timeSncfFormat)
    return timeSncfFormat;
  }

  getGare(){
    let places:Place[];
    this.sncf.getStation(this.from.name).subscribe(sncf => {
      places = sncf.places;
      for(let place of places){
        if(place.embedded_type == "stop_area"){
           this.from = place.stop_area;
           break;
        }
      }
      this.fromRequested = true;
      this.handler();
    });
    this.sncf.getStation(this.to.name).subscribe(sncf => {
      places = sncf.places;
      for(let place of places){
        if(place.embedded_type == "stop_area"){
           this.to = place.stop_area;
           break;
        }
      }
      this.toRequested = true;
      this.handler();
    });
  }

  handler(){
    if(this.fromRequested && this.toRequested){
      this.getTravel(15);
    }
  }

}
