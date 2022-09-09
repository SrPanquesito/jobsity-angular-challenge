import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';
import { arrayToMatrix } from '@shared/utils/utils';

@Component({
  selector: 'ui-calendar',
  templateUrl: './ui-calendar.component.html',
  styles: [`
    table { table-layout: fixed; }
    th { text-align: center; font-weight: 700 }
  `]
})
export class UiCalendarComponent implements OnInit, OnChanges {
  @Input() days?: Array<Day>;
  @Output() onSelectedDay: EventEmitter<any> = new EventEmitter<any>();

  public daysMatrix?: Array<Array<Day>>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.days) {
      this.daysMatrix = arrayToMatrix(this.days, 7);
    }
  }

}
