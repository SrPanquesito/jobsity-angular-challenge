import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ui-year-picker',
  templateUrl: './ui-year-picker.component.html',
  styles: [
  ]
})
export class UiYearPickerComponent implements OnInit {
  @Input() years: Array<number> = [new Date().getFullYear()];
  @Output() onYearChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onYearChanged(e: any) {
    this.onYearChange.emit(this.years[e]);
  }

}
