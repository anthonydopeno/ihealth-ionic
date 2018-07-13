import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendarformPage } from './calendarform';

@NgModule({
  declarations: [
    CalendarformPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendarformPage),
  ],
})
export class CalendarformPageModule {}
