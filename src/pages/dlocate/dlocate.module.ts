import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DlocatePage } from './dlocate';

@NgModule({
  declarations: [
    DlocatePage,
  ],
  imports: [
    IonicPageModule.forChild(DlocatePage),
  ],
})
export class DlocatePageModule {}
