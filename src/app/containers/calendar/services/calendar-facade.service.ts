import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/calendar.interface';
import { CalendarApiService } from './api/calendar-api.service';
import { CalendarStateService } from './state/calendar-state.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarFacadeService {
  private selectedYear: number;
  private selectedMonthIndex: number;

  private reminders: Reminder[] = [];

  constructor(
    private _CalendarApiService: CalendarApiService,
    private _CalendarStateService: CalendarStateService,
  ) { }

  /* Calendar to UI */
  getMonthsByName(): Array<string> {
    return new Array(12).fill(null).map((e, index) => this._CalendarStateService.getMonthName(index+1));
  }

  getCurrentMonthDays() {
    return this._CalendarStateService.getCurrentMonthDays();
  }

  /* Reminders */
  createReminder(data: Reminder): Reminder {
    return data;
  }

  editReminder(data: Reminder): Reminder {
    return data;
  }

  listReminders(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  deleteReminder(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
