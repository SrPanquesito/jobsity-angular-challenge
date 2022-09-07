import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';
import { arrayToMatrix } from '@shared/utils/utils';

@Component({
  selector: 'ui-calendar',
  templateUrl: './ui-calendar.component.html',
  styles: [`
    table { table-layout: fixed; }
    th { text-align: center; font-weight: 500 }
  `]
})
export class UiCalendarComponent implements OnInit {
  @Input() days?: Array<Day>;
  @Output() onSelectedDay: EventEmitter<any> = new EventEmitter<any>();

  public daysMatrix?: Array<Array<Day>>;

  constructor() { }

  ngOnInit(): void {
    if (this.days) {
      this.daysMatrix = arrayToMatrix(this.days, 7);
    }
  }

}