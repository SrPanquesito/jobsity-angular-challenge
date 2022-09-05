import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { WeatherService } from 'src/app/services/weather.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
  ) { }

  ngOnInit(): void {
  }

}
