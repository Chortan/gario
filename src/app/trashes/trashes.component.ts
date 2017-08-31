import { Component, OnInit, Input } from '@angular/core';
import { Trash } from '../cors.service';


@Component({
  selector: 'app-trashes',
  templateUrl: './trashes.component.html',
  styleUrls: ['./trashes.component.css']
})
export class TrashesComponent implements OnInit {

  @Input() trashes : Trash[] = [];

  constructor() { }

  ngOnInit() {
  }

}
