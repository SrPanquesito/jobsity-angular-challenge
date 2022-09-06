import { Component, OnInit } from '@angular/core';
import { Reminder } from '@containers/calendar/interfaces/calendar.interface';
import { MatDialog } from '@angular/material/dialog';
import { FormReminderComponent } from '@containers/calendar/components/form-reminder/form-reminder.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  openReminderForm(reminder?: Reminder) {
    this._MatDialog.open(FormReminderComponent, {
      data: { reminder },
      width: '75vh'
    });
  }

}
