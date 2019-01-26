import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'cl-button',
  templateUrl: './cl-button.component.html',
  styleUrls: ['./cl-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClButtonComponent implements OnInit, OnChanges {

  @Input() disabled: boolean;
  @Input() type: 'button' | 'submit' = 'button';
  @Input() styleType: 'common' | 'icon' = 'common';
  @Input() color: 'common' | 'primary' = 'common';

  @HostBinding('style.width') @Input() width: string;
  @HostBinding('style.height') @Input() height: string;

  @HostBinding('class.cl-button-common') styleTypeCommon: boolean;
  @HostBinding('class.cl-button-icon') styleTypeIcon: boolean;
  @HostBinding('class.cl-button-disabled') typeDisabled: boolean;

  @Output() readonly btnClick = new EventEmitter();

  public ngOnInit() {
    this.applyHostClasses();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.styleType || changes.disabled) {
      this.applyHostClasses();
    }
  }

  public onClick() {
    this.btnClick.emit();
  }

  private applyHostClasses() {
    this.typeDisabled = this.disabled;
    this.styleTypeCommon = this.styleType === 'common';
    this.styleTypeIcon = this.styleType === 'icon';
  }

}
