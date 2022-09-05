import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _HttpClient: HttpClient,
  ) { }

  getOpenWeatherHistory() {
    // return this._HttpClient.get()
  }
}
