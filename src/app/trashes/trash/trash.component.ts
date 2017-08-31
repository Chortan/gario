import { Component, OnInit, Input } from '@angular/core';
import { Trash } from '../../cors.service';
import { WeekPipe } from '../../week-number.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

   @Input() trash : Trash; 
  date:Date=new Date();
  isToday : boolean = true;

  constructor() { }

  ngOnInit() {
    this.isTodayCalc();
  }

  isTodayCalc():boolean{
    this.isToday = true;
    let date : Date = new Date();
    let weekNumber = new WeekPipe().transform(date);
    let dayNumber = date.getDay() == 7 ? 1 : date.getDay()+1;
    this.isToday = this.isToday && (this.trash.dayWeek == dayNumber);

    console.log("("+this.trash.name+")");
    console.log("Today = "+ date.getDay() +" and trash day = "+this.trash.dayWeek);

    let isEvenWeek = weekNumber%2==0;
    let isOddWeek = weekNumber%2==1;

    console.log("We are in "+(isEvenWeek?'even':'')+(isEvenWeek && isOddWeek ? ' And ' : '')+(isOddWeek?'odd':'')+" week : ");

    if(!this.trash.evenWeeks) this.isToday = this.isToday && (this.trash.evenWeeks == isEvenWeek);
    if(!this.trash.oddWeeks) this.isToday = this.isToday && (this.trash.oddWeeks == isOddWeek);
    
    console.log("is today = "+this.isToday);
    this.timer();
    return this.isToday;
  }

  timer(){
    let timer = Observable.timer(60*60*1000);
    timer.subscribe(t=>{
      this.isTodayCalc();
    });
  }

}
