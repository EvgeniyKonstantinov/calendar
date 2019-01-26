import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'cl-icon',
  templateUrl: './cl-icon.component.html',
  styleUrls: ['./cl-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClIconComponent {
  @Input() iconName: string;
}
