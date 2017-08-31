import { Component, OnInit } from '@angular/core';
import { Data, CorsService } from '../cors.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  data:Data = new Data();

  constructor(private corsService: CorsService) { }

  ngOnInit() {
    
    this.corsService.getData().subscribe(data=>{
      this.data=data;
    });
  }

}
