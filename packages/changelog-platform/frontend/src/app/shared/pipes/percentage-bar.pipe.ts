import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentageBarPipe implements PipeTransform {
  constructor() {}

  transform(value: number, max?: number, min?: number): any {
    const n = value / max;
    if (min && n * 100 < min) {
      return min;
    }
    return n * 100;
  }
}
