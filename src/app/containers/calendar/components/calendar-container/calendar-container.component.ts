import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styles: [`
  `]
})
export class CalendarContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onYearChanged(e: any) {
    console.warn(e);
  }

  onMonthChanged(e: any) {
    console.warn(e);
  }

}
