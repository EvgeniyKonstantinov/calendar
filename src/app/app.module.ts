import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import {SharedModule} from './shared/shared.module';
import { CalendarDialogComponent } from './calendar/calendar-dialog/calendar-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarDialogComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
