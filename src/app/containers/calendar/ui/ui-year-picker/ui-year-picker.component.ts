import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-year-picker',
  templateUrl: './ui-year-picker.component.html',
  styles: [
  ]
})
export class UiYearPickerComponent implements OnInit {
  @Input() years: Array<number> = [new Date().getFullYear()];
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  public year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

  currentYear() {
    return this.years.findIndex(e => e === this.year);
  }

  onChangedIndex(e: any) {
    this.onChange.emit(this.years[e]);
  }

}
