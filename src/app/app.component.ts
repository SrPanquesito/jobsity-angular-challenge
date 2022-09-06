import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import citiesJSON from 'cities.json';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(
    private _AppService: AppService,
  ) { }

  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Filter cities.json to retireve only the cities of the country we define here. In this case 'US' by default.
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        this._AppService.setCities(data.cities);
        this._AppService.addCity({name: 'tijuana', country: 'MX', lat: 32.5010188, lon: -116.964662})
      };
      worker.postMessage({ country: 'US' });
    } else {
      // Web Workers are not supported in this environment. Set all cities.
      this._AppService.setCities(JSON.parse(JSON.stringify(citiesJSON)));
    }
  }
}