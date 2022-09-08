import { Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { Day, Color } from '@containers/calendar/interfaces/calendar.interface';
import { RemindersBoxService } from '@containers/calendar/services/reminders-box.service';

@Component({
  selector: 'ui-calendar-day',
  templateUrl: './ui-calendar-day.component.html',
  styles: [`
    .bg-white-to-gray-parent:hover > .bg-white-to-gray {
      background-color: #EDF2F7;
    }
    .bg-white-to-gray {
      background-color: white;
      transition: background-color 100ms ease-in;
    }
  `]
})
export class UiCalendarDayComponent implements OnInit {
  @Input() day?: Day;
  @ViewChild('anchorForReminderList') anchorForReminderList: ElementRef;

  constructor(
    private _RemindersBoxService: RemindersBoxService,
  ) { }

  ngOnInit(): void {
  }

  onOpenReminderList(e: any) {
    if (this.day.activeCell) {
      let offsetX = this.anchorForReminderList.nativeElement.getBoundingClientRect().left + window.scrollX - 100;
      let offsetY = this.anchorForReminderList.nativeElement.getBoundingClientRect().top + window.scrollY + 60;
  
      let maxRightOffset = (offsetX + 256) > window.screen.width;
      let maxLeftOffset = offsetX < 0;
  
      offsetX = maxRightOffset ? window.screen.width - 256 : offsetX;
      offsetX = maxLeftOffset ? 0 : offsetX;
  
      this._RemindersBoxService.show(offsetX, offsetY, this.day);
    }
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
