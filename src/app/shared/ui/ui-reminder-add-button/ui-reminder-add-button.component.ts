import { Component, OnInit, Input } from '@angular/core';
import { faTag, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ui-reminder-add-button',
  templateUrl: './ui-reminder-add-button.component.html',
  styles: [
  ]
})
export class UiReminderAddButtonComponent implements OnInit {
  @Input() size?: string;
  
  faTag = faTag;
  faPlus = faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
