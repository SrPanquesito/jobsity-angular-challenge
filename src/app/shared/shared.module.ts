import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMaterialModule } from './ng-material.module';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from './pipes/kelvin-to-fahrenheit.pipe';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent, CarouselItemElementDirective } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';

const SHARED = [
  FirstLetterUppercasePipe,
  KelvinToCelsiusPipe,
  KelvinToFahrenheitPipe,
  HeaderComponent,
  CarouselItemDirective,
  CarouselComponent,
  CarouselItemElementDirective,
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
