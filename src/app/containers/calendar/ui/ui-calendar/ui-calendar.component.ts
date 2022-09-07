import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Day } from '@containers/calendar/interfaces/calendar.interface';
import { arrayToMatrix } from '@shared/utils/utils';
import { CalendarStateService } from '@containers/calendar/services/state/calendar-state.service';

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
  @Input() currentDate: any;
  @Output() onSelectedDay: EventEmitter<any> = new EventEmitter<any>();

  public daysMatrix = new Array(5).fill(null).map(() => new Array(7).fill(null));

  constructor(
    private _CalendarStateService: CalendarStateService,
  ) { }

  ngOnInit(): void {
    // this.daysMatrix = arrayToMatrix(this.days, 7);
    let matrixLength = this.daysMatrix.length * this.daysMatrix[0].length;
    let lastDays = this._CalendarStateService.fillMonthDays(this.days[this.days.length-1], this.days.length, matrixLength);
    this.days = this.days.concat(lastDays);
    console.warn(this.days)
  }

}
