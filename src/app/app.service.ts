import { Injectable } from '@angular/core';
import { City } from '@containers/calendar/interfaces/calendar.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private citiesArr: Array<City>;
  private citiesSetted = false;

  constructor() { }

  get cities() : Array<City> {
    return this.citiesArr
  }

  /**
   * Method will only be called once on app initialization and it will filter the cities from the .json module via a web worker.
   * @param cities Filtered array of cities of a country.
   */
  setCities(cities: Array<City>) {
    if (this.citiesSetted) return
    this.citiesArr = cities;
    this.citiesSetted = true;
  }
  /**
   * Method will be erased. It will set Tijuana for testing purposes only.
   * @param city .
   */
  addCity(city: City) {
    this.citiesArr.push(city);
  }
  
}
