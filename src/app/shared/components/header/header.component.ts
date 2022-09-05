import { Component, OnInit } from '@angular/core';
import { Reminder } from 'src/app/interfaces/reminder';
import { MatDialog } from '@angular/material/dialog';
import { FormReminderComponent } from '../form-reminder/form-reminder.component';

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
