import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from "./weather.service";
import { RequestTranslate, ResponseTranslate, TranslateService } from "../translate.service";
import { CityWeather } from "./weather";
import { ImagesService, Image, ResultSearch} from "../images.service"

import { Observable } from "rxjs";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(
    private service : WeatherService,
    private imagesService: ImagesService,
    private translateService : TranslateService
  ) { }

  cityWeather : CityWeather = new CityWeather();
  icons="";
  city: string = "Strasbourg";
  image : Image = new Image();
  imageSearched:boolean = false;
  timer:number = 30*60*1000;
  defaultTimerValue:number = 30*60*1000;

  process:boolean=true;

  ngOnInit() {
    this.getWeather();
    this.timer = this.defaultTimerValue;
    this.initTimer();
    
  }

  translateWeather(){
    if(this.cityWeather.weather.length > 0){
      let request:RequestTranslate = new RequestTranslate();
      request.from = "eng";
      request.to = "fra";
      request.text = this.cityWeather.weather[0].main;
      this.translateService.translate(request).subscribe(response=>this.cityWeather.weather[0].main = response.translation)
    }
  }

  initTimer(){
    let timer = Observable.timer(1000);
    timer.subscribe(t=>{
      this.timer-=1000;
      if(this.timer<=0){
        this.getWeather();
        this.timer = this.defaultTimerValue;
      }
      this.initTimer();

    });

  }

  getWeather(){
    this.process = true;
    this.service.getWeather(this.city).subscribe((cityWeather)=>{
      this.cityWeather = cityWeather;
      this.getIcons();
      this.process = false;
      this.translateWeather();
      //this.getImage(this.cityWeather.weather[0].main+" weather");
    });
  }

  getIcons(){
    switch(this.cityWeather.weather[0].main){
      case "Clear": this.icons = "day-sunny"; break;
      case "Rain": this.icons = "day-rain"; break;
      case "Snow": this.icons = "day-snow-wind"; break;
      case "Thunderstorm": this.icons = "day-thunderstorm"; break;
      case "Clouds": this.icons = "cloudy"; break;
      case "Hail": this.icons = "day-hail"; break;
      default : this.icons = "time-3";
    }
  }

  getImage(search:string){
    this.imagesService.search(search).subscribe((response:ResultSearch)=>{
      
      this.image = response.images[this.random(0,response.images.length)];
      let regex = /^(http.*?)\?.*?$/
      this.image.display_sizes[0].uri = regex.exec(this.image.display_sizes[0].uri)[1];
      
      let regexName = /^https:\/\/media\.gettyimages.com\/photos\/(.*?)$/
      this.image.display_sizes[0].uri ="http://127.0.0.1:8080/images/"+regexName.exec(this.image.display_sizes[0].uri)[1]+"/"+this.imagesService.apiKey;
      this.imageSearched = true;
      console.log(this.image);
    });
  }

  random(min:number,max:number) : number{
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}
