import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'toInHg'})
export class ToInHgPipe implements PipeTransform {

  transform(mbarValue: number): number {
    return Math.round(mbarValue * 0.029529980164712);
  }

}
