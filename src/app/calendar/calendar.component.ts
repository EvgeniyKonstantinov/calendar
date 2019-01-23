import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'cl-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  public days: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  public dates: string[] = ['29 окт', '30 окт', '31 окт', '1 ноя', '2 ноя', '3 ноя', '4 ноя'];

  public meeting = [
    {
      id: 0,
      theme: 'Ретроспектива',
      day: '30 окт',
      timeStart: '10:00',
      timeEnd: '11:00',
      peoples: ['Иван Абрамов']
    },

    {
      id: 1,
      theme: 'Ретроспектива',
      day: '30 окт',
      timeStart: '12:00',
      timeEnd: '13:00',
      peoples: ['Иван Абрамов']
    },

    {
      id: 3,
      theme: 'Ретроспектива',
      day: '31 окт',
      timeStart: '10:00',
      timeEnd: '11:00',
      peoples: ['Иван Абрамов']
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
