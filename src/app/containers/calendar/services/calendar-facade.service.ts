import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Day, Reminder, Weather, WeatherResponseAPI } from '../interfaces/calendar.interface';
import { CalendarApiService } from './api/calendar-api.service';
import { CalendarStateService } from './state/calendar-state.service';
import { flatMap, catchError, map, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalendarFacadeService {
  constructor(
    private _CalendarApiService: CalendarApiService,
    private _CalendarStateService: CalendarStateService,
  ) {
    this.days = this.getCurrentMonthDays()
    this.getRemindersFromLocalStorage();
  }

  /* ******************** Calendar ******************** */
  private days$: BehaviorSubject<Array<Day> | []> = new BehaviorSubject<Array<Day> | []>([]);
  public daysObs$ = this.days$.asObservable();

  get days(): Array<Day> | [] {
    return this.days$.getValue();
  }
  set days(val: Array<Day> | []) {
    this.days$.next(val);
  }
  private addReminderToDay(reminder: Reminder) {
    let reminderDate: any = new Date(reminder.dateTime);
    reminderDate = { year: reminderDate.getFullYear(), monthIndex: reminderDate.getMonth(), number: reminderDate.getDate() };
    this.days$.getValue().forEach((day: Day) => {
      if (reminderDate.year === day.year && reminderDate.monthIndex === day.monthIndex && reminderDate.number === day.number) {
        (day.reminders?.length > 0) ? day.reminders.push(reminder) : day.reminders = [reminder];
      }
    });
  }
  private addRemindersToDays() {
    this.days$.getValue().forEach((day: Day) => {
      this.reminders.forEach((reminder: Reminder) => {
        let reminderDate: any = new Date(reminder.dateTime);
        if (reminderDate.getFullYear() === day.year && reminderDate.getMonth() === day.monthIndex && reminderDate.getDate() === day.number) {
          (day.reminders?.length > 0) ? day.reminders.push(reminder) : day.reminders = [reminder];
        }
      })
    });
  }
  private editedReminderToDay(editedReminder: Reminder) {
    let reminderDate: any = new Date(editedReminder.dateTime);
    reminderDate = { year: reminderDate.getFullYear(), monthIndex: reminderDate.getMonth(), number: reminderDate.getDate() };
    this.days$.getValue().forEach((day: Day) => {
      if (reminderDate.year === day.year && reminderDate.monthIndex === day.monthIndex && reminderDate.number === day.number) {
        if (day.reminders) {
          for (let i = 0; i < day.reminders.length; i++) {
            if (day.reminders[i].originalCreationDate === editedReminder.originalCreationDate) {
              day.reminders[i] = editedReminder;
              break
            }
          }
        }
        else {
          day.reminders = [editedReminder];
        }
      }
    });
  }
  private deleteReminderInDay(reminder: Reminder) {
    let reminderDate: any = new Date(reminder.dateTime);
    reminderDate = { year: reminderDate.getFullYear(), monthIndex: reminderDate.getMonth(), number: reminderDate.getDate() };
    this.days$.getValue().forEach((day: Day) => {
      if (reminderDate.year === day.year && reminderDate.monthIndex === day.monthIndex && reminderDate.number === day.number) {
        for (let i = 0; i < day.reminders.length; i++) {
          if (day.reminders[i].originalCreationDate === reminder.originalCreationDate) {
            day.reminders.splice(i, 1);
            break
          }
        }
      }
    });
  }

  getMonthsByName(): Array<string> {
    return new Array(12).fill(null).map((e, index) => this._CalendarStateService.getMonthName(index+1));
  }

  private getCurrentMonthDays() {
    return this._CalendarStateService.getCurrentMonthDays();
  }

  calculateMonthDays(monthIndex: number, year: number) {
    this.days = this.getMonthDays(monthIndex, year);
    this.addRemindersToDays();
  }

  private getMonthDays(monthIndex: number, year: number) {
    return this._CalendarStateService.getMonthDays(monthIndex, year);
  }

  getMonthIndex(month: string) {
    return this._CalendarStateService.getMonthIndex(month);
  }
  
  getCurrentDate() {
    return this._CalendarStateService.getCurrentDate();
  }

  getCurrentDay() {
    return this._CalendarStateService.getCurrentDay();
  }

  /* ******************** Reminders ******************** */
  private reminders: Reminder[] = [];

  createReminder(data: Reminder): Reminder {
    this.reminders.push(data);
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
    this.addReminderToDay(data);
    return data;
  }

  editReminder(data: Reminder): Reminder {
    if (data.dateTime.toISOString().split('T')[0] === data.previousDate.toISOString().split('T')[0]) {
      for (let i = 0; i < this.reminders.length; i++) {
        if (data.originalCreationDate === this.reminders[i].originalCreationDate) {
          this.reminders[i] = data;
          this.editedReminderToDay(data);
          break
        }
      }
    }
    else {
      let dateTime = data.dateTime;
      data.dateTime = data.previousDate;
      this.deleteReminder(data);
      data.dateTime = dateTime;
      this.reminders.push(data);
      this.addReminderToDay(data);

    }
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
    return data;
  }

  deleteReminder(data: Reminder): boolean {
    for (let i = 0; i < this.reminders.length; i++) {
      if (data.originalCreationDate === this.reminders[i].originalCreationDate) {
        this.reminders.splice(i, 1);
        localStorage.setItem('reminders', JSON.stringify(this.reminders));
        this.deleteReminderInDay(data);
      }
    }
    return true;
  }

  private getRemindersFromLocalStorage() {
    if (!localStorage.getItem('reminders')) return
    this.reminders = JSON.parse(localStorage.getItem('reminders'));
    console.warn('reminders from LocalStorage: ', this.reminders);
    this.addRemindersToDays();
  }

  /* ******************** Weather ******************** */
  private weather$: BehaviorSubject<Weather | null> = new BehaviorSubject<Weather | null>(null);
  public weatherObs$: Observable<Weather | null> = this.weather$.asObservable();

  get weather(): Weather | null {
    return this.weather$.getValue();
  }
  set weather(val: Weather | null) {
    this.weather$.next(val);
  }

  // If I have time, calculate forecast for the current week
  private weatherForecast$: BehaviorSubject<WeatherResponseAPI | null> = new BehaviorSubject<WeatherResponseAPI | null>(null);
  public weatherForecastObs$: Observable<WeatherResponseAPI | null> = this.weatherForecast$.asObservable();

  get weatherForecast(): WeatherResponseAPI | null {
    return this.weatherForecast$.getValue();
  }
  set weatherForecast(val: WeatherResponseAPI | null) {
    this.weatherForecast$.next(val);
  }

  getWeatherInformation(city: string) {
    this._CalendarApiService.getOpenWeatherLatLon({city})
    .pipe(
      flatMap((res: Array<any>) => this._CalendarApiService.getOpenWeatherForecast({lat: res[0].lat, lon: res[0].lon})),
      first(),
      map((res: WeatherResponseAPI) => {
        console.warn(res)
        // Unix timestamp to Javascript timestamp
        res.current.dt = Number(res.current.dt) * 1000;
        res.daily.forEach(day => { day.dt = Number(day.dt) * 1000 });
        this.weatherForecast$.next(res);
        return res
      }),
      catchError(err => {
        console.log('err')
        this.weatherForecast$.next(null);
        return err
      })
    )
    .subscribe();
  }
}
