import { Component, OnInit } from '@angular/core';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';
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

  public selectedMonthIndex: number;
  public selectedYear: number;

  constructor(
    private _CalendarFacadeService: CalendarFacadeService,
  ) { }

  ngOnInit(): void {
    /* For calendar UI */
    this.days = this._CalendarFacadeService.getCurrentMonthDays()
    console.log(this.days);

    /* For year and month pickers */
    this.years = [2018,2019,2020,2021,2022,2023,2024,2025,2026];
    this.months = this._CalendarFacadeService.getMonthsByName();

    this.selectedMonthIndex = this.days[0].monthIndex;
    this.selectedYear = this.days[0].year;
  }

  onYearChanged(e: any) {
  }

  onMonthChanged(e: any) {
  }

  onSelectedDay(e: any) {
  }

}
