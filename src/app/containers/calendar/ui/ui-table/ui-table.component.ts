import { Component, OnInit, OnDestroy } from '@angular/core';
import { daysInMonth, firstWeekdayInMonth, arrayToMatrix } from '@shared/utils/utils';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ui-table',
  templateUrl: './ui-table.component.html',
  styles: [`
    table { table-layout: fixed; }
    th { text-align: center; font-weight: 500 }
    td:nth-child(1), td:nth-child(7) { background: #f5f5f5; color: #2b6cb0 }
  `]
})
export class UiTableComponent implements OnInit, OnDestroy {
  public currentDate = new Date();
  public daysMatrix = new Array(5).fill(null).map(() => new Array(7).fill(null));

  private destroy$: Subject<any> = new Subject();

  constructor(
  ) { }

  ngOnInit(): void { 
    this.calculateMonthDays();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  /**
   * Fill the matrix with the corresponding date, dayNumber and calculate the first day of the week.
   * Necessary for rendering the correct month view with it's corresponding days in the UI.
   */
   calculateMonthDays(forecastWeek?: Array<any>) {
    const daysInCurrentMonth = daysInMonth(this.currentDate.getMonth()+1, this.currentDate.getFullYear());

    // Start the counter from the firstWeekday of the current month. This counter will be used to fill the month days.
    let counter = firstWeekdayInMonth(this.currentDate.getMonth(), this.currentDate.getFullYear());

    let cells = new Array(35).fill(null);
    let dayNumber = 1;
    while (dayNumber <= daysInCurrentMonth) {
      let date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), dayNumber);
      let currentDay = this.calculateCurrentDay(date);

      // Fill current week with the forecast info
      if (currentDay && forecastWeek) {
        if (forecastWeek.length <= 0) return
        for (let i = 0; i < forecastWeek.length; i++) {
          cells[counter+i] = { weather: forecastWeek[i] };
        }
      }

      cells[counter] = { dayNumber, date, currentDay, ...cells[counter] };
      counter++;
      dayNumber++;
    }

    this.daysMatrix = arrayToMatrix(cells, 7);
  }

  /**
   * Need to change logic once we create the full calendar (different year and month)
   */
  calculateCurrentDay(dateToCompare: Date) {
    return (dateToCompare.getFullYear() === this.currentDate.getFullYear() && dateToCompare.getMonth() === this.currentDate.getMonth() && dateToCompare.getDate() === this.currentDate.getDate())
  }

}
