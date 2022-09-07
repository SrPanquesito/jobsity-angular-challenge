import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/calendar.interface';
import { CalendarApiService } from './api/calendar-api.service';
import { CalendarStateService } from './state/calendar-state.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarFacadeService {

  constructor(
    private _CalendarApiService: CalendarApiService,
    private _CalendarStateService: CalendarStateService,
  ) { }

  /* ******************** Calendar ******************** */
  getMonthsByName(): Array<string> {
    return new Array(12).fill(null).map((e, index) => this._CalendarStateService.getMonthName(index+1));
  }

  getCurrentMonthDays() {
    return this._CalendarStateService.getCurrentMonthDays();
  }

  getMonthDays(monthIndex: number, year: number) {
    return this._CalendarStateService.getMonthDays(monthIndex, year);
  }

  getMonthIndex(month: string) {
    return this._CalendarStateService.getMonthIndex(month);
  }
  
  getCurrentDate() {
    return this._CalendarStateService.getCurrentDate();
  }

  /* ******************** Reminders ******************** */
  private reminders: Reminder[] = [];

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
