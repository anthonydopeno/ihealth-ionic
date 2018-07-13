import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DlistPage } from './dlist';

@NgModule({
  declarations: [
    DlistPage,
  ],
  imports: [
    IonicPageModule.forChild(DlistPage),
  ],
})
export class DlistPageModule {}
