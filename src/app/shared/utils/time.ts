import {DatePipe} from '@angular/common';


export class TimeUtils {
  public static get weekDayNames(): string[] {
    return ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
  }

  public static get weekDayDates(): { title: string; value: string; dayName: string }[] {
    const nowDate = new Date(),
      modificationDate = new Date(),
      isoDay = nowDate.getDay() === 0 ? 7 : nowDate.getDay(),
      dateArray: { title: string, value: string, dayName: string }[] = [];
    modificationDate.setDate(nowDate.getDate() - (isoDay - 1));

    for (let i = 0; i < 7; i++) {
      const toArrayDate = new Date(modificationDate);
      toArrayDate.setDate(modificationDate.getDate() + i);
      dateArray.push({
        value: this.manipulationFormat(toArrayDate),
        title: DatePipe.prototype.transform(toArrayDate, 'dd MMMM', '', 'ru'),
        dayName: this.weekDayNames[i]
      });
    }
    return dateArray;
  }

  public static generateTimeArray(startTime: string, endTime: string, stepMinutes: number) {
    const firstTime = startTime.split(':'),
      secondTime = endTime.split(':'),
      secondDate = new Date(0, 0, 0, parseInt(secondTime[0], 0), parseInt(secondTime[1], 0)),
      result = [];
    let firstDate = new Date(0, 0, 0, parseInt(firstTime[0], 0), parseInt(firstTime[1], 0));

    while (firstDate <= secondDate) {
      const resultHours: number = firstDate.getHours();
      const resultMinutes: number = firstDate.getMinutes();
      result.push(this.firstZero(resultHours) + ':' + this.firstZero(resultMinutes));
      firstDate = this.addMinutes(firstDate, stepMinutes);
    }
    return result;
  }

  public static addMinutes(date: Date, minutes: number): Date {
    return new Date(date.setMinutes(date.getMinutes() + minutes));
  }

  public static firstZero(num: number): string {
    return num > 9 ? num + '' : '0' + num;
  }

  public static manipulationFormat(value: Date | string): string {
    return DatePipe.prototype.transform(value, 'yyyy-MM-dd', '', 'ru');
  }

  public static manipulationFormatTime(time: Date | string): string {
    return DatePipe.prototype.transform(time, 'HH:mm', '', 'ru');
  }

  public static weekDay(value: Date | string): string {
    return DatePipe.prototype.transform(value, 'E', '', 'ru');
  }
}
