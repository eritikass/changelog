import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'antiCamel'
})
export class AntiCamelPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // exception case
    if (value === 'name') {
      return 'Model Name';
    }
    if (value) {
      return value
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, str => str.toUpperCase());
    }
  }

}
