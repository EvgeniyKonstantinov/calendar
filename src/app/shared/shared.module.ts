import {LOCALE_ID, NgModule} from '@angular/core';
import {CommonModule, DatePipe, registerLocaleData} from '@angular/common';
import {ClButtonComponent} from './components/ui/cl-button/cl-button.component';
import {ClDialogComponent} from './components/ui/cl-dialog/cl-dialog.component';
import { ClTextboxComponent } from './components/ui/cl-textbox/cl-textbox.component';
import { ClSelectComponent } from './components/ui/cl-select/cl-select.component';
import { ClDatepickerComponent } from './components/ui/cl-datepicker/cl-datepicker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { ClIconComponent } from './components/ui/cl-icon/cl-icon.component';
import { ClCheckboxComponent } from './components/ui/cl-checkbox/cl-checkbox.component';

registerLocaleData(localeRu, localeRuExtra);

const SHARED = [
  ClButtonComponent,
  ClDialogComponent,
  ClTextboxComponent,
  ClSelectComponent,
  ClDatepickerComponent,
  ClIconComponent,
  ClCheckboxComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...SHARED,
  ],
  exports: [
    ...SHARED,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'ru' }]
})
export class SharedModule {
}
