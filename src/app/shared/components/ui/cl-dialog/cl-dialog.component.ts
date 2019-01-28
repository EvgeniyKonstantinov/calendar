import {ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ClDialogMode} from './cl-dialog-model';
import {ClDialogButton} from './cl-dialog-button-model';
import {DialogResult} from './cl-dialog-result-model';
import {ClDialogStyleModel} from './cl-dialog-style.model';

@Component({
  selector: 'cl-dialog',
  templateUrl: './cl-dialog.component.html',
  styleUrls: ['./cl-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClDialogComponent implements OnInit {

  @Input() public title;
  @Input() public dialogMode: ClDialogMode;
  @Input() public dialogStyle: ClDialogStyleModel;

  public buttons: ClDialogButton[];
  public dialogResult = DialogResult;
  public style;
  @Output() dialogClose = new EventEmitter<DialogResult>();

  constructor() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.onDialogClose(this.dialogResult.Close);
    }
  }

  ngOnInit() {
    switch (this.dialogMode) {
      case ClDialogMode.Cancel:
        this.buttons = [{dialogResult: this.dialogResult.Cancel, text: 'Отмена'}];
        break;
      case ClDialogMode.CancelSave:
        this.buttons = [
          {dialogResult: this.dialogResult.Cancel, text: 'Отмена'},
          {dialogResult: this.dialogResult.Save, text: 'Сохранить', primary: true}
        ];
        break;
      case ClDialogMode.Close:
        this.buttons = [
          {dialogResult: this.dialogResult.Close, text: 'Закрыть'},
        ];
        break;
      case ClDialogMode.Save:
        this.buttons = [
          {dialogResult: this.dialogResult.Save, text: 'Сохранить', primary: true}
        ];
        break;
      default:
        break;
    }

    switch (this.dialogStyle) {
      case ClDialogStyleModel.edited:
        this.style = 'edited';
        break;
      default:
        this.style = 'new';
        break;
    }
  }

  public onDialogClose(event: DialogResult): void {
    this.dialogClose.emit(event);
  }

}
