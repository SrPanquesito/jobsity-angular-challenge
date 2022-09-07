import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-month-picker',
  templateUrl: './ui-month-picker.component.html',
  styles: [
  ]
})
export class UiMonthPickerComponent implements OnInit {
  @Input() months: Array<number> = [new Date().getMonth()];
  @Input() currentMonth = new Date().getMonth();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onChangedIndex(e: any) {
    this.onChange.emit(this.months[e]);
  }

}
