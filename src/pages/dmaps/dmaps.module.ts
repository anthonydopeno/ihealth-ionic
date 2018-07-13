import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DmapsPage } from './dmaps';

@NgModule({
  declarations: [
    DmapsPage,
  ],
  imports: [
    IonicPageModule.forChild(DmapsPage),
  ],
})
export class DmapsPageModule {}
