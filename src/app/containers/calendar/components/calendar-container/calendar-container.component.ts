import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';
import { map } from 'rxjs/operators';
import { RemindersBoxService } from '@containers/calendar/services/reminders-box.service';

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

  public currentDate = new Date();
  public selectedDate: Date;

  constructor(
    public _CalendarFacadeService: CalendarFacadeService,
    private _RemindersBoxService: RemindersBoxService,
  ) { }

  ngOnInit(): void {
    /* For calendar UI */
    console.log(this._CalendarFacadeService.days);

    /* For year and month pickers */
    this.years = [2018,2019,2020,2021,2022,2023,2024,2025,2026];
    this.months = this._CalendarFacadeService.getMonthsByName();

    this.selectedMonthIndex = this._CalendarFacadeService.getCurrentDate().monthIndex;
    this.selectedYear = this._CalendarFacadeService.getCurrentDate().year;
    this.selectedDate = new Date(this.selectedYear, this.selectedMonthIndex, 1);
  }

  onYearChanged(e: any) {
    this.selectedYear = e;
    this.selectedDate = new Date(this.selectedYear, this.selectedMonthIndex, 1);
    this._CalendarFacadeService.calculateMonthDays(this.selectedMonthIndex, e)
  }

  onMonthChanged(e: string) {
    this.selectedMonthIndex = this._CalendarFacadeService.getMonthIndex(e)-1;
    this.selectedDate = new Date(this.selectedYear, this.selectedMonthIndex, 1);
    this._CalendarFacadeService.calculateMonthDays(this.selectedMonthIndex, this.selectedYear)
  }

  onSelectedDay(e: any) {
  }

  onOpenReminderForm() {
    let day = this._CalendarFacadeService.getCurrentDay();
    this._RemindersBoxService.onOpenReminderForm(day);
  }

  isSelectedDateCurrentMonth(): boolean {
    if (this.currentDate.getFullYear() === this.selectedYear && this.currentDate.getMonth() === this.selectedMonthIndex) return true
    return false
  }

}
