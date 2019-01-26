import {Component, OnInit, ChangeDetectionStrategy, forwardRef, Output, EventEmitter, ChangeDetectorRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cl-checkbox',
  templateUrl: './cl-checkbox.component.html',
  styleUrls: ['./cl-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClCheckboxComponent),
      multi: true
    }
  ]
})
export class ClCheckboxComponent implements OnInit, ControlValueAccessor {

  @Input() value: string;
  @Input() readonly: boolean;
  @Input() label;
  @Input() title = '';
  @Input() required: boolean;

  @Output() readonly valueChange = new EventEmitter<string>();

  private onChangedCallback: (_) => void;
  private onTouchedCallback: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  public writeValue(value: string): void {
    this.value = value === null || value === undefined ? '' : `${value}`;
    this.changeDetectorRef.detectChanges();
  }

  public registerOnChange(fn: any): void {
    this.onChangedCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public onValueChange(model: string) {
    if (this.onChangedCallback) {
      this.onChangedCallback(model);
    }
    this.valueChange.emit(model);
  }

  public onBlur() {
    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }
  }


}
