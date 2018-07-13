import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DconsultationPage } from './dconsultation';

@NgModule({
  declarations: [
    DconsultationPage,
  ],
  imports: [
    IonicPageModule.forChild(DconsultationPage),
  ],
})
export class DconsultationPageModule {}
