import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';
import { ReminderFormComponent } from './components/reminder-form/reminder-form.component';
import { RemindersBoxComponent } from './components/reminders-box/reminders-box.component';
import { UiYearPickerComponent } from './ui/ui-year-picker/ui-year-picker.component';
import { UiMonthPickerComponent } from './ui/ui-month-picker/ui-month-picker.component';
import { UiCalendarComponent } from './ui/ui-calendar/ui-calendar.component';
import { UiCalendarDayComponent } from './ui/ui-calendar-day/ui-calendar-day.component';
import { UiReminderButtonComponent } from './ui/ui-reminder-button/ui-reminder-button.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarContainerComponent,
    ReminderFormComponent,
    UiYearPickerComponent,
    UiMonthPickerComponent,
    UiCalendarComponent,
    UiCalendarDayComponent,
    RemindersBoxComponent,
    UiReminderButtonComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CalendarModule { }
