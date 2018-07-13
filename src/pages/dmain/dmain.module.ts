import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DmainPage } from './dmain';

@NgModule({
  declarations: [
    DmainPage,
  ],
  imports: [
    IonicPageModule.forChild(DmainPage),
  ],
})
export class DmainPageModule {}
