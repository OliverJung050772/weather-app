import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toFahrenheit'})
export class ToFahrenheitPipe implements PipeTransform {

  transform(celsiusValue: number): number {
    return Math.round(((celsiusValue * 1.8) + 32) * 10) / 10;
  }

}
