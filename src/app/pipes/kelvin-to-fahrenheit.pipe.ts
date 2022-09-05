import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToFahrenheit'
})
export class KelvinToFahrenheitPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    return Math.trunc(((Number(value) - 273.15)*(9/5)) + 32);
  }

}
