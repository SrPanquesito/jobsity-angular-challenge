import { Component, OnInit } from '@angular/core';
import { Reminder } from '@containers/calendar/interfaces/calendar.interface';
import { DialogService } from '@ngneat/dialog';
import { FormReminderComponent } from '@containers/calendar/components/form-reminder/form-reminder.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _DialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

  openReminderForm(reminder?: Reminder) {
    this._DialogService.open(FormReminderComponent, {
      data: { reminder },
      width: '90vh'
    });
  }

}
