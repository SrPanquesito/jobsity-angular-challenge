import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { UiTableCellComponent } from './ui/ui-table-cell/ui-table-cell.component';
import { UiTableComponent } from './ui/ui-table/ui-table.component';
import { CalendarContainerComponent } from './calendar-container/calendar-container.component';


@NgModule({
  declarations: [
    CalendarComponent,
    UiTableCellComponent,
    UiTableComponent,
    CalendarContainerComponent
  ],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
  ],
  entryComponents: [ReminderFormComponent],
})
export class CalendarModule { }
