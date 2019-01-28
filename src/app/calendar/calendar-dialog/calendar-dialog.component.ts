import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClDialogMode} from '../../shared/components/ui/cl-dialog/cl-dialog-model';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimeUtils} from '../../shared/utils/time';
import {DialogResult} from '../../shared/components/ui/cl-dialog/cl-dialog-result-model';
import {MeetingModel} from '../../shared/models/meeting.model';
import {ClDialogStyleModel} from '../../shared/components/ui/cl-dialog/cl-dialog-style.model';
import {MemberModel} from '../../shared/models/member.model';
import {MeetstatusModel} from './meetstatus.model';
import {ClConfig} from '../../config';

@Component({
  selector: 'cl-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDialogComponent implements OnInit {
  @Input() pickDate;
  @Input() pickMeeting: MeetingModel;
  @Input() nowDate: string;
  @Input() nowTime: string;
  @Input() workWeek: { title: string; value: string; dayName: string }[];

  @Output() public closeDialog = new EventEmitter();
  public dialogMode = ClDialogMode;
  public dialogStyle: ClDialogStyleModel;
  public meetStatus: MeetstatusModel;
  public meetstatusModel = MeetstatusModel;

  public formGroup: FormGroup;
  public id: FormControl;
  public theme: FormControl;
  public day: FormControl;
  public timeStart: FormControl;
  public timeEnd: FormControl;
  public members: FormArray;
  public timeListStart = TimeUtils.generateTimeArray(
    ClConfig.timeSetings.startTime, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
  public timeListEnd = TimeUtils.generateTimeArray(
    ClConfig.timeSetings.startTime, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
  public touchedForm = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.pickMeeting) {
      this.id = new FormControl(this.pickMeeting.id);
      this.theme = new FormControl(this.pickMeeting.theme, [Validators.required]);
      this.day = new FormControl(this.pickDate, [Validators.required]);
      this.timeStart = new FormControl(this.pickMeeting.timeStart, [Validators.required]);
      this.timeEnd = new FormControl(this.pickMeeting.timeEnd, [Validators.required]);
      this.members = new FormArray(this.generateMember(this.pickMeeting.members));
      this.dialogStyle = ClDialogStyleModel.edited;
      this.generateMeetStatus();
    } else {
      this.id = new FormControl(this.getRandomInt(0, 1000000));
      this.theme = new FormControl('', [Validators.required]);
      this.day = new FormControl(this.pickDate, [Validators.required]);
      this.timeStart = new FormControl('', [Validators.required]);
      this.timeEnd = new FormControl('', [Validators.required]);
      this.members = new FormArray([
        this.formBuilder.group({
          name: new FormControl(),
          arrive: new FormControl(false)
        }, [Validators.required])
      ]);
      this.firstGenerateSelects(this.nowTime);
    }

    this.formGroup = this.formBuilder.group({
      id: this.id,
      theme: this.theme,
      day: this.day,
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
      members: this.members
    });
  }

  public onDialogClose(event): void {
    if (event === DialogResult.Save) {
      if (this.formGroup.valid) {
        this.formGroup.value['members'] = this.formGroup.value['members'].filter((x) => {
          return x !== null;
        });
        this.closeDialog.emit(this.formGroup.value);
      }
    } else {
      this.closeDialog.emit(null);
    }

    this.touchedForm = true;
  }

  public listEndChange(event): void {
    if (this.pickDate !== this.nowDate) {
      this.timeListStart = TimeUtils.generateTimeArray(ClConfig.timeSetings.startTime, event, ClConfig.timeSetings.intervalMinutes);
    } else {
      this.firstGenerateSelects(this.nowTime, event);
    }
  }

  public listStartChange(event): void {
    if (this.pickDate !== this.nowDate) {
      this.timeListEnd = TimeUtils.generateTimeArray(event, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
      console.log('change');
    } else {
      this.timeListEnd = TimeUtils.generateTimeArray(event, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
    }
  }

  public addMember(): void {
    (<FormArray>this.formGroup.controls['members']).push(this.formBuilder.group({
      name: new FormControl(),
      arrive: new FormControl(false)
    }));
  }

  public generateMember(members: MemberModel[]): AbstractControl[] {
    const arr: AbstractControl[] = [];
    members.forEach((member) => {
      arr.push(
        this.formBuilder.group({
          name: new FormControl(member.name),
          arrive: new FormControl(member.arrive)
        }));
    });
    return arr;
  }

  public generateMeetStatus() {
    if (this.pickDate > this.nowDate) {
      this.meetStatus = MeetstatusModel.willbe;
    }

    if (this.pickDate === this.nowDate) {
      if (this.nowTime <= this.pickMeeting.timeEnd && this.nowTime >= this.pickMeeting.timeStart) {
        this.meetStatus = MeetstatusModel.now;
      } else if (this.nowTime < this.pickMeeting.timeStart) {
        this.meetStatus = MeetstatusModel.willbe;
        this.firstGenerateSelects(this.nowTime);
      } else if (this.nowTime > this.pickMeeting.timeEnd) {
        this.meetStatus = MeetstatusModel.passed;
      }
    }

    if (this.pickDate < this.nowDate) {
      this.meetStatus = MeetstatusModel.passed;
    }
  }

  public firstGenerateSelects(nowTime: string, event?: string): void {
    if (this.pickDate === this.nowDate) {
      const timer = nowTime.split(':');
      let start;
      if (+timer[1] <= 30) {
        start = timer[0] + ':' + '30';
      } else {
        start = (+timer[0] + 1) + ':' + '00';
      }

      if (event) {
        this.timeListStart = TimeUtils.generateTimeArray(start, event, ClConfig.timeSetings.intervalMinutes);
      } else {
        this.timeListStart = TimeUtils.generateTimeArray(start, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
      }

      this.timeListEnd = TimeUtils.generateTimeArray(start, ClConfig.timeSetings.endTime, ClConfig.timeSetings.intervalMinutes);
    }
  }

  public getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
