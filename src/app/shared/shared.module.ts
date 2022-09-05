import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from './ng-material.module';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from './pipes/kelvin-to-fahrenheit.pipe';
import { HeaderComponent } from './components/header/header.component';
import { FormReminderComponent } from './components/form-reminder/form-reminder.component';

const SHARED = [
  FirstLetterUppercasePipe,
  KelvinToCelsiusPipe,
  KelvinToFahrenheitPipe,
  HeaderComponent,
  FormReminderComponent,
];

@NgModule({
  declarations: [
    ...SHARED
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    ...SHARED
  ]
})
export class SharedModule { }
