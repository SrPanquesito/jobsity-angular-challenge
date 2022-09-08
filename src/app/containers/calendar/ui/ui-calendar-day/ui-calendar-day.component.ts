import { Component, Input, OnInit } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';
import { RemindersBoxService } from '@shared/services/reminders-box.service';

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
    private _RemindersBoxService: RemindersBoxService,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderList(e: any) {
    let offsetX = e.srcElement.getBoundingClientRect().left + window.scrollX - 100;
    let offsetY = e.srcElement.getBoundingClientRect().top + window.scrollY + 60;

    let maxRightOffset = (offsetX + 256) > window.screen.width;
    let maxLeftOffset = offsetX < 0;

    offsetX = maxRightOffset ? window.screen.width - 256 : offsetX;
    offsetX = maxLeftOffset ? 0 : offsetX;

    this._RemindersBoxService.show(offsetX, offsetY, this.day);
  }

}
