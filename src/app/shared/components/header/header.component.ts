import { Component, OnInit } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';
import { RemindersBoxService } from '@containers/calendar/services/reminders-box.service';
import { CalendarFacadeService } from '@containers/calendar/services/calendar-facade.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private _RemindersBoxService: RemindersBoxService,
    private _CalendarFacadeService: CalendarFacadeService,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderForm() {
    let day: Day = this._CalendarFacadeService.getCurrentDay();
    this._RemindersBoxService.onOpenReminderForm(day);
  }

}
