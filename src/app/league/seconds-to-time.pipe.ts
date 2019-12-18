import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {

  transform(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes  = Math.floor(seconds/  60);
    seconds = Math.floor(seconds % 3600 % 60);
    return (hours? (hours + 'h ') : '') + (minutes? (minutes + 'm ') : '');
  }

}
