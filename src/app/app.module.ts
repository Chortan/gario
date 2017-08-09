import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { CorsService} from './cors.service';
import { SncfService} from './station/sncf.service';
import { WeatherService } from './weather/weather.service';
import { ImagesService } from './images.service';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { StationComponent } from './station/station.component';
import { WeatherComponent } from './weather/weather.component';
import { UnavailableComponent } from './unavailable/unavailable.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StationComponent,
    WeatherComponent,
    UnavailableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ SncfService, WeatherService, CorsService, ImagesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
