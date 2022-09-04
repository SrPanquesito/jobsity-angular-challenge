import { Component, OnInit } from '@angular/core';
import { daysInMonth, firstWeekdayInMonth } from 'src/app/utils/date.util';

@Component({
  selector: 'ui-table',
  templateUrl: './ui-table.component.html',
  styles: [`
    table { table-layout: fixed; }
    th { text-align: center; font-weight: 500 }
  `]
})
export class UiTableComponent implements OnInit {
  public currentDate = new Date();
  public daysMat = new Array(5).fill(null).map(() => new Array(7).fill(null));

  constructor() { }

  ngOnInit(): void { 
    // this.currentDate.setMonth(4);

    // For some reason 0 and 1 equals to January when using this process to retrieve month days.
    let days = daysInMonth(this.currentDate.getMonth()+1, this.currentDate.getFullYear());
    let firstWeekday = firstWeekdayInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());

    let daysCounter = 1;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 7; c++) {
        (r === 0 && c === 0) ? c = c + firstWeekday : null;
        (daysCounter <= days) ? this.daysMat[r][c] = { dayNumber: daysCounter, activeCell: true } : null;
        daysCounter++;
      }
    }

    console.log(this.daysMat)
  }

}