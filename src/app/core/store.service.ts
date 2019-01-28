import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MeetingModel} from '../shared/models/meeting.model';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public storeData = new BehaviorSubject<MeetingModel[]>(null);
  private readonly data: MeetingModel[] = [];

  constructor(private restService: RestService) {
    this.data = JSON.parse(this.restService.get()) as MeetingModel[] || [];
    if (this.data.length > 0) {
      this.data = this.sortDate(this.data);
    }
    this.storeData.next(this.data);
  }

  public updateData(metting: MeetingModel): void {
    const findedIndex = this.data.findIndex(met => met.id === metting.id);

    if (findedIndex > -1) {
      this.data[findedIndex] = metting;
    } else {
      this.data.push(metting);
    }

    this.restService.put(JSON.stringify(this.data));
    this.storeData.next(this.sortDate(this.data));
  }

  private sortDate(data: MeetingModel[]) {
    return data.sort((a, b) => {
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
