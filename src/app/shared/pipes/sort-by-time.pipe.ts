import {Pipe, PipeTransform} from '@angular/core';
import {MeetingModel} from '../models/meeting.model';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {

  transform(value: MeetingModel[], args?: any): any {
    return value.sort((a, b) => {
      const time = a.timeStart.split(':'),
        hours: number = +time[0],
        minutes: number = +time[1];
      const date1 = new Date(a.day);
      date1.setHours(hours);
      date1.setMinutes(minutes);

      const time2 = b.timeStart.split(':'),
        hours2: number = +time2[0],
        minutes2: number = +time2[1];
      const date2 = new Date(b.day);
      date2.setHours(hours2);
      date2.setMinutes(minutes2);

      return date1.getTime() - date2.getTime();
    });
  }

}
