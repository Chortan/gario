import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { CorsService} from './cors.service';
import { SncfService} from './station/sncf.service';
import { WeatherService } from './weather/weather.service';
import { ImagesService } from './images.service';
import { TranslateService } from './translate.service';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { StationComponent } from './station/station.component';
import { WeatherComponent } from './weather/weather.component';
import { UnavailableComponent } from './unavailable/unavailable.component';
import { LoaderComponent } from './loader/loader.component';
import { TrashesComponent } from './trashes/trashes.component';
import { TrashComponent } from './trashes/trash/trash.component';
import { WeekPipe } from './week-number.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StationComponent,
    WeatherComponent,
    UnavailableComponent,
    LoaderComponent,
    TrashesComponent,
    TrashComponent,
    WeekPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ 
    SncfService, 
    WeatherService, 
    CorsService, 
    ImagesService, 
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
