import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlistPage } from './plist';

@NgModule({
  declarations: [
    PlistPage,
  ],
  imports: [
    IonicPageModule.forChild(PlistPage),
  ],
})
export class PlistPageModule {}
