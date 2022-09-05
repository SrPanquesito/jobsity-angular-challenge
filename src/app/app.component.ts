import { Component, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import citiesJSON from 'cities.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _CalendarService: CalendarService,
  ) { }

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Filter cities.json to retireve only the cities of the country we define here. In this case 'US' by default.
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this._CalendarService.cities = data.cities;
        this._CalendarService.cities.push({name: 'tijuana', country: 'MX', lat: 32.5010188, lon: -116.964662}) };
      worker.postMessage({ country: 'US' });
    } else {
      // Web Workers are not supported in this environment. Set all cities.
      this._CalendarService.cities = JSON.parse(JSON.stringify(citiesJSON));
    }
  }
}