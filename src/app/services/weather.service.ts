import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { flatMap, first, map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weeklyForecast: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  public weeklyForecast$ = this.weeklyForecast.asObservable();

  constructor(
    private _ApiService: ApiService
  ) { }

  getWeeklyForecast() {
    let week = this.DUMMY_DATA.daily;
    if (week.length > 0) {
      // Response timestamp is on UNIX (seconds) so we convert it to ms for Javascript to handle.
      week.map(day => { return { dt: day.dt*1000, ...day } })
    }
    this.weeklyForecast.next(week);
  }

  getWeatherInformation(city: string) {
    this._ApiService.getOpenWeatherLatLon({city})
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
    .subscribe();
  }



  private DUMMY_DATA = 
  {
    "lat": 32.501,
    "lon": -116.9647,
    "timezone": "America/Tijuana",
    "timezone_offset": -25200,
    "current": {
        "dt": 1662406282,
        "sunrise": 1662384332,
        "sunset": 1662430074,
        "temp": 303.53,
        "feels_like": 306.94,
        "pressure": 1009,
        "humidity": 61,
        "dew_point": 295.16,
        "uvi": 9.31,
        "clouds": 0,
        "visibility": 10000,
        "wind_speed": 5.14,
        "wind_deg": 260,
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ]
    },
    "daily": [
        {
            "dt": 1662404400,
            "sunrise": 1662384332,
            "sunset": 1662430074,
            "moonrise": 1662418860,
            "moonset": 1662364140,
            "moon_phase": 0.33,
            "temp": {
                "day": 303.52,
                "min": 298.7,
                "max": 303.86,
                "night": 300.08,
                "eve": 302.45,
                "morn": 299.12
            },
            "feels_like": {
                "day": 306.49,
                "night": 301.28,
                "eve": 303.62,
                "morn": 299.12
            },
            "pressure": 1009,
            "humidity": 59,
            "dew_point": 294.61,
            "wind_speed": 3.55,
            "wind_deg": 275,
            "wind_gust": 3.8,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 20,
            "pop": 0,
            "uvi": 9.31
        },
        {
            "dt": 1662490800,
            "sunrise": 1662470770,
            "sunset": 1662516395,
            "moonrise": 1662508680,
            "moonset": 1662454440,
            "moon_phase": 0.36,
            "temp": {
                "day": 305.32,
                "min": 297.6,
                "max": 306.05,
                "night": 302.14,
                "eve": 305.12,
                "morn": 297.6
            },
            "feels_like": {
                "day": 305.67,
                "night": 303.17,
                "eve": 305.56,
                "morn": 297.93
            },
            "pressure": 1010,
            "humidity": 40,
            "dew_point": 289.17,
            "wind_speed": 3.73,
            "wind_deg": 277,
            "wind_gust": 2.94,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 0,
            "pop": 0,
            "uvi": 9.34
        },
        {
            "dt": 1662577200,
            "sunrise": 1662557207,
            "sunset": 1662602716,
            "moonrise": 1662598020,
            "moonset": 1662545100,
            "moon_phase": 0.4,
            "temp": {
                "day": 308.01,
                "min": 300.2,
                "max": 308.37,
                "night": 301.78,
                "eve": 304.32,
                "morn": 300.62
            },
            "feels_like": {
                "day": 308.75,
                "night": 302.68,
                "eve": 305.1,
                "morn": 301.67
            },
            "pressure": 1012,
            "humidity": 35,
            "dew_point": 288.44,
            "wind_speed": 2.49,
            "wind_deg": 257,
            "wind_gust": 4,
            "weather": [
                {
                    "id": 800,
                    "main": "Clear",
                    "description": "clear sky",
                    "icon": "01d"
                }
            ],
            "clouds": 3,
            "pop": 0,
            "uvi": 9.19
        },
        {
            "dt": 1662663600,
            "sunrise": 1662643645,
            "sunset": 1662689037,
            "moonrise": 1662686880,
            "moonset": 1662635880,
            "moon_phase": 0.44,
            "temp": {
                "day": 308.06,
                "min": 300.3,
                "max": 308.06,
                "night": 303.62,
                "eve": 305.6,
                "morn": 300.3
            },
            "feels_like": {
                "day": 308.12,
                "night": 303.95,
                "eve": 305.9,
                "morn": 301.12
            },
            "pressure": 1007,
            "humidity": 32,
            "dew_point": 287.89,
            "wind_speed": 2.73,
            "wind_deg": 260,
            "wind_gust": 3.42,
            "weather": [
                {
                    "id": 801,
                    "main": "Clouds",
                    "description": "few clouds",
                    "icon": "02d"
                }
            ],
            "clouds": 24,
            "pop": 0,
            "uvi": 8.72
        },
        {
            "dt": 1662750000,
            "sunrise": 1662730082,
            "sunset": 1662775357,
            "moonrise": 1662775440,
            "moonset": 1662726600,
            "moon_phase": 0.48,
            "temp": {
                "day": 303.91,
                "min": 300.4,
                "max": 305.74,
                "night": 300.4,
                "eve": 302.2,
                "morn": 303.45
            },
            "feels_like": {
                "day": 305.01,
                "night": 302.25,
                "eve": 303.82,
                "morn": 304.17
            },
            "pressure": 1000,
            "humidity": 48,
            "dew_point": 291.04,
            "wind_speed": 13.15,
            "wind_deg": 82,
            "wind_gust": 22.13,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 0.88,
            "rain": 4.24,
            "uvi": 4.55
        },
        {
            "dt": 1662836400,
            "sunrise": 1662816519,
            "sunset": 1662861677,
            "moonrise": 1662863820,
            "moonset": 1662817080,
            "moon_phase": 0.5,
            "temp": {
                "day": 301.79,
                "min": 298.75,
                "max": 303.96,
                "night": 298.83,
                "eve": 301.82,
                "morn": 298.75
            },
            "feels_like": {
                "day": 301.84,
                "night": 299.26,
                "eve": 302.98,
                "morn": 298.98
            },
            "pressure": 1006,
            "humidity": 45,
            "dew_point": 288.21,
            "wind_speed": 5.34,
            "wind_deg": 121,
            "wind_gust": 9.84,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 100,
            "pop": 0.92,
            "rain": 3.25,
            "uvi": 5
        },
        {
            "dt": 1662922800,
            "sunrise": 1662902956,
            "sunset": 1662947997,
            "moonrise": 1662951960,
            "moonset": 1662907440,
            "moon_phase": 0.55,
            "temp": {
                "day": 301.43,
                "min": 298.01,
                "max": 301.68,
                "night": 298.6,
                "eve": 301.3,
                "morn": 298.01
            },
            "feels_like": {
                "day": 302.9,
                "night": 299.11,
                "eve": 302.82,
                "morn": 298.46
            },
            "pressure": 1011,
            "humidity": 59,
            "dew_point": 292.06,
            "wind_speed": 4.1,
            "wind_deg": 255,
            "wind_gust": 3.11,
            "weather": [
                {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                }
            ],
            "clouds": 8,
            "pop": 0.74,
            "rain": 9.85,
            "uvi": 5
        },
        {
            "dt": 1663009200,
            "sunrise": 1662989393,
            "sunset": 1663034316,
            "moonrise": 1663040160,
            "moonset": 1662997680,
            "moon_phase": 0.59,
            "temp": {
                "day": 300.67,
                "min": 297.63,
                "max": 300.87,
                "night": 297.96,
                "eve": 300.26,
                "morn": 297.63
            },
            "feels_like": {
                "day": 302.3,
                "night": 298.35,
                "eve": 301.6,
                "morn": 298.2
            },
            "pressure": 1011,
            "humidity": 64,
            "dew_point": 292.65,
            "wind_speed": 4.49,
            "wind_deg": 249,
            "wind_gust": 3.36,
            "weather": [
                {
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10d"
                }
            ],
            "clouds": 65,
            "pop": 0.35,
            "rain": 0.76,
            "uvi": 5
        }
    ]
}

}
