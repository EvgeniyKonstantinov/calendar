import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cl-select',
  templateUrl: './cl-select.component.html',
  styleUrls: ['./cl-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClSelectComponent),
      multi: true
    }
  ]
})
export class ClSelectComponent implements OnInit, ControlValueAccessor {

  @Input() value: string;
  @Input() readonly: boolean;
  @Input() title: string;
  @Input() required: boolean;
  @Input() data: { value: string, title: string }[];
  @Input() label: string;
  @Input() formControlName: string;
  @Input() inputWidth: string;

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
