import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { flatMap, first, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private _ApiService: ApiService
  ) { }

  getWeatherInformation(city: string) {
    return this._ApiService.getOpenWeatherLatLon({city})
    .pipe(
      flatMap((res: Array<any>) => this._ApiService.getOpenWeatherForecast({lat: res[0].lat, lon: res[0].lon})),
      first(),
      map(r => {
        console.log(r)
        return r
      }),
      catchError(err => {
        return err
      })
    )
  }
}
