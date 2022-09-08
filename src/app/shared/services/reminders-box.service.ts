import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemindersBoxService {
  private state$ = new BehaviorSubject<any>({show: false});
  public stateObs$ = this.state$.asObservable();

  constructor() { }

  show(offsetX: any, offsetY: any) {
    this.state$.next({show: true, offsetX, offsetY});
  }

  hide() {
    this.state$.next({show: false});
  }
}
