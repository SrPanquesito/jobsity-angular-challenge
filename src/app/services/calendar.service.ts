import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import citiesJson from 'cities.json';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private reminders: Reminder[] = [];
  public cities: any;

  constructor() { }

  async filterCities() {
    this.cities = JSON.parse(JSON.stringify(citiesJson));
    this.cities = this.cities.filter(el => el.country === 'US');
    console.warn(this.cities);
  }

  create(data: Reminder): Reminder {
    return data;
  }

  edit(data: Reminder): Reminder {
    return data;
  }

  list(date: Date): Observable<Reminder[]> {
    console.log(date);
    return of(this.reminders);
  }

  delete(reminderId: string): boolean {
    console.log(reminderId);
    return true;
  }
}
