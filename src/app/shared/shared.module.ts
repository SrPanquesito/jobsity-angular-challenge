import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstLetterUppercasePipe } from './pipes/first-letter-uppercase.pipe';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { KelvinToFahrenheitPipe } from './pipes/kelvin-to-fahrenheit.pipe';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent, CarouselItemElementDirective } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCaretLeft, faCaretRight, fas } from '@fortawesome/free-solid-svg-icons';

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
    ...SHARED,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    ...SHARED
  ]
})
export class SharedModule { }
