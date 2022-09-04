import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-table-cell',
  templateUrl: './ui-table-cell.component.html',
  styles: [
  ]
})
export class UiTableCellComponent implements OnInit {
  @Input() dayNumber: string | number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
