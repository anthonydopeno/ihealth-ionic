import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PprofilePage } from './pprofile';

@NgModule({
  declarations: [
    PprofilePage,
  ],
  imports: [
    IonicPageModule.forChild(PprofilePage),
  ],
})
export class PprofilePageModule {}
