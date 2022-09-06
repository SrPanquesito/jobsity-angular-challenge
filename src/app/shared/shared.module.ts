import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from './ng-material.module';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from './pipes/kelvin-to-fahrenheit.pipe';
import { HeaderComponent } from './components/header/header.component';

const SHARED = [
  FirstLetterUppercasePipe,
  KelvinToCelsiusPipe,
  KelvinToFahrenheitPipe,
  HeaderComponent,
];

@NgModule({
  declarations: [
    ...SHARED
  ],
  imports: [
    CommonModule,
    NgMaterialModule,
  ],
  exports: [
    ...SHARED
  ]
})
export class SharedModule { }
