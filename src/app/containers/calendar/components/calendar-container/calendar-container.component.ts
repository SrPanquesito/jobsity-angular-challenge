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
  public days: Day[];
  public months: string[];
  public years: number[];

  public currentDate: {};
  public selectedMonthIndex: number;
  public selectedYear: number;

  constructor(
    private _CalendarStateService: CalendarStateService,
  ) { }

  ngOnInit(): void {
    /* For calendar UI */
    this.days = this._CalendarStateService.getCurrentMonthDays()

    /* For year and month pickers */
    this.years = [2018,2019,2020,2021,2022,2023,2024,2025,2026];
    this.months = new Array(12).fill(null).map((e, index) => this._CalendarStateService.getMonthName(index+1));

    this.selectedMonthIndex = this.days[0].monthIndex;
    this.selectedYear = this.days[0].year;
    this.currentDate = this._CalendarStateService.getCurrentDate();
  }

  onYearChanged(e: any) {
  }

  onMonthChanged(e: any) {
  }

  onSelectedDay(e: any) {
  }

}
