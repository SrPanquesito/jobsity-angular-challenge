import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }

  getOpenWeatherForecast(payload: any): Observable<any> {
    return this._HttpClient.get(env.openWeather_url + env.openWeather_forecast, {
      params: {
        lat: payload.lat,
        lon: payload.lon,
        exclude: 'minutely,hourly,alerts',
        appid: env.openWeather_api_key
      }
    })
  }

  getOpenWeatherLatLon(payload: {city: string}): Observable<any> {
    return this._HttpClient.get(env.openWeather_url + env.openWeather_geocoding, {
      params: {
        q: payload.city,
        appid: env.openWeather_api_key
      }
    })
  }

  // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
}
