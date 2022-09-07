import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-year-picker',
  templateUrl: './ui-year-picker.component.html',
  styles: [
  ]
})
export class UiYearPickerComponent implements OnInit {
  @Input() years: Array<number> = [new Date().getFullYear()];
  @Input() currentYear = new Date().getFullYear();
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  currentYearIndex() {
    return this.years.findIndex(e => e === this.currentYear);
  }

  onChangedIndex(e: any) {
    this.onChange.emit(this.years[e]);
  }

}
