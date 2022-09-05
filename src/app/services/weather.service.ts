import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private _ApiService: ApiService
  ) { }

  getWeatherInformation(city: string) {
    // this._ApiService.
    return { city, weatherInfo: 'here' };
  }
}
