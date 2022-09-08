import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Reminder, Color } from '@containers/calendar/interfaces/calendar.interface';

@Component({
  selector: 'ui-reminder-button',
  templateUrl: './ui-reminder-button.component.html',
  styles: [
  ]
})
export class UiReminderButtonComponent implements OnInit {
  @Input() reminder: Reminder;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  applyReminderColor(color: Color) {
    switch (color) {
      case 'red': return 'bg-red-400 hover:bg-red-500';
      case 'orange': return 'bg-orange-400 hover:bg-orange-500';
      case 'yellow': return 'bg-yellow-400 hover:bg-yellow-500';
      case 'green': return 'bg-green-400 hover:bg-green-500';
      case 'teal': return 'bg-teal-400 hover:bg-teal-500';
      case 'blue': return 'bg-blue-400 hover:bg-blue-500';
      case 'indigo': return 'bg-indigo-400 hover:bg-indigo-500';
      case 'purple': return 'bg-purple-400 hover:bg-purple-500';
      case 'pink': return 'bg-pink-400 hover:bg-pink-500';

      default: return 'bg-gray-400 hover:bg-gray-500';
    }
  }

  onClicked() {
    this.onClick.emit();
  }

}
