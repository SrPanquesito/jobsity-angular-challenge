import { Component, OnInit, Input } from '@angular/core';
import { CalendarService } from 'src/app/services/calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { Reminder } from 'src/app/interfaces/reminder';
import { ReminderFormComponent } from 'src/app/components/reminder-form/reminder-form.component';

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

  constructor(
    private _CalendarService: CalendarService,
    private _MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderForm(reminder?: Reminder) {
    if (this.date) {
      this._MatDialog.open(ReminderFormComponent, {
        data: { dateTime: this.date, ...reminder },
        width: '75vh'
      });
    }
  }

}