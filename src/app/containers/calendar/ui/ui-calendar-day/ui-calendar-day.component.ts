import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from '@ngneat/dialog';
import { FormReminderComponent } from '@containers/calendar/components/form-reminder/form-reminder.component';
import { Day } from '@containers/calendar/interfaces/calendar.interface';

@Component({
  selector: 'ui-calendar-day',
  templateUrl: './ui-calendar-day.component.html',
  styles: [`
    .bg-white-to-gray {
      background-color: white;
      transition: background-color 100ms ease-in;
    }
    .bg-white-to-gray:hover {
      background-color: #EDF2F7;
    }
  `]
})
export class UiCalendarDayComponent implements OnInit {
  @Input() day?: Day;

  constructor(
    private _DialogService: DialogService,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderForm(day?: Day) {
    this._DialogService.open(FormReminderComponent, {
      data: { day },
      width: '90vh'
    });
  }

}
