import { Component, OnInit } from '@angular/core';
import { CalendarStateService } from '@containers/calendar/services/state/calendar-state.service';
import { Day } from '@containers/calendar/interfaces/calendar.interface';

@Component({
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styles: [`
  `]
})
export class CalendarContainerComponent implements OnInit {
  public monthDays: Day[];
  public monthIndex: number;
  public year: number;

  constructor(
    private _CalendarStateService: CalendarStateService,
  ) { }

  ngOnInit(): void {
    this.monthDays = this._CalendarStateService.getCurrentMonthDays()
    this.monthIndex = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;

    console.warn(this.monthDays);
  }

  onYearChanged(e: any) {
  }

  onMonthChanged(e: any) {
  }

  onSelectedDay(e: any) {
  }

}
