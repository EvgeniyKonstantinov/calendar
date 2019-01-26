import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef, HostBinding,
  Input, OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'cl-datepicker',
  templateUrl: './cl-datepicker.component.html',
  styleUrls: ['./cl-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClDatepickerComponent),
      multi: true
    }
  ]
})
export class ClDatepickerComponent implements OnInit, ControlValueAccessor, OnChanges {

  @Input() value: string;
  @Input() readonly: boolean;
  @Input() placeholder = '';
  @Input() title = '';
  @Input() required: boolean;
  @Input() minDate: string;
  @Input() maxDate: string;
  public dateValue: string;
  @Input() label: string;
  @Input() formControlName: string;
  @Input() inputWidth: string;

  public dayWeek: string;
  @Output() readonly valueChange = new EventEmitter<string>();

  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private datePipe: DatePipe) {
  }

  ngOnInit() {
    console.log(this.value);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.setDateValue();
    }
  }

  public writeValue(value: string): void {
    this.value = value;
    this.setDateValue();
  }

  public registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public onValueChange(model: string): void {
    if (this.onChangedCallback) {
      this.onChangedCallback(model);
    }
    this.valueChange.emit(model);
  }

  public onDateChange(event): void {
    this.value = event.target.value;
    this.setDateValue();
  }

  public onBlur(): void {
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }

  private setDateValue(): void {
    this.dateValue = this.datePipe.transform(this.value, 'yyyy-MM-dd', '', 'ru');
    this.dayWeek = this.datePipe.transform(this.value, 'E', '', 'ru');
    console.log(this.dateValue);
    console.log(this.dayWeek);
    this.changeDetectorRef.detectChanges();
  }

}
