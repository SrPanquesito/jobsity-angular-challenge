import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';

@Component({
  selector: 'ui-calendar',
  templateUrl: './ui-calendar.component.html',
  styles: [
  ]
})
export class UiCalendarComponent implements OnInit {
  @Input() days?: Array<Day>;
  @Input() currentDay = 1;
  @Output() onSelectedDay: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
