import { Component, Input, OnInit } from '@angular/core';
import { Reminder, Color } from '@containers/calendar/interfaces/calendar.interface';

@Component({
  selector: 'ui-reminder-button',
  templateUrl: './ui-reminder-button.component.html',
  styles: [
  ]
})
export class UiReminderButtonComponent implements OnInit {
  @Input() reminder: Reminder;

  constructor() { }

  ngOnInit(): void {
  }

  applyReminderColor(color: Color) {
    switch (color) {
      case 'red': return 'bg-red-400';
      case 'orange': return 'bg-orange-400';
      case 'yellow': return 'bg-yellow-400';
      case 'green': return 'bg-green-400';
      case 'teal': return 'bg-teal-400';
      case 'blue': return 'bg-blue-400';
      case 'indigo': return 'bg-indigo-400';
      case 'purple': return 'bg-purple-400';
      case 'pink': return 'bg-pink-400';

      default: return 'bg-gray-400'
    }
  }

}
