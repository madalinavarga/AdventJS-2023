import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStatus',
  standalone: true
})
export class ConvertStatusPipe implements PipeTransform {

  transform(value: number ): string {

    const convert = (value: number) => {
      switch (value) {
        case 0: return 'Invited';
        case 1: return 'Declined';
        case 2: return 'Accepted'
        default: return 'Unknown';
      }
    }

    return `${convert(value)}`;
  }

}
