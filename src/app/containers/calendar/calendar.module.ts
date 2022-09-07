import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarContainerComponent } from './components/calendar-container/calendar-container.component';
import { UiTableComponent } from './ui/ui-table/ui-table.component';
import { UiTableCellComponent } from './ui/ui-table-cell/ui-table-cell.component';
import { FormReminderComponent } from './components/form-reminder/form-reminder.component';
import { UiYearPickerComponent } from './ui/ui-year-picker/ui-year-picker.component';
import { UiMonthPickerComponent } from './ui/ui-month-picker/ui-month-picker.component';
import { UiCalendarComponent } from './ui/ui-calendar/ui-calendar.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarContainerComponent,
    FormReminderComponent,
    UiTableComponent,
    UiTableCellComponent,
    UiYearPickerComponent,
    UiMonthPickerComponent,
    UiCalendarComponent,
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class CalendarModule { }
