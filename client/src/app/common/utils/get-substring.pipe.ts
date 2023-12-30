import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSubstring',
  standalone: true
})
export class GetSubstringPipe implements PipeTransform {

  transform(value: string, len: number): string {
    return value.substring(0,len)
  }

}
