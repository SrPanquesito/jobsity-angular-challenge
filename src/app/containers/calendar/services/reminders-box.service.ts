import { Injectable } from '@angular/core';
import { Day, Reminder } from '@containers/calendar/interfaces/calendar.interface';
import { BehaviorSubject } from 'rxjs';
import { DialogService } from '@ngneat/dialog';
import { ReminderFormComponent } from '@containers/calendar/components/reminder-form/reminder-form.component';

@Injectable({
  providedIn: 'root'
})
export class RemindersBoxService {
  private state$ = new BehaviorSubject<any>({show: false});
  public stateObs$ = this.state$.asObservable();

  constructor(
    private _DialogService: DialogService,
  ) { }

  show(offsetX: any, offsetY: any, day?: Day) {
    this.state$.next(day ? {show: true, offsetX, offsetY, day} : {show: true, offsetX, offsetY});
  }

  hide() {
    this.state$.next({show: false});
  }

  onOpenReminderForm(day?: Day, reminder?: Reminder) {
    this._DialogService.open(ReminderFormComponent, {
      data: { day, reminder },
      width: '90vh'
    });
  }
}
