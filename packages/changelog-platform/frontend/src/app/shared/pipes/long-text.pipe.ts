import { Pipe, PipeTransform } from '@angular/core';
import { String, StringBuilder } from 'typescript-string-operations';

@Pipe({
  name: 'longText'
})
export class LongTextPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    const str = value.split(' ');

    const sb = new StringBuilder();
    const maxWords = 45;
    str.forEach((el, i) => {
      if (i < maxWords) {
        sb.Append(el);
        sb.Append(' ');
      } else if ( i === str.length - 1) {
        sb.Append('...');
      }
    });

    return sb.ToString();
  }

}
