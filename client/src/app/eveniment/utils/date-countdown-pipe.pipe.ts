import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCountdownPipe',
  standalone: true
})
export class DateCountdownPipe implements PipeTransform {

  transform(value: any): string {
    const eventDate = new Date(value);
    const currentDate = new Date();
    const diffInTime = eventDate.getTime() - currentDate.getTime();

    if (diffInTime < 0) {
      return 'Event has passed';
    }

    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    const weeks = Math.floor(diffInDays / 7);
    const days = diffInDays % 7;

    return `${weeks} weeks and ${days} days until event`;
  }

}
