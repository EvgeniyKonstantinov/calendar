import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClDialogMode} from '../../shared/components/ui/cl-dialog/cl-dialog-model';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'cl-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDialogComponent implements OnInit {
  @Output() public closeDialog = new EventEmitter();
  public dialogMode = ClDialogMode;

  public formGroup: FormGroup;
  public themeControl: FormControl;
  public dayControl: FormControl;
  public timeStart: FormControl;
  public timeEnd: FormControl;
  public peoples: FormArray;

  constructor(private formBuilder: FormBuilder) {
    this.themeControl = new FormControl();
    this.dayControl = new FormControl(new Date());
    this.formGroup = formBuilder.group({
      theme: this.themeControl,
      day: this.dayControl
    });
  }

  ngOnInit() {
  }

  public onSubmit() {
    console.log(this.formGroup);
  }

  public onDialogClose(event) {
    this.closeDialog.emit(true);
  }

}
