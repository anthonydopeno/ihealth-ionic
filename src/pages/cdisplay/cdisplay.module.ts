import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CdisplayPage } from './cdisplay';

@NgModule({
  declarations: [
    CdisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(CdisplayPage),
  ],
})
export class CdisplayPageModule {}
