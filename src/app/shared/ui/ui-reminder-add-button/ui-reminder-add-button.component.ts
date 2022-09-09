import { Component, OnInit } from '@angular/core';
import { faTag, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-reminder-add-button',
  templateUrl: './ui-reminder-add-button.component.html',
  styles: [
  ]
})
export class UiReminderAddButtonComponent implements OnInit {
  faTag = faTag;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
