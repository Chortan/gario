import { Component, OnInit, Input } from '@angular/core';
import { CorsService } from "../cors.service";
 
@Component({
  selector: 'app-unavailable',
  templateUrl: './unavailable.component.html',
  styleUrls: ['./unavailable.component.css']
})
export class UnavailableComponent implements OnInit {

  @Input() error:string = "";

  constructor(private service:CorsService) { }

  ngOnInit() {
    this.error = "Service non disponible sur : " + this.service.corsApi;
  }

}
