import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MeetingModel} from '../shared/models/meeting.model';
import {StoreService} from '../core/store.service';
import {Observable} from 'rxjs';
import {TimeUtils} from '../shared/utils/time';

@Component({
  selector: 'cl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {
  public showedDialog = false;
  public pickDate: string;
  public pickMeeting: MeetingModel;
  public dates: { title: string; value: string; dayName: string }[] = TimeUtils.weekDayDates;
  public nowDate: string = TimeUtils.manipulationFormat(new Date());
  public nowTime: string = TimeUtils.manipulationFormatTime(new Date());

  public meetings$: Observable<MeetingModel[]>;

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.meetings$ = this.storeService.storeData;
  }

  public onShowDialog(date: string, i: number, event: Event, meeting: MeetingModel | null = null): void {
    event.stopPropagation();
    if (date < this.nowDate) {
      alert('Вы не можете назначать встречи на прошедшие дни');
      return;
    }

    if (i === 5 || i === 6) {
      alert('Вы не можете назначать встречи на выходные дни');
      return;
    }

    this.pickMeeting = meeting;
    this.pickDate = date;
    this.showedDialog = true;
  }

  public onCloseDialog(event: MeetingModel | null): void {
    if (event) {
      this.storeService.updateData(event);
    }
    this.showedDialog = false;
  }

  public trackByMeeting(_, meeting: MeetingModel) {
    return meeting.id;
  }
}
