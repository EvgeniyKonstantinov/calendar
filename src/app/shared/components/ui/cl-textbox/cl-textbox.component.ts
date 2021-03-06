import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cl-textbox',
  templateUrl: './cl-textbox.component.html',
  styleUrls: ['./cl-textbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClTextboxComponent),
      multi: true
    }
  ]
})
export class ClTextboxComponent implements OnInit, ControlValueAccessor {

  @Input() value: string;
  @Input() placeholder: string;
  @Input() title: string;
  @Input() required: boolean;
  @Input() inputType: 'text' | 'number' = 'text';
  @Input() label: string;
  @Input() formControlName: string;
  @Input() inputWidth: string;
  @HostBinding('class.validate') @Input() validate: boolean;
  @HostBinding('class.disabled') @Input() readonly: boolean;

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
