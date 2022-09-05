import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    return Math.trunc(Number(value) - 273.15);
  }

}
