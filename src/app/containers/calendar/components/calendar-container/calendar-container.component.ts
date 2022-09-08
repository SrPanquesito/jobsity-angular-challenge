import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styles: [`
  `]
})
export class CalendarContainerComponent implements OnInit {
  public months: string[];
  public years: number[];

  public selectedMonthIndex: number;
  public selectedYear: number;

  public daysObs$ = this._CalendarFacadeService.daysObs$;

  constructor(
    public _CalendarFacadeService: CalendarFacadeService,
  ) { }

  ngOnInit(): void {
    /* For calendar UI */
    console.log(this._CalendarFacadeService.days);

    /* For year and month pickers */
    this.years = [2018,2019,2020,2021,2022,2023,2024,2025,2026];
    this.months = this._CalendarFacadeService.getMonthsByName();

    this.selectedMonthIndex = this._CalendarFacadeService.getCurrentDate().monthIndex;
    this.selectedYear = this._CalendarFacadeService.getCurrentDate().year;
  }

  onYearChanged(e: any) {
    this.selectedYear = e;
    this._CalendarFacadeService.calculateMonthDays(this.selectedMonthIndex, e)
  }

  onMonthChanged(e: string) {
    this.selectedMonthIndex = this._CalendarFacadeService.getMonthIndex(e)-1;
    this._CalendarFacadeService.calculateMonthDays(this.selectedMonthIndex, this.selectedYear)
  }

  onSelectedDay(e: any) {
  }

}
