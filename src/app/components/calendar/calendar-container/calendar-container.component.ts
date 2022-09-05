import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'calendar-container',
  templateUrl: './calendar-container.component.html',
  styles: [
  ]
})
export class CalendarContainerComponent implements OnInit {

  constructor(
    private _WeatherService: WeatherService,
  ) { }

  ngOnInit(): void {
    this._WeatherService.getWeeklyForecast();
  }

}
