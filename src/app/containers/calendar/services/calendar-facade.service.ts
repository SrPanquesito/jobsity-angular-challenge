import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Day, Reminder, Weather } from '../interfaces/calendar.interface';
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
    this.reminders.push(data);
    localStorage.setItem('reminders', JSON.stringify(this.reminders));
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

  private getRemindersFromLocalStorage() {
    if (!localStorage.getItem('reminders')) return
    this.reminders = JSON.parse(localStorage.getItem('reminders'));
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

  private weatherForecast$: BehaviorSubject<Array<Weather> | []> = new BehaviorSubject<Array<Weather> | []>([]);
  public weatherForecastObs$: Observable<Array<Weather> | []> = this.weatherForecast$.asObservable();

  get weatherForecast(): Array<Weather> | [] {
    return this.weatherForecast$.getValue();
  }
  set weatherForecast(val: Array<Weather> | []) {
    this.weatherForecast$.next(val);
  }

  getWeatherInformation(city: string) {
    this._CalendarApiService.getOpenWeatherLatLon({city})
    .pipe(
      flatMap((res: Array<any>) => this._CalendarApiService.getOpenWeatherForecast({lat: res[0].lat, lon: res[0].lon})),
      first(),
      map((res: { current: Weather, daily: Array<Weather>, timezone: string }) => {
        console.warn(res)
        res.current.timezone = res.timezone;
        this.weather$.next(res.current);
        return res
      }),
      catchError(err => {
        console.log('err')
        this.weather$.next(null);
        return err
      })
    )
    .subscribe();
  }
}
