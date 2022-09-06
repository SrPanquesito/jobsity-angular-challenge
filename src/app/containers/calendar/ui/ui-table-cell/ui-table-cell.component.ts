import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Reminder, Weather } from '@containers/calendar/interfaces/calendar.interface';
import { FormReminderComponent } from '@containers/calendar/components/form-reminder/form-reminder.component';

@Component({
  selector: 'ui-table-cell',
  templateUrl: './ui-table-cell.component.html',
  styles: [
  ]
})
export class UiTableCellComponent implements OnInit {
  @Input() date: any = new Date();
  @Input() dayNumber: string | number = 0;
  @Input() currentDay: boolean = false;
  @Input() weather?: Weather;

  constructor(
    private _MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderForm(reminder?: Reminder) {
    if (this.date) {
      this._MatDialog.open(FormReminderComponent, {
        data: { dateTime: this.date, weather: this.weather, ...reminder },
        width: '75vh'
      });
    }
  }

}